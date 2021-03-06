/**
 * A canvas object is responsible for drawing the currently viewable parts of the data model to the screen and catching
 * and passing events that happen to those element to the grid.
 */


export class GridDivCanvas {
    /**
     *
     * @param grid
     * @param virtualization Controls cell and row virtualization.  Can be 'row', 'cell', or 'both'.
     * @param refreshRate The amount of time after the scroll event is fired that the canvas will refresh.
     * @param paddingLeft The amount of offscreen content rendered to the left.
     * @param paddingTop The amount of offscreen content rendered to the right.
     * @param paddingBottom The amount of offscreen content rendered to the bottom.
     * @param paddingRight The amount of offscreen content rendered to the right.
     * @param verticalPadding Vertical padding on rendering.  Controls the amount of rows that will be rendered off screen.
     * @param horizontalPadding Horizontal padding during rendering.  Controls the cells that are rendered off screen.
     * @param padding Used to set both the horizontal and vertical padding.
     * @param speedLimit Prevents rendering when the user is scrolling faster then the speed limit.  Rendering is differed until the next frame. Speed limit is relative to the refresh rate.
     * @param viewport Controls the viewport of the canvas.  Defaults it its view wrapper.  Can be a single element or an array of two element representing the horizontal and vertical viewport respectively.
     */
    constructor({grid=null, virtualization="row", refreshRate=100, paddingLeft=0, paddingTop=0, paddingBottom=0, paddingRight=0, verticalPadding=null, horizontalPadding=null, padding=null, speedLimit=1000, viewport=null}={}) {
        this.virtualization = virtualization;
        this.refreshRate = refreshRate;
        this.speedLimit = speedLimit;
        this.onScroll = this.onScroll.bind(this);
        this.paddingLeft = paddingLeft;
        this.paddingTop = paddingTop;
        this.paddingRight = paddingRight;
        this.paddingBottom = paddingBottom;

        if(padding != null) {
            this.paddingLeft = this.paddingRight = this.paddingBottom = this.paddingTop = padding;
        }

        if(verticalPadding != null) {
            this.paddingTop = this.paddingBottom = verticalPadding;
        }

        if(horizontalPadding != null) {
            this.paddingLeft = this.paddingRight = horizontalPadding;
        }

        // The position of the viewport scrolling when the viewport was last rendered.
        this._left = 0;
        this._top = 0;

        // The current position of the viewport scrolling.
        this.scrollLeft = 0;
        this.scrollTop = 0;

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

    /**
     * Sets the parent grid object for the canvas.
     * @param grid {BaseGrid}
     */
    setGrid(grid) {
        this.grid = grid;
    }

    /**
     * Append the canvas element to the specified selector.
     * @param element
     * @returns {*}
     */
    appendTo(element) {
        return this.view.appendTo(element);
    }

    /**
     * Renders the row by creating a jquery object.  Can be overridden to customize.
     * @param row
     * @returns {jQuery}
     */
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

    /**
     * Renders the cell by creating a jquery object.  Can be overridden to customize.
     * @param cell
     * @returns {*|jQuery}
     */
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

    /**
     * Function that renders every visible row to the canvas.
     */
    render(force=true) {
        let rowStart = 0,
            rowEnd = this.model.getDataLength(),
            cellStart = 0,
            cellEnd = this.model.getColumnLength(),
            frag = document.createDocumentFragment(),
            cellStartPos = 0;

        // Save the scroll state that the canvas was last rendered in.
        // This is used to calculate speed limits for rendering during onScroll.
        this._left = this.scrollLeft;
        this._top = this.scrollTop;

        // Get the row and cell start and stop bounds for rendering.
        // This is only used if virtualization is enabled by setting the virtualization
        // property to one of the valid values.  Otherwise the start and end values are
        // set to 0, length-1 respectively and every row and cell is rendered reguardless
        // of the viewport.

        // Get virtualization bounds.
        if(this.virtualization === "both" || this.virtualization === "row") {
            let _row = this.model.getRowAt(this.scrollTop - this.paddingTop);
            rowStart = _row ? _row.rowNumber : 0;

            _row = this.model.getRowAt(this.scrollTop + this.height + this.paddingBottom);
            rowEnd = _row ? _row.rowNumber : rowEnd - 1;
        }

        if(this.virtualization === "both" || this.virtualization === "cell") {
            let _cell = this.model.getColAt(this.scrollLeft - this.paddingLeft);
            cellStartPos = _cell.left;
            cellStart = _cell ? _cell.columnNumber : 0;

            _cell = this.model.getColAt(this.scrollLeft + this.width + this.paddingRight);
            cellEnd = _cell ? _cell.columnNumber : cellEnd - 1;
        }

        // The force flag is used to force the render function to refresh the canvas even
        // if the position has not changed.
        if(this._rowStart === rowStart && this._rowEnd === rowEnd && this._cellStart === cellStart && this._cellEnd === cellEnd && force !== true) {
            // Nothing has changed don't render.
            return;
        }

        // Set canvas properties
        this.canvas.css({
            height: this.model.getHeight(),
            width: this.model.getWidth()
        });

        // Save the current render state so we can compare of efficiency.
        this._rowStart = rowStart;
        this._rowEnd = rowEnd;
        this._cellStart = cellStart;
        this._cellEnd = cellEnd;

        // Render the dom node clear the canvas and to the screen.
        for(let y = rowStart; y <= rowEnd; y++) {
            let row = this.model.getRow(y),
                $row = this.rowRenderer(row),
                cellPos = cellStartPos;

            for(let x = cellStart; x <= cellEnd; x++) {
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

    /**
     * Set the viewport elements of the canvas.  By default this is set to this.view in the constructor.
     * The viewport controls the area that is visible in the canvas.  Can either be a single element
     * or a pair of element where the first is the horizontal viewport and the second is the
     * vertical viewport.
     * @param viewport
     */
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

    /**
     * Return the vertical viewport jquery node.
     * @returns {jQuery}
     */
    get viewportVertical() {
        return this.viewport[1];
    }

    /**
     * Returns the horizontal viewport jquery node.
     * @returns {jQuery}
     */
    get viewportHorizontal() {
        return this.viewport[0];
    }

    /**
     * Returns the current DataModel object.
     * @returns {DataModel}
     */
    get model() {
        return this.grid.model;
    }

    /**
     * Returns the inner width of the horizontal viewport.
     * @returns {number}
     */
    get width() {
        return this.viewportHorizontal.innerWidth();
    }

    /**
     * Returns the inner height of the horizontal viewport.
     * @returns {number}
     */
    get height() {
        return this.viewportVertical.innerHeight();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event Methods

    /**
     * Handles the scroll events for the viewport.
     */
    onScroll() {
        this.scrollLeft = this.viewportHorizontal.scrollLeft();
        this.scrollTop = this.viewportVertical.scrollTop();

        let dx = Math.abs(this._left - this.scrollLeft),
            dy = Math.abs(this._top - this.scrollTop);

        if(this.timer && (dx > this.speedLimit || dy > this.speedLimit)) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.timer = setTimeout(() => {
            this.render(false);
            this.timer = null;
        }, this.refreshRate);

        this.grid.publish("viewport-change", this);
    }
}
