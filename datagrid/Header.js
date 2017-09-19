

import {clamp} from "./util";

export class GridHeader {
    constructor() {
        this.view = $("<div class='grid-header'>");
        this.viewport = $("<div class='grid-header-viewport'>");
        this.viewport.css({
            "overflow-x": "hidden",
            position: "relative",
            height: 25
        });
        this.view.append(this.viewport);
    }

    bindToViewPort(viewport) {
        if(viewport.viewport) {
            viewport = $(viewport.viewport);
        } else {
            viewport = $(viewport);
        }

        viewport.on("scroll", (event) => {
            this.viewport.scrollLeft($(event.target).scrollLeft());
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
    constructor(grid) {
        this.grid = grid;
        this.view = $("<div class='grid-column-row'>").css({
            position: "relative"
        });

        this._startResize = this.startResize.bind(this);
        this.view.on("mousedown", this._startResize);
    }

    get model() {
        return this.grid.model;
    }

    render() {
        let pos = 0;

        this.view.css({
            width: this.model.getWidth() + 50 // any extra that might be needed for the sidebar.
        });

        let frag = document.createDocumentFragment();

        for(let i = 0, l = this.model.getColumnLength(); i < l; i++) {
            let $column = $("<div class='grid-column'>"),
                column = this.model.getColumn(i),
                name = column.getLabel(),
                width = column.getWidth();

            $column.addClass(column.getClasses());
            $column.attr(column.getAttributes());
            $column.css(column.getStyle());
            $column.data("columnNumber", column.columnNumber);

            $column.css({
                position: "absolute",
                width: width,
                left: pos
            });

            pos += width;

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
            startY = event.clientY,
            $doc = $(event.target.ownerDocument),
            column = this.model.getColumn($column.data("columnNumber"));

        let onMouseMove = (event) => {
            let dX = event.clientX - startX,
                sizes = this.calculateNewColumnSizes(column, dX);

            if(sizes) this.setColumnWidths(sizes, false);
        };

        let onMouseUp = (event) => {
            $doc.off("mousemove", onMouseMove);
            $doc.off("mouseup", onMouseUp);

            let dX = event.clientX - startX,
                sizes = this.calculateNewColumnSizes(column, dX);

            this.setColumnWidths(sizes, true);
            this.grid.render();
        };

        $doc.on("mousemove", onMouseMove);
        $doc.on("mouseup", onMouseUp);
    }

    calculateNewColumnSizes(column, change) {
        if(change > 0) {
            let r = {},
                width,
                expected;

            while(column && change > 0) {
                if(column.isResizeable()) {
                    expected = column.getWidth() + change;
                    width = clamp(expected, column.getMinWidth(), column.getMaxWidth());
                    change = expected - width;
                    r[column.columnNumber] = width;
                }

                column = column.prevColumn();
            }

            return r;
        } else if(change < 0) {
            let r = {},
                width,
                expected;

            while(column && change < 0) {
                if(column.isResizeable()) {
                    expected = column.getWidth() + change;
                    width = clamp(expected, column.getMinWidth(), column.getMaxWidth());
                    change = expected - width;
                    r[column.columnNumber] = width;
                }

                column = column.prevColumn();
            }

            return r;
        }
    }

    /**
     * Refresh the size and position of every visible column.
     */
    refresh() {
        let $columns = this.view.find(".grid-column"),
            pos = null;

        $columns.each((index, element) => {
            let $column = $(element),
                column = this.model.getColumn($column.data("columnNumber")),
                width = column.getWidth();

            if(pos === null) {
                pos = column.getLeft();
            }

            $column.css({
                width: width,
                left: pos
            });

            pos += width;
        });
    }

    setColumnWidths(widths, _update=true) {
        let $columns = this.view.find(".grid-column"),
            pos = 0;

        $columns.each((index, element) => {
            let $column = $(element),
                column = this.model.getColumn($column.data("columnNumber")),
                width = widths[column.columnNumber] != null ? widths[column.columnNumber] : column.getWidth();

            $column.css({
                width: width,
                left: pos
            });

            if(_update) {
                column.setWidth(width);
            }

            pos += width;
        });

        this.view.css({
            width: pos + 50
        });
    }
}
