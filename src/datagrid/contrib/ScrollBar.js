import {clamp} from "../../common/util";
import {Publisher} from "../../common/events";

export class ScrollBar extends Publisher {
    constructor(type, size, viewport, increment=10, delay=500, pos=0, fps=1000/60, speed=500/60) {
        super();
        let c = "scrollbar-vertical";
        this.type = "vertical";

        if(type === "horizontal") {
            this.type = "horizontal";
            c = "scrollbar-horizontal";
        }

        this.increment = increment;
        this.delay = delay;
        this.pos = pos;
        this.fps = fps;
        this.speed = speed;

        this.positiveButton = this.initButton("positive");
        this.negativeButton = this.initButton("negative");
        this.initHandle(this.handle);

        this.wrapper = $("<div class='scrollbar-handle-wrapper'>");
        this.wrapper.append(this.handle);

        this.view = $(`<div class='scrollbar ${c}'></div>`);
        this.view.append(this.negativeButton, this.wrapper, this.positiveButton);
        this.setSize(size, viewport);
    }

    setSize(size, total) {
        this.size = size;
        this.total = total;

        this.ratio = this.size / this.total;
        this.handle.css(
            this.type === "horizontal" ? "width" : height,
            (this.ratio * 100).toFixed(2) + "%");
    }

    appendTo(selector) {
        this.view.appendTo(selector);
    }

    initHandle() {
        this.handle = $("<div class='scrollbar-handle'>");

        let doc = null,
            onMouseMove = null,
            captured = false;

        let onMouseUp = (event) => {
            doc.off("mouseup", onMouseUp);
            doc.off("mousemove", onMouseMove);
            captured = false;
        };

        let onMouseDown = (event) => {
            event.preventDefault();

            if(captured) {
                doc.off("mouseup", onMouseUp);
                doc.off("mousemove", onMouseMove);
            }

            captured = true;

            let offset = this.handle.offset(),
                deltaX = event.pageX - offset.left,
                deltaY = event.pageY - offset.top,
                width = this.wrapper.innerWidth(),
                wrapper = this.wrapper.offset();

            onMouseMove = (event) => {
                if(this.type === "horizontal") {
                    let x = (event.clientX - wrapper.left - deltaX) / width;
                    x = clamp(x, 0, this.ratio);
                    this.setPosition(x * this.total);
                } else {
                    let y = (event.clientY - wrapper.top - deltaY) / width;
                    y = clamp(y, 0, this.ratio);
                    this.setPosition(y * this.total);
                }
            };

            doc = $(document);

            doc.on("mousemove", onMouseMove);
            doc.on("mouseup", onMouseUp);
        };

        this.handle.on("mousedown", onMouseDown);
    }

    initButton(type) {
        let isMouseOver = false,
            timer = null,
            that = this,
            doc = null,
            button = $(`<button type='button' class='${type} btn'></button>`),
            active = false;

        if(type === "negative") {
            type = -1;
        } else {
            type = 1;
        }

        button.on("mouseover", (event) => {
            isMouseOver = true;

            if(active && !timer) {
                timer = setTimeout(fn, that.fps);
            }
        });

        button.on("mouseout", (event) => {
            isMouseOver = false;

            if(timer) {
                clearTimeout(timer);
                timer = null;
            }
        });

        let fn = () => {
            that.setPosition(that.pos + that.speed * type);
            timer = setTimeout(fn, that.fps);
        };

        let onMouseUp = (event) => {
            if(timer) {
                clearTimeout(timer);
                timer = null;
            }

            doc.off("mouseup", onMouseUp);
            doc = null;
            active = false;
        };

        button.on("mousedown", (event) => {
            if(timer) {
                clearTimeout(timer);
            }

            this.setPosition(that.pos + that.increment * type);

            active = true;
            timer = setTimeout(fn, that.delay);
            doc = $(document);
            doc.on("mouseup", onMouseUp);
        });

        return button;
    }

    setPosition(amount) {
        this.pos = clamp(amount, 0, this.total - this.size);
        let ratio = this.pos / this.total,
            pos = (ratio * 100).toFixed(2);
        this.handle.css(this.type === "horizontal" ? "left" : "top", pos + "%");
        this.publish("scroll", this.total * ratio);
    }
}
