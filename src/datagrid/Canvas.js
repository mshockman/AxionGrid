/**
 * A canvas object is responsible for drawing the currently viewable parts of the data model to the screen and catching
 * and passing events that happen to those element to the grid.
 */
import {clamp} from "../common/util";
import {Publisher} from "../common/events";

export class GridDivCanvas extends Publisher {
    constructor({model=null, virtualization="row", refreshRate=100, incrementX=20, incrementY=250, verticalPadding=1000, horizontalPadding=1000, speedLimit=1000}={}) {
        super();
        this.virtualization = virtualization;
        this.refreshRate = refreshRate;
        this.incrementX = incrementX;
        this.incrementY = incrementY;
        this.verticalPadding = verticalPadding;
        this.horizontalPadding = horizontalPadding;
        this.speedLimit = speedLimit;

        this.view = $("<div class='grid-viewport'>");

        this.canvas = $("<div>").addClass("grid-canvas").css({
            position: "relative"
        });

        this.canvas.appendTo(this.view);

        this.canvas.on("change click", (event) => {
            let $target = $(event.target),
                $cell = $target.closest(".grid-cell", this.canvas),
                x = $cell.data("cellNumber"),
                y = $cell.data("rowNumber"),
                cell = this.model.getCell(y, x);

            cell.handleEvent(event);
        });

        this._onScroll = this.onScroll.bind(this);
        this.view.on("scroll", this._onScroll);

        this._left = 0;
        this._top = 0;

        if(model) this.setDataModel(model);
    }

    setDataModel(model) {
        this.model = model;
    }

    setViewPort(x, y, width, height) {
        this.viewport = {
            x: x - this.horizontalPadding,
            y: y - this.verticalPadding,
            width: width + (this.horizontalPadding*2),
            height: height + (this.verticalPadding*2),
            incrementX: this.virtualization === "col" || this.virtualization === "both" ? Math.floor(x / this.incrementX) : 0,
            incrementY: Math.floor(y / this.incrementY)
        };

        if(!this._viewport) {
            this.render();
            return;
        }

        if(!this._timer && this.hasChanged()) {
            let x = this._viewport.x,
                y = this._viewport.y;

            let onTimeout = () => {
                let dX = Math.abs(this.viewport.x - x),
                    dY = Math.abs(this.viewport.y - y);

                if(this.speedLimit && (dX > this.speedLimit || dY > this.speedLimit)) {
                    x = this.viewport.x;
                    y = this.viewport.y;
                    this._timer = setTimeout(onTimeout, this.refreshRate);
                    return;
                }

                this._timer = null;
                if(this.hasChanged()) this.render("scroll");
            };

            this._timer = setTimeout(onTimeout, this.refreshRate);
        }
    }

    hasChanged() {
        return this.viewport.width !== this._viewport.width ||
            this.viewport.height !== this._viewport.height ||
            this.viewport.incrementX !== this._viewport.incrementX ||
            this.viewport.incrementY !== this._viewport.incrementY;
    }

    render() {
        if(!this.viewport) {
            let v = this.getViewPort();
            this.setViewPort(v.left, v.top, v.width, v.height);
        }

        let rowRange = this.getRowRange(this.viewport.y, this.viewport.y + this.viewport.height),
            columnRange = this.getColumnRange(this.viewport.x, this.viewport.x + this.viewport.width),
            rowPos = 0,
            totalWidth = this.model.getWidth(),
            frag = document.createDocumentFragment();

        this._viewport = this.viewport;

        this.canvas.css({
            height: this.model.getHeight(),
            width: totalWidth
        });

        for(let y = rowRange.start; y < rowRange.stop; y++) {
            let cellPos = 0,
                row = this.model.getRow(y),
                top = row.getTop(),
                rowHeight = row.getHeight(),
                $row = $("<div>").addClass("grid-row").css({
                    position: "absolute",
                    top: top,
                    height: rowHeight,
                    width: totalWidth
                });

            $row.addClass(row.getClasses());
            $row.attr(row.getAttributes());
            $row.css(row.getStyle());
            $row.data("rowNumber", row.rowNumber);
            $row.attr("data-row-number", row.rowNumber);
            rowPos += row.getHeight();

            cellPos = row.getCell(columnRange.start).getLeft();

            for(let x = columnRange.start; x < columnRange.stop; x++) {
                let cell = row.getCell(x),
                    cellWidth = cell.getWidth(),
                    $cell = $("<div class='grid-cell'>").css({
                        position: "absolute",
                        left: cellPos,
                        width: cellWidth,
                        height: rowHeight
                    });

                cellPos += cellWidth;

                $cell.append(cell.getValue());
                $cell.data({
                    "cellNumber": cell.cellNumber,
                    "rowNumber": row.rowNumber
                });
                $cell.attr("data-cell-number", cell.cellNumber);
                $cell.css(cell.getStyle());
                $cell.attr(cell.getAttributes());
                $cell.addClass(cell.getClasses());

                $row.append($cell);
            }

            $row.appendTo(frag);
        }

        this.canvas.empty();
        this.canvas.append(frag);
    }

    appendTo(element) {
        return this.view.appendTo(element);
    }

    getRowRange(start, stop) {
        if(this.virtualization === "both" || this.virtualization === "row") {
            let l = this.model.getDataLength();

            return {
                start: clamp(Math.floor(start / this.model.rowHeight), 0, l),
                stop: clamp(Math.floor(stop / this.model.rowHeight), 0, l)
            };
        } else {
            return {
                start: 0,
                stop: this.model.getDataLength()
            };
        }
    }

    getColumnRange(start, stop) {
        let pos = 0,
            r = {},
            column,
            i = 0,
            l = this.model.getColumnLength();

        r.start = 0;
        r.stop = l;

        if(!(this.virtualization === "both" || this.virtualization === "col")) {
            return r;
        }

        for(; i < l; i++) {
            column = this.model.getColumn(i);
            pos += column.getWidth();
            r.start = i;

            if(pos > start) {
                i++;
                break;
            }
        }

        for(; i < l; i++) {
            column = this.model.getColumn(i);
            pos += column.getWidth();
            r.stop = i + 1;

            if(pos >= stop) {
                break;
            }
        }

        return r;
    }

    onScroll() {
        this._left = this.view.scrollLeft();
        this._top = this.view.scrollTop();
        let viewport = this.getViewPort();

        this.setViewPort(viewport.left, viewport.top, viewport.width, viewport.height);

        this.publish("canvas-scroll", viewport);
    }

    setScroll(left, top) {
        this.view.scrollLeft(left);
        this.view.scrollTop(top);

        let viewport = this.getViewPort();

        this.setViewPort(viewport.left, viewport.top, viewport.width, viewport.height);

        this.publish("canvas-scroll", viewport);
    }

    scrollLeft() {
        return this.view.scrollLeft();
    }

    scrollTop() {
        return this.view.scrollTop();
    }

    getViewPort() {
        return {
            left: this._left,
            top: this._top,
            width: this.view.innerWidth(),
            height: this.view.innerHeight()
        };
    }
}