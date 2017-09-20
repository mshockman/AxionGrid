/**
 * Created by mshoc on 9/19/2017.
 */


export class InlineFilterBar {
    constructor(grid) {
        this.view = $("<div class='inline-filter-bar'>");

        this.view.data({
            filterBar: this
        });

        if(grid) this.setGrid(grid);
    }

    setGrid(grid) {
        this.grid = grid;

        this.grid.subscribe("refresh", this.render.bind(this));
        this.grid.subscribe("resizing", this.render.bind(this));
    }

    render() {
        let frag = document.createDocumentFragment();

        for(let i = 0, l = this.grid.model.getColumnLength(); i < l; i++) {
            let column = this.grid.model.getColumn(i),
                $column = $("<div class='grid-column inline-filter-column'>"),
                inlineFilter = column.getMetaData("inlineFilter");

            $column.css({
                width: column.getWidth(),
                display: "inline-block"
            });

            $column.data({
                filterBar: this,
                grid: this.grid
            });

            if(inlineFilter) {
                inlineFilter.appendTo($column);
            }

            $column.appendTo(frag);
        }

        this.view.empty();
        this.view.append(frag);
    }

    appendTo(element) {
        this.view.appendTo(element);
    }
}