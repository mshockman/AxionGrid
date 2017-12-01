/**
 * Created by mshoc on 9/19/2017.
 */


import {Publisher} from "../../common/events";


export class InlineFilterBar extends Publisher {
    constructor(grid) {
        super();
        this.view = $("<div class='inline-filter-bar'>");
        this.view.data({
            "filterBar": this
        });

        this._render = this.render.bind(this);

        this.view.on("change", (event) => {
            let filter = $(event.target).closest(".inline-filter-item").data("filter");
            this.publish("filter-change", {
                filter: filter,
                event: event,
                bar: this
            });
        });

        if(grid) this.setGrid(grid);
    }

    setGrid(grid) {
        this.grid = grid;
        this.grid.subscribe("render", this._render);
        this.grid.subscribe("col-resize", this._render);
    }

    appendTo(element) {
        this.view.appendTo(element);
    }

    render() {
        let fragment = document.createDocumentFragment(),
            totalWidth = 0;

        for(let column of this.grid.model.iterateColumns()) {
            let node = $("<div>"),
                filter = column.get("inlineFilter"),
                width = column.width;

            totalWidth += width;

            node.addClass("inline-filter-item");

            node.css({
                width: width,
                display: "inline-block"
            });

            if(filter) {
                node.data("filter", filter);
                filter.appendTo(node);
            }

            node.appendTo(fragment);
        }

        this.view.css("width", totalWidth);
        this.view.empty();
        this.view.append(fragment);
    }

    getFilters() {
        let r = {};

        for(let column of this.grid.model.iterateColumns()) {
            let filter = column.get("inlineFilter");

            if(filter && column.id) {
                r[column.id] = filter.getFilter();
            }
        }

        return r;
    }
}



export class InputTextFilter {
    constructor() {
        this.view = $("<div class='input-text-filter'>");
        this.input = $("<input type='text'>");

        this.view.append(this.input);
    }

    appendTo(element) {
        this.view.appendTo(element);
    }

    getFilter() {
        let val = this.input.val();
        return val ? val : null;
    }

    setFilter(filter) {
        this.input.val(filter || "");
    }
}


export class OperatorTextFilter {
    static DEFAULT_OPERATORS = [
        ["Exact", "exact", true, true],
        ["IEXACT", "iexact", false, true],
        ["Not Equals", "not", false, true],
        ["CONTAINS", "contains", false, true],
        ["ICONTAINS", "icontains", false, true],
        ["STARTSWITH", "startswith", false, true],
        ["ISTARTSWITH", "istartswith", false, true],
        ["ENDSWITH", "endswith", false, true],
        ["IENDSWITH", "iendswith", false, true],
        ["In List", "in", false, true],
        ["Is Empty", "is_empty", false, false],
        ["Is Not Empty", "not_empty", false, false]
    ];

    constructor(operators=OperatorTextFilter.DEFAULT_OPERATORS) {
        this.view = $("<div class='operator-text-filter'>");
        this.operators = {};

        this.select = $("<select>");

        for(let [label, value, selected, showText] of operators) {
            let $option = $(`<option value="${value}">${label}</option>`);

            if(selected) {
                $option.prop("selected", true);
            }

            this.select.append($option);

            this.operators[value] = {
                label: label,
                value: value,
                showText: showText
            };
        }

        this.text = $("<input type='text'>");
        this.view.append(this.select, this.text);

        this.select.on("change", () => {
            let value = this.select.val(),
                showText = this.operators[value].showText;

            if(showText === false) {
                this.text.css("display", "none");
            } else {
                this.text.css("display", "");
            }
        });
    }

    appendTo(element) {
        this.view.appendTo(element);
    }

    getFilter() {
        let operator = this.select.val(),
            value = this.text.val(),
            showText = this.operators[operator].showText;

        if(value || showText) {
            return {
                operator: operator,
                filter: value
            };
        } else if(!showText) {
            return {
                operator: operator()
            };
        } else {
            return null;
        }
    }

    setFilter(filter) {
        this.select.val(filter.operator);
        this.text.val(filter.filter || "");
    }
}


export class NumberRangeFilter {
    constructor() {
        this.view = $("<div class='number-range-filter'>");
        this.start = $("<input type='number'>");
        this.end = $("<input type='number'>");

        this.view.append(this.start);
        this.view.append(this.end);
    }

    appendTo(element) {
        this.view.appendTo(element);
    }

    getFilter() {
        let start = this.start.val(),
            end = this.end.val();

        if(start !== "" || end !== "") {
            return {
                start: start === "" ? null : start,
                end: end === "" ? null : end
            };
        }
    }

    setFilter(filter) {
        this.start.val(filter.start || "");
        this.end.val(filter.end || "");
    }
}


export class MultiSelectFilter {

}


export class BooleanFilter {

}


export class DateRangeFilter {

}


export class SelectFilter {

}