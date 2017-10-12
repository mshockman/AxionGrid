
export class QueryBuilder {
    constructor(fields, maxDepth=null) {
        this.fields = fields;
        this.maxDepth = maxDepth;

        this.view = $("<div class='query-builder'>");
        this.root = new QueryGroup(this, this, 0);
        this.root.appendTo(this.view);
    }

    appendTo(selector) {
        this.view.appendTo(selector);
    }

    getFilter() {
        return this.root.getFilter();
    }
}


export class QueryGroup {
    constructor(parent, builder, depth) {
        this.parent = parent;
        this.builder = builder;
        this.depth = depth;
        this.view = $("<li class='query-group'>");
        this.view.data("filter", this);

        let header = $("<div class='query-header'>"),
            operatorWrapper = $("<div class='query-operators'>"),
            actionsWrapper = $("<div class='query-actions'>"),
            addRuleBTN = $("<button type='button'>Add Rule</button>"),
            addGroupBTN = $("<button type='button'>Add Group</button>"),
            andBTN = $("<button type='button' class='selected'>And</button>"),
            orBTN = $("<button type='button'>Or</button>");

        andBTN.data("operator", "AND");
        orBTN.data("operator", "OR");

        actionsWrapper.append(addGroupBTN, addRuleBTN);
        operatorWrapper.append(andBTN, orBTN);
        header.append(operatorWrapper, actionsWrapper);
        this.operatorWrapper = operatorWrapper;

        addGroupBTN.on("click", () => this.addGroup());
        addRuleBTN.on("click", () => this.addRule());

        operatorWrapper.on("click", (event) => {
            let btn = $(event.target).closest("button", operatorWrapper);

            if(btn.length && !btn.hasClass("selected")) {
                operatorWrapper.find(".selected").removeClass("selected");
                btn.addClass("selected");
            }
        });

        this.itemList = $("<div class='query-list'>");
        this.view.append(header, this.itemList);
    }

    appendTo(selector) {
        this.view.appendTo(selector);
    }

    addGroup() {
        let group = new QueryGroup(this, this.builder, this.depth + 1);
        group.appendTo(this.itemList);
        return true;
    }

    addRule() {
        let rule = new QueryRule(this, this.builder);
        rule.appendTo(this.itemList);
        return true;
    }

    getFilter() {
        let r = [];

        this.itemList.children(".query-rule, .query-group").each(function() {
            r.push($(this).data("filter").getFilter());
        });

        return {
            type: "group",
            operator: this.getOperator(),
            filters: r
        };
    }

    getOperator() {
        return this.operatorWrapper.find(".selected").data("operator");
    }
}


export class QueryRule {
    constructor(parent, builder, depth) {
        this.parent = parent;
        this.builder = builder;
        this.depth = depth;
        this.view = $("<li class='query-rule'>");
        this.filterView = $("<div class='query-filter'>");
        this.view.data("filter", this);

        this.fieldsSelect = $("<select>");

        for(let i = 0, l = this.builder.fields.length; i < l; i++) {
            let field = this.builder.fields[i],
                option = $(`<option value="${field.field}">${field.label || field.field}</option>`);

            option.data("filter", field);

            if(i === 0 || field.selected) {
                this.setFilter(field);
            }

            this.fieldsSelect.append(option);
        }

        this.fieldsSelect.on("change", () => {
            this.setFilter(this.fieldsSelect.find(":selected").data("filter"));
        });

        this.view.append(this.fieldsSelect, this.filterView);
    }

    appendTo(selector) {
        this.view.appendTo(selector);
    }

    setFilter(field) {
        this.filterView.empty();
        let filter = field.filter.create(field.field);
        filter.appendTo(this.filterView);
        this.filter = filter;
    }

    getFilter() {
        if(this.filter) {
            let r = this.filter.getFilter();
            r.type = "rule";
            return r;
        } else {
            return null;
        }
    }
}


export class TextFilter {
    constructor(operators, placeholder) {
        if(!operators) {
            this.operators = [
                ["Equals", "eq"],
                ["IEquals", "ieq"],
                ["Not Equals", "ne"],
                ["Contains", "contains"],
                ["IContains", "icontains"],
                ["Starts With", "startswith"],
                ["Ends With", "endswith"],
                ["Is Blank", "isblank"],
                ["In List", "inlist"],
                ["Not In List", "notinlist"],
            ];
        } else {
            this.operators = operators;
        }

        this.placeholder = placeholder;
    }

    create(field) {
        let view = $("<div>"),
            operator = $("<select>"),
            text = $("<input type='text' />");

        if(this.placeholder) {
            text.prop("placeholder", this.placeholder);
        }

        for(let i = 0, l = this.operators.length; i < l; i++) {
            let op = this.operators[i],
                option = $(`<option value="${op[0]}">${op[1]}</option>`);
            operator.append(option);
        }

        view.append(operator, text);

        return {
            type: this,

            field: field,

            getFilter() {
                return {
                    field: this.field,
                    operator: operator.val(),
                    value: text.val()
                };
            },

            view: view,

            appendTo(selector) {
                this.view.appendTo(selector);
            }
        };
    }
}
