

export class ViewPort {
    constructor(grid) {
        this.viewport = $("<div class='grid-viewport'>");

        if(grid) this.setGrid(grid);

        this._onScroll = this.onScroll.bind(this);
        this.viewport.on("scroll", this._onScroll);

        this._left = 0;
        this._top = 0;
    }

    appendTo(element) {
        this.viewport.appendTo(element);
    }

    append(widget) {
        widget.appendTo(this.viewport);
    }

    setGrid(grid) {
        this.grid = grid;
    }

    onScroll() {
        this._left = this.viewport.scrollLeft();
        this._top = this.viewport.scrollTop();

        if(this.grid) this.grid.publish("scroll", this.getViewPort());
    }

    scrollLeft() {
        return this.viewport.scrollLeft();
    }

    scrollTop() {
        return this.viewport.scrollTop();
    }

    getViewPort() {
        return {
            left: this._left,
            top: this._top,
            width: this.viewport.innerWidth(),
            height: this.viewport.innerHeight()
        };
    }
}