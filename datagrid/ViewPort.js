

export class ViewPort {
    constructor(container, canvas, {increment=400, verticalPadding=1000, horizontalPadding=1000, speedLimit=1000, refreshRate=100}={}) {
        this.viewport = $("<div class='grid-viewport'>");

        if(container) {
            this.viewport.appendTo(container);
        }

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

    setCanvas(canvas) {
        this.canvas = canvas;
        canvas.appendTo(this.viewport);
    }

    onScroll() {
        this._left = this.viewport.scrollLeft();
        this._top = this.viewport.scrollTop();

        if(!this._timer) {
            let x = this._left,
                y = this._top;

            let onTimeout = () => {
                if(this.speedLimit && (Math.abs(x - this._left) > this.speedLimit || Math.abs(y - this._top) > this.speedLimit)) {
                    x = this._left;
                    y = this._top;
                    this._timer = setTimeout(onTimeout, this.refreshRate);
                    return;
                }

                this._timer = null;

                let incrementX = Math.floor(this._left / this.increment),
                    incrementY = Math.floor(this._top / this.increment);

                if(incrementX === this._incrementX && incrementY === this._incrementY) {
                    return;
                }

                this.refresh();
            };

            this._timer = setTimeout(onTimeout, this.refreshRate);
        }
    }

    refresh() {
        this._incrementX = Math.floor(this._left / this.increment);
        this._incrementY = Math.floor(this._top / this.increment);

        let left = this._left,
            top = this._top,
            width = this.viewport.innerWidth(),
            height = this.viewport.innerHeight();

        this.canvas.setViewPort(left-this.horizontalPadding, top-this.verticalPadding, width+(this.horizontalPadding*2), height+(this.verticalPadding*2));
        this.canvas.render();
    }
}