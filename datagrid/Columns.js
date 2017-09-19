

export class CheckboxColumn {
    constructor(name, options) {
        this.inputName = name;

        if(options) {
            Object.assign(this, options);
        }

        this.cellFormatter = function(cell) {
            let checked = cell.getMetaData("checked") || false,
                inputName = cell.getMetaData("inputName"),
                r = $("<input type='checkbox' name='"+inputName+"'>");

            if(checked) {
                r.prop("checked", true);
            }

            return r;
        };

        this.onChange = function(cell, event) {
            let val = $(event.target).is(":checked");
            cell.setMetaData("checked", val);
        };

        this.label = function(column) {
            let inputName = column.getMetaData("inputName"),
                input = $("<input type='checkbox' name='" + inputName + "'>");

            return input;
        }
    }
}
