/**
 * A canvas object is responsible for drawing the currently viewable parts of the data model to the screen and catching
 * and passing events that happen to those element to the grid.
 */
import {clamp} from "./util";

export class $GridDivCanvas {
    constructor(container=null) {
        this.canvas = $("<div>").addClass("grid-canvas").css({
            position: "relative"
        });

        if(container) {
            this.canvas.appendTo(container);
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

    setDataModel(model) {
        this.model = model;
    }

    setViewPort(x, y, width, height) {
        this.viewport = {
            x: x,
            y: y,
            width: width,
            height: height
        };
    }

    render() {
        let rowRange = this.getRowRange(this.viewport.y, this.viewport.y + this.viewport.height),
            columnRange = this.getColumnRange(this.viewport.x, this.viewport.x + this.viewport.width),
            rowPos = 0,
            totalWidth = this.model.getWidth(),
            frag = document.createDocumentFragment();

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