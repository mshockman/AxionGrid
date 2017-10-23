/**
 * A canvas object is responsible for drawing the currently viewable parts of the data model to the screen and catching
 * and passing events that happen to those element to the grid.
 */
import {clamp} from "../common/util";


export class GridDivCanvas {
    /**
     *
     * @param grid
     * @param virtualization Controls cell and row virtualization.  Can be 'row', 'cell', or 'both'.
     * @param refreshRate The amount of time after the scroll event is fired that the canvas will refresh.
     * @param verticalPadding Vertical padding on rendering.  Controls the amount of rows that will be rendered off screen.
     * @param horizontalPadding Horizontal padding during rendering.  Controls the cells that are rendered off screen.
     * @param speedLimit Prevents rendering when the user is scrolling faster then the speed limit.  Rendering is differed until the next frame. Speed limit is relative to the refresh rate.
     * @param viewport Controls the viewport of the canvas.  Defaults it its view wrapper.  Can be a single element or an array of two element representing the horizontal and vertical viewport respectively.
     */
    constructor({grid=null, virtualization="row", refreshRate=100, verticalPadding=1000, horizontalPadding=1000, speedLimit=1000, viewport=null}={}) {
        this.virtualization = virtualization;
        this.refreshRate = refreshRate;
        this.verticalPadding = verticalPadding;
        this.horizontalPadding = horizontalPadding;
        this.speedLimit = speedLimit;
        this.onScroll = this.onScroll.bind(this);

        this._left = 0;
        this._top = 0;

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

        this.setViewPort(this.view);

        if(grid) this.setGrid(grid);
    }

    setGrid(grid) {
        this.grid = grid;
    }

    appendTo(element) {
        return this.view.appendTo(element);
    }

    rowRenderer(row) {
        let $row = $("<div class='grid-row'>").css({
            position: "absolute",
            height: row.height,
            width: row.width,
            top: row.top
        });

        $row.addClass(row.classes);
        $row.attr(row.attributes);
        $row.css(row.style);
        $row.data("rowNumber", row.rowNumber);
        $row.attr("data-row-number", row.rowNumber);

        return $row;
    }

    cellRenderer(cell) {
        let $cell = $("<div class='grid-cell'>").css({
                position: "absolute",
                width: cell.width,
                height: cell.height
            }),
            formatter = cell.formatter;

        if(formatter) {
            $cell.append(formatter(cell));
        } else {
            $cell.append(cell.value);
        }

        $cell.data({
            "cellNumber": cell.cellNumber,
            "rowNumber": cell.rowNumber
        });

        $cell.attr("data-cell-number", cell.cellNumber);
        $cell.css(cell.style);
        $cell.attr(cell.attributes);
        $cell.addClass(cell.classes);

        return $cell;
    }

    render() {
        let rowStart = 0,
            rowEnd = this.model.getDataLength(),
            cellStart = 0,
            cellEnd = this.model.getColumnLength(),
            frag = document.createDocumentFragment(),
            cellStartPos = 0;

        this._left = this.scrollLeft;
        this._top = this.scrollTop;

        // Set canvas properties
        this.canvas.css({
            height: this.model.getHeight(),
            width: this.model.getWidth()
        });

        // Get virtualization bounds.
        if(this.virtualization === "both" || this.virtualization === "row") {
            let _row = this.model.getRowAt(this.scrollTop - this.verticalPadding);
            rowStart = _row ? _row.rowNumber : 0;

            _row = this.model.getRowAt(this.scrollTop + this.height + this.verticalPadding);
            rowEnd = _row ? _row.rowNumber : rowEnd;
        }

        if(this.virtualization === "both" || this.virtualization === "cell") {
            let _cell = this.model.getColAt(this.scrollLeft - this.horizontalPadding);
            cellStartPos = _cell.left;
            cellStart = _cell ? _cell.columnNumber : 0;

            _cell = this.model.getColAt(this.scrollLeft + this.width + this.verticalPadding);
            cellEnd = _cell ? _cell.columnNumber : cellEnd;
        }

        // Generate dom nodes.
        for(let y = rowStart; y < rowEnd; y++) {
            let row = this.model.getRow(y),
                $row = this.rowRenderer(row),
                cellPos = cellStartPos;

            for(let x = cellStart; x < cellEnd; x++) {
                let cell = row.getCell(x),
                    $cell = this.cellRenderer(cell);

                $cell.css('left', cellPos);
                cellPos += cell.width;

                $row.append($cell);
            }

            $row.appendTo(frag);
        }

        // Append to document.
        this.canvas.empty();
        this.canvas.append(frag);
    }

    setViewPort(viewport) {
        if(this.viewport) {
            this.viewport[0][0].off("scroll", this.onScroll);

            if(this.viewport[0][0] !== this.viewport[0][1]) {
                this.viewport[0].off("scroll", this.onScroll);
            }
        }

        this.viewport = null;

        if(viewport != null) {
            if(Array.isArray(viewport)) {
                this.viewport = [$(viewport[0]), $(viewport[1])];
            } else {
                viewport = $(viewport[0]);
                this.viewport = [viewport, viewport];
            }

            this.viewport[0].on("scroll", this.onScroll);

            if(this.viewport[0] !== this.viewport[1]) {
                this.viewport[1].on("scroll", this.onScroll);
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Properties

    get viewportVertical() {
        return this.viewport[1];
    }

    get viewportHorizontal() {
        return this.viewport[0];
    }

    get model() {
        return this.grid.model;
    }

    get scrollLeft() {
        return this.viewportHorizontal.scrollLeft();
    }

    get scrollTop() {
        return this.viewportVertical.scrollTop();
    }

    get width() {
        return this.viewportHorizontal.innerWidth();
    }

    get height() {
        return this.viewportVertical.innerHeight();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Methods

    onScroll(event) {
        let dx = Math.abs(this._left - this.scrollLeft),
            dy = Math.abs(this._top - this.scrollTop);

        if(this.timer && dx > this.speedLimit || dy > this.speedLimit) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.timer = setTimeout(() => {
            this.render();
        }, this.refreshRate);
    }
}
