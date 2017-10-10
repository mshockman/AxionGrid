

export class CheckboxColumn {
    constructor(name, options) {
        this.inputName = name;

        let label = $("<input type='checkbox' name='" + name + "'>");

        label.on("change", function(event) {
            let val = label.is(":checked"),
                grid = $(event.target).closest(".grid-column").data("grid");

            for(let i = 0, l = grid.model.getDataLength(); i < l; i++) {
                let row = grid.model.getRow(i);
                row.setMetaData(name, val);
            }

            grid.canvas.view.find("input[name='"+name+"']").prop("checked", val);
        });

        if(options) {
            Object.assign(this, options);
        }

        this.cellFormatter = function(cell) {
            let checked = cell.getRow().getMetaData(name) || false,
                r = $("<input type='checkbox' name='"+name+"'>");

            if(checked) {
                r.prop("checked", true);
            }

            return r;
        };

        this.onChange = function(cell, event) {
            let val = $(event.target).is(":checked");

            cell.getRow().setMetaData(name, val);

            if(!val) {
                label.prop("checked", false);
            }
        };

        this.label = function() {
            return label;
        }
    }
}
