

export class CheckboxColumn {
    constructor(name) {
        this.inputName = name;

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
            console.log("changed", val);
            cell.setMetaData("checked", val);
        };
    }
}
