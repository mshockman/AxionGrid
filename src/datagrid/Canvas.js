/**
 * A canvas object is responsible for drawing the currently viewable parts of the data model to the screen and catching
 * and passing events that happen to those element to the grid.
 */
import {clamp, dictsEqual} from "./util";

export class GridDivCanvas {
    constructor(grid, {cropColumns=false, refreshRate=100, incrementX=20, incrementY=250, verticalPadding=1000, horizontalPadding=1000, speedLimit=1000}={}) {
        this.cropColumns = cropColumns;
        this.refreshRate = refreshRate;
        this.incrementX = incrementX;
        this.incrementY = incrementY;
        this.verticalPadding = verticalPadding;
        this.horizontalPadding = horizontalPadding;
        this.speedLimit = speedLimit;


        this.canvas = $("<div>").addClass("grid-canvas").css({
            position: "relative"
        });

        if(grid) {
            this.setGrid(grid);
        }

        this.canvas.on("change click", (event) => {
            let $target = $(event.target),
                $cell = $target.closest(".grid-cell", this.canvas),
                x = $cell.data("cellNumber"),
                y = $cell.data("rowNumber"),
                cell = this.model.getCell(y, x);

            cell.handleEvent(event);
        });
    }

    get view() {
        return this.canvas;
    }

    get model() {
        return this.grid.model;
    }

    setGrid(grid) {
        this.grid = grid;

        this.grid.subscribe("scroll", (viewport) => {
            this.setViewPort(
                viewport.left,
                viewport.top,
                viewport.width,
                viewport.height
            )
        });
    }

    setViewPort(x, y, width, height) {
        this.viewport = {
            x: x - this.horizontalPadding,
            y: y - this.verticalPadding,
            width: width + (this.horizontalPadding*2),
            height: height + (this.verticalPadding*2),
            incrementX: this.cropColumns ? Math.floor(x / this.incrementX) : 0,
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
                if(this.hasChanged()) this.render();
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
            let v = this.grid.viewport.getViewPort();
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

        if(this.grid) this.grid.publish("render");
    }

    appendTo(element) {
        return this.canvas.appendTo(element);
    }

    getRowRange(start, stop) {
        let l = this.model.getDataLength();

        return {
            start: clamp(Math.floor(start / this.model.rowHeight), 0, l),
            stop: clamp(Math.floor(stop / this.model.rowHeight), 0, l)
        };
    }

    getColumnRange(start, stop) {
        let pos = 0,
            r = {},
            column,
            i = 0,
            l = this.model.getColumnLength();

        r.start = 0;
        r.stop = l;

        if(!this.cropColumns) {
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
}