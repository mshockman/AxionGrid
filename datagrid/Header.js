

export class GridHeader {
    constructor() {
        this.view = $("<div class='grid-header'>");
        this.viewport = $("<div class='grid-header-viewport'>");
        this.viewport.css({
            "overflow-x": "hidden",
            position: "relative",
            height: 25
        });
        this.view.append(this.viewport);
    }

    bindToViewPort(viewport) {
        if(viewport.viewport) {
            viewport = $(viewport.viewport);
        } else {
            viewport = $(viewport);
        }

        viewport.on("scroll", (event) => {
            this.viewport.scrollLeft($(event.target).scrollLeft());
        });
    }

    appendTo(element) {
        this.view.appendTo(element);
    }

    append(element) {
        if(element.appendTo) {
            element.appendTo(this.viewport);
        } else {
            this.viewport.append(element);
        }
    }
}


export class ColumnRow {
    constructor(model) {
        this.model = model;
        this.view = $("<div class='grid-column-row'>").css({
            position: "relative"
        });
    }

    setViewport(viewport) {

    }

    render() {
        let pos = 0;

        this.view.css({
            width: this.model.getWidth() + 50 // any extra that might be needed for the sidebar.
        });

        for(let i = 0, l = this.model.getColumnLength(); i < l; i++) {
            let $column = $("<div class='grid-column'>"),
                column = this.model.getColumn(i),
                name = column.getLabel(),
                width = column.getWidth();

            $column.addClass(column.getClasses());
            $column.attr(column.getAttributes());
            $column.css(column.getStyle());

            $column.css({
                position: "absolute",
                width: width,
                left: pos
            });

            pos += width;

            $column.append(name);
            this.view.append($column);
        }
    }

    appendTo(element) {
        this.view.appendTo(element);
    }
}
