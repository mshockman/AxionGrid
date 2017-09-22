/**
 * Created by mshoc on 9/19/2017.
 */


export class InlineFilterBar {
    constructor(grid) {
        this.view = $("<div class='inline-filter-bar'>");

        this.view.data({
            filterBar: this
        });

        this._render = this.render.bind(this);

        if(grid) this.setGrid(grid);
    }

    setGrid(grid) {
        this.grid = grid;

        this.grid.subscribe("render", (target) => {
            if(target === this.grid.canvas) this.render();
        });

        this.grid.subscribe("resizing", this._render);
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

    getFilters() {
        let r = {};

        for(let i = 0, l = this.grid.model.getColumnLength(); i < l; i++) {
            let column = this.grid.model.getColumn(i),
                inlineFilter = column.getMetaData("inlineFilter");

            if(inlineFilter) {
                r[inlineFilter.getField()] = inlineFilter.getFilter();
            }
        }

        return r;
    }
}


export class TextFilter {
    constructor(field) {
        this.field = field;

        this.operators = [
            ["Exact", "exact", true],
            ["IEXACT", "iexact"],
            ["Not Equals", "not"],
            ["CONTAINS", "contains"],
            ["ICONTAINS", "icontains"],
            ["STARTSWITH", "startswith"],
            ["ISTARTSWITH", "istartswith"],
            ["ENDSWITH", "endswith"],
            ["IENDSWITH", "iendswith"],
            ["In List", "in"],
            ["Is Empty", "is_empty"],
            ["Is Not Empty", "not_empty"]
        ];

        this.view = $("<div class='inline-filter'>");

        let wrapper = $("<div>");
        this.select = $("<select>");

        for(let i = 0, l = this.operators.length; i < l; i++) {
            let $option = $(`<option value="${this.operators[i][1]}">${this.operators[i][0]}</option>`);

            if(this.operators[i][2] === true) {
                $option.prop("selected", true);
            }

            this.select.append($option);
        }

        wrapper.append(this.select);
        this.view.append(wrapper);

        wrapper = $("<div>");
        this.textbox = $("<input type='text'>");

        wrapper.append(this.textbox);
        this.view.append(wrapper);
    }

    appendTo(element) {
        this.view.appendTo(element);
    }

    getFilter() {
        return {
            operator: this.select.val(),
            filter: this.textbox.val()
        };
    }

    setFilter(filter) {
        this.select.val(filter.operator);
        this.textbox.val(filter.filter);
    }

    getField() {
        return this.field;
    }
}