
export class QueryBuilder {
    constructor(fields, maxDepth=null, maxItems=null, maxRules=null, maxGroups=null) {
        this.fields = fields;
        this.maxDepth = maxDepth;
        this.maxItems = maxItems;
        this.maxRules = maxRules;
        this.maxGroups = maxGroups;

        this.view = $("<ul class='query-builder'>");
        this.root = new QueryGroup(null, this, 0);
        this.root.appendTo(this.view);
    }

    appendTo(selector) {
        this.view.appendTo(selector);
    }

    getFilter() {
        return this.root.getFilter();
    }

    onItemAdd(item) {
        let items = this.view.find(".query-item");

        if(this.maxItems != null) {
            if(items.length >= this.maxItems) {
                this.view.find(".btn-add-item").prop("disabled", true).addClass("disabled");
            }
        }

        if(this.maxRules != null) {
            if(items.filter(".query-rule").length >= this.maxRules) {
                this.view.find(".btn-add-rule").prop("disabled", true).addClass("disabled");
            }
        }

        if(this.maxGroups != null) {
            if(items.filter(".query-group").length >= this.maxGroups) {
                this.view.find(".btn-add-group").prop("disabled", true).addClass("disabled");
            }
        }
    }

    onItemRemove(item) {
        let items = this.view.find(".query-item");

        if(this.maxItems != null) {
            if(items.length < this.maxItems) {
                this.view.find(".btn-add-item.disabled").prop("disabled", false).removeClass("disabled");
            }
        }

        if(this.maxRules != null) {
            if(items.filter(".query-rule").length < this.maxRules) {
                this.view.find(".btn-add-rule.disabled").prop("disabled", false).removeClass("disabled");
            }
        }

        if(this.maxGroups != null) {
            if(items.filter(".query-group").length < this.maxGroups) {
                this.view.find(".btn-add-group.disabled").prop("disabled", false).removeClass("disabled");
            }
        }
    }
}


export class QueryGroup {
    constructor(parent, builder, depth) {
        this.parent = parent;
        this.builder = builder;
        this.depth = depth;
        this.view = $("<li class='query-group query-item'>");
        this.view.data("filter", this);

        let header = $("<div class='query-header'>"),
            operatorWrapper = $("<div class='query-operators'>"),
            actionsWrapper = $("<div class='query-actions'>"),
            addRuleBTN = $("<button type='button' class='btn-add-item btn-add-rule'>Add Rule</button>"),
            addGroupBTN = $("<button type='button' class='btn-add-item btn-add-group'>Add Group</button>"),
            andBTN = $("<button type='button' class='selected'>And</button>"),
            orBTN = $("<button type='button'>Or</button>");

        if(this.builder.maxDepth != null && this.builder.maxDepth <= depth) {
            addGroupBTN.prop("disabled", true).addClass("disabled");
        }

        andBTN.data("operator", "AND");
        orBTN.data("operator", "OR");

        actionsWrapper.append(addGroupBTN, addRuleBTN);
        operatorWrapper.append(andBTN, orBTN);
        header.append(operatorWrapper, actionsWrapper);
        this.operatorWrapper = operatorWrapper;

        if(this.parent) {
            let deleteBTN = $("<button type='button'>Delete</button>");
            actionsWrapper.append(deleteBTN);

            deleteBTN.on("click", (event) => {
                this.view.remove();
                this.builder.onItemRemove(this);
            });
        }

        addGroupBTN.on("click", () => this.addGroup());
        addRuleBTN.on("click", () => this.addRule());

        operatorWrapper.on("click", (event) => {
            let btn = $(event.target).closest("button", operatorWrapper);

            if(btn.length && !btn.hasClass("selected")) {
                operatorWrapper.find(".selected").removeClass("selected");
                btn.addClass("selected");
            }
        });

        this.itemList = $("<ul class='query-list'>");
        this.view.append(header, this.itemList);
    }

    appendTo(selector) {
        this.view.appendTo(selector);
    }

    addGroup() {
        let group = new QueryGroup(this, this.builder, this.depth + 1);
        group.appendTo(this.itemList);
        this.builder.onItemAdd(group);
        return true;
    }

    addRule() {
        let rule = new QueryRule(this, this.builder);
        rule.appendTo(this.itemList);
        this.builder.onItemAdd(rule);
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
        this.view = $("<li class='query-rule query-item'>");
        this.filterView = $("<div class='query-filter'>");
        this.actionsView = $("<div class='query-actions'>");
        this.view.data("filter", this);

        this.fieldsSelect = $("<select>");

        // If the rule has a parent add a delete button.
        if(this.parent) {
            let deleteBTN = $("<button type='button'>Delete</button>");
            this.actionsView.append(deleteBTN);

            deleteBTN.on("click", (event) => {
                this.view.remove();
                this.builder.onItemRemove(this);
            });
        }

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

        this.view.append(this.fieldsSelect, this.filterView, this.actionsView);
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
