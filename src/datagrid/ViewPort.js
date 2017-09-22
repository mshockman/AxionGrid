

export class ViewPort {
    constructor({increment=400, verticalPadding=1000, horizontalPadding=1000, speedLimit=1000, refreshRate=100, grid=null, canvas=null}={}) {
        this.viewport = $("<div class='grid-viewport'>");

        if(grid) this.setGrid(grid);
        if(canvas) this.setCanvas(canvas);

        this._onScroll = this.onScroll.bind(this);
        this.viewport.on("scroll", this._onScroll);

        this.increment = increment;
        this.verticalPadding = verticalPadding;
        this.horizontalPadding = horizontalPadding;
        this.speedLimit = speedLimit;
        this.refreshRate = refreshRate;

        this._left = 0;
        this._top = 0;
        this._incrementX = 0;
        this._incrementY = 0;
    }

    appendTo(element) {
        this.viewport.appendTo(element);
    }

    setGrid(grid) {
        this.grid = grid;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        canvas.appendTo(this.viewport);

        let width = this.viewport.innerWidth(),
            height = this.viewport.innerHeight();

        this.canvas.setViewPort(this._left-this.horizontalPadding, this._top-this.verticalPadding, width+(this.horizontalPadding*2), height+(this.verticalPadding*2));
    }

    onScroll() {
        this._left = this.viewport.scrollLeft();
        this._top = this.viewport.scrollTop();

        this.canvas.setViewPort(this._left, this._top, this.viewport.innerWidth(), this.viewport.innerHeight());

        if(this.grid) this.grid.publish("scroll", this._left, this._top);
    }

    scrollLeft() {
        return this.viewport.scrollLeft();
    }

    scrollTop() {
        return this.viewport.scrollTop();
    }
}