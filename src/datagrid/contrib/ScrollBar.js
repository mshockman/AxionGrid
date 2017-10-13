

export class HorizontalScrollBar {
    constructor(size, viewport) {
        this.view = $("<div class='horizontal-scroll-bar'></div>");
        this.setSize(size, viewport);
    }

    setSize(size, viewport) {
        this.size = size;
        this.viewport = viewport;
    }
}