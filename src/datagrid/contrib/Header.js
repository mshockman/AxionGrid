

export class GridHeader {
    constructor(scroll=true) {
        this.view = $("<div class='grid-header'>");
        this.viewport = $("<div class='grid-header-viewport'>");
        this.scroll = scroll;
        this.viewport.css({
            position: "relative"
        });
        this.view.append(this.viewport);
    }

    setGrid(grid) {
        this.grid = grid;

        if(this.scroll) {
            this.grid.subscribe("viewport-change", (viewport) => {
                this.viewport.scrollLeft(viewport.scrollLeft);
            });
        }
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
    constructor(grid, {draggable=true, resizeable=true, dataSortable=false, multiSort=false}={}) {
        this.draggable = draggable;
        this.dataSortable = dataSortable;
        this.sortingStates = ["sort-none", "sort-asc", "sort-desc"];
        this.multiSort = multiSort;

        this.sortMap = {
            "sort-none": null,
            "sort-asc": "asc",
            "sort-desc": "desc"
        };


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

        this.grid.subscribe("data-change", () => {
            this.render();
        });

        this.grid.subscribe("render", () => {
            this.render();
        });
    }

    initColumnDragAndDrop() {
        this.view.sortable({
            axis: "x",
            cancel: "input,textarea,button,select,option,.ui-resize-handle",
            items: ".grid-column.ui-sortable",

            update: () => {
                this.applySort();
            }
        });
    }

    initSorting() {
        this.view.find(".grid-column").addClass(this.sortingStates[0]).data("sortState", 0);

        this.view.on("click", (event) => {
            let $column = $(event.target).closest(".grid-column", this.view);

            if(!$column.length || !$column.data("column").data.dataSortable) {
                return;
            }

            let sortState = $column.data("sortState") || 0;

            if(!this.multiSort) {
                this.view.find(".sort-asc, sort-desc").not($column).removeClass('sort-asc').removeClass('sort-desc').addClass('sort-none').data("sortState", 0);
            }

            $column.removeClass(this.sortingStates[sortState]);

            sortState++;

            if(sortState > this.sortingStates.length-1) {
                sortState = 0;
            }

            $column.addClass(this.sortingStates[sortState]).data("sortState", sortState);

            if(this.grid) {
                let column = $column.data("column");
                this.grid.publish("data-sort", {
                    row: this,
                    column: column,
                    node: $column,
                    state: this.sortMap[this.sortingStates[sortState]],
                    id: column.id
                }, this.getAllSortingStates());
            }
        });
    }

    getAllSortingStates() {
        let r = {};

        this.view.find(".grid-column").each((x, item) => {
            item = $(item);
            let column = item.data("column");

            if(column.data.dataSortable) {
                let id = column.data.id,
                    state = item.data("sortState");

                state = this.sortMap[this.sortingStates[state]];
                if(state) r[id] = state;
            }
        });

        return r;
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
                name = column.label,
                width = column.width;

            if(this.draggable && column.getMetaData("sortable")) {
                $column.addClass("ui-sortable");
            }

            if(this.dataSortable && column.getMetaData("dataSortable")) {
                $column.addClass(this.sortingStates[column.getMetaData("dataSort") || 0]);
            }

            $column.addClass(column.classes);
            $column.attr(column.attributes);
            $column.css(column.style);
            $column.data({
                "columnNumber": column.columnNumber,
                "grid": this.grid,
                "column": column
            });

            $column.css({
                position: "relative",
                display: "inline-block",
                width: width
            });

            $column.append(name);

            if(column.isResizeable) {
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
            r.push(this.model.getColumn(i).width);
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
            this.grid.publish("col-resize");
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

    /**
     *
     * @param original
     * @param {Column} column
     * @param change
     * @private
     */
    _modColumnWidths(original, column, change) {
        let expected;

        while(column && change) {
            if(column.isResizeable) {
                column.width = original[column.columnNumber];
                expected = column.width + change;
                column.width = expected;
                change = expected - column.width;
            }

            column = column.prevColumn;
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
                width = column.width;

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

            definitions.push(column.data);
        });

        this.model.setColumns(definitions);
        this.grid.render();
        // this.render();
    }
}
