

export class GridHeader {
    constructor() {
        this.view = $("<div class='grid-header'>");
        this.viewport = $("<div class='grid-header-viewport'>");
        this.viewport.css({
            position: "relative"
        });
        this.view.append(this.viewport);
    }

    setGrid(grid) {
        this.grid = grid;

        this.grid.subscribe("scroll", (viewport) => {
            this.viewport.scrollLeft(viewport.left);
        });
    }

    appendTo(element) {
        this.view.appendTo(element);
    }

    append(element) {
        if(element.appendTo) {
            element.appendTo(this.viewport);
        } else {
            this.viewport.append(element);
        }
    }
}


export class ColumnRow {
    constructor(grid, draggable=true, resizeable=true, dataSortable=false) {
        this.draggable = draggable;
        this.dataSortable = dataSortable;
        this.sortingStates = ["sort-none", "sort-asc", "sort-desc"];
        this.sortingStateValues = ["", "asc", "desc"];

        this.view = $("<div class='grid-column-row'>").css({
            position: "relative",
            "white-space": "nowrap"
        });

        this.scrollWidth = 50;

        if(resizeable) {
            this._startResize = this.startResize.bind(this);
            this.view.on("mousedown", this._startResize);
        }

        if(this.draggable) {
            this.initColumnDragAndDrop();
        }

        if(this.dataSortable) {
            this.initSorting();
        }

        if(grid) this.setGrid(grid);
    }

    setGrid(grid) {
        this.grid = grid;

        this.grid.subscribe("render", (target, type) => {
            if(target === this.grid.canvas && type !== "scroll") {
                this.render();
            }
        });
    }

    initColumnDragAndDrop() {
        this.view.sortable({
            axis: "x",
            cancel: "input,textarea,button,select,option,.ui-resize-handle",

            update: (event, ui) => {
                this.applySort();
            }
        });
    }

    initSorting() {
        this.sortState = 0;
        this.view.find(".grid-column").addClass(this.sortingStates[this.sortState]);

        this.view.on("click", (event) => {
            let $column = $(event.target).closest(".grid-column", this.view);

            if(!$column.length) {
                return;
            }

            let column = this.grid.model.getColumn($column.data('columnNumber'));

            $column.removeClass(this.sortingStates[this.sortState]);
            this.sortState++;

            if(this.sortState > 2) {
                this.sortState = 0;
            }

            $column.addClass(this.sortingStates[this.sortState]);
            if(column) column.setMetaData("dataSort", this.sortingStateValues[this.sortState]);

            if(this.grid) {
                this.grid.publish("dataSortChange", column);
            }
        });
    }

    get model() {
        return this.grid.model;
    }

    render() {
        this.view.css({
            width: this.model.getWidth() + this.scrollWidth // any extra that might be needed for the sidebar.
        });

        let frag = document.createDocumentFragment();

        for(let i = 0, l = this.model.getColumnLength(); i < l; i++) {
            let $column = $("<div class='grid-column'>"),
                column = this.model.getColumn(i),
                name = column.getLabel(),
                width = column.getWidth();

            if(this.draggable && column.getMetaData("sortable")) {
                $column.addClass("ui-sortable");
            }

            if(this.dataSortable && column.getMetaData("dataSortable")) {
                $column.addClass(this.sortingStates[0]);
            }

            $column.addClass(column.getClasses());
            $column.attr(column.getAttributes());
            $column.css(column.getStyle());
            $column.data({
                "columnNumber": column.columnNumber,
                "grid": this.grid
            });

            $column.css({
                position: "relative",
                display: "inline-block",
                width: width
            });

            $column.append(name);

            if(column.isResizeable()) {
                let resizer = $("<div class='ui-resize-handle'>");
                $column.append(resizer);
            }

            $column.appendTo(frag);
        }

        this.view.empty();
        this.view.append(frag);
    }

    appendTo(element) {
        this.view.appendTo(element);
    }

    getCurrentWidths() {
        let r = [];

        for(let i = 0, l = this.model.getColumnLength(); i < l; i++) {
            r.push(this.model.getColumn(i).getWidth());
        }

        return r;
    }

    startResize(event) {
        let $eventTarget = $(event.target),
            handle = $eventTarget.closest(".ui-resize-handle", this.view),
            $column = $eventTarget.closest(".grid-column", this.view);

        if(!handle.length || !$column.length) {
            return;
        }

        let originalWidths = this.getCurrentWidths(),
            startX = event.clientX,
            $doc = $(event.target.ownerDocument),
            column = this.model.getColumn($column.data("columnNumber"));

        let onMouseMove = (event) => {
            this._modColumnWidths(originalWidths, column, event.clientX - startX);
            event.preventDefault();
            this.refresh(false);
            this.grid.publish("resizing");
        };

        let onMouseUp = (event) => {
            $doc.off("mousemove", onMouseMove);
            $doc.off("mouseup", onMouseUp);

            this._modColumnWidths(originalWidths, column, event.clientX - startX);
            this.refresh(true);
            this.grid.render();
            this.grid.publish("refresh");
        };

        $doc.on("mousemove", onMouseMove);
        $doc.on("mouseup", onMouseUp);
    }

    _modColumnWidths(original, column, change) {
        let expected;

        while(column && change) {
            if(column.isResizeable()) {
                column.setWidth(original[column.columnNumber]);
                expected = column.getWidth() + change;
                column.addWidth(change);
                change = expected - column.getWidth();
            }

            column = column.prevColumn();
        }
    }

    /**
     * Refresh the size and position of every visible column.
     */
    refresh(updateViewWidth=true) {
        let $columns = this.view.find(".grid-column");

        if(updateViewWidth) {
            this.view.css("width", this.model.getWidth() + this.scrollWidth);
        }

        $columns.each((index, element) => {
            let $column = $(element),
                column = this.model.getColumn($column.data("columnNumber")),
                width = column.getWidth();

            $column.css({
                width: width
            });
        });
    }

    applySort() {
        let $columns = this.view.find(".grid-column"),
            definitions = [],
            i = 0;

        $columns.each((index, element) => {
            let $column = $(element),
                column = this.model.getColumn($column.data("columnNumber"));

            $column.data("columnNumber", i++);

            definitions.push(column.getDefinition());
        });

        this.model.setColumns(definitions);
        this.grid.render();
        // this.render();
    }
}
