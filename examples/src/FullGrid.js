import {BaseGrid} from "../../src/datagrid/Grid";
import {DataModel} from "../../src/datagrid/DataView";
import {GridDivCanvas} from "../../src/datagrid/Canvas";
import {CheckboxColumn} from "../../src/datagrid/contrib/CheckboxColumn";
import {GridHeader, ColumnRow} from "../../src/datagrid/contrib/Header";


export class FullGrid extends BaseGrid {
    constructor(container, endpoint, columns, filters) {
        let model = new DataModel(),
            canvas = new GridDivCanvas({
                model: model,
                virtualization: "both"
            });

        super(model, canvas);
        this.endpoint = endpoint;
        this.definations = columns;
        this.filters = filters;

        this.headerRow = new GridHeader();
        this.columnRow = new ColumnRow(this, {
            dataSortable: true
        });
        this.headerRow.append(this.columnRow);

        this.template();
        this.view.appendTo(container);

        this.view.find(".grid-header-wrapper").append(this.headerRow.view);
    }

    template() {
        this.view = $(`
            <div id="full-data-grid" class="full-grid darkula">
                <div class="filters"></div>
                <div class="toolbar"></div>
                <div class="grid-header-wrapper"></div>
                <div class="data-grid"></div>
                <div class="grid-footer"></div>
                <div class="status-bar"></div>
            </div>
        `);
    }

    statusbar() {

    }

    taskbar() {

    }

    setColumns(...columns) {
        let _columns = [
            new CheckboxColumn("selected", {
                resizable: false,
                width: 30,
                sortable: false
            })
        ];

        for(let i = 0, l = columns.length; i < l; i++) {
            let definition = this.definations[columns[i]];

            if(definition) {
                _columns.push(this.definations[columns[i]]);
            } else {
                throw new Error("Unknown column " + columns[i]);
            }
        }

        super.setColumns(_columns);
    }
}
