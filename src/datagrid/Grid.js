import {DataModel} from './DataView';
import {GridDivCanvas} from './Canvas';

import {GridHeader, ColumnRow} from './contrib/Header';
import {Publisher} from "../common/events";


export class BaseGrid extends Publisher {
    constructor(model, canvas) {
        super();
        this.model = model;
        this.canvas = canvas;

        this.canvas.setDataModel(this.model);

        this._captureEvent = (...args) => {
            this.publish(...args);
        };

        this.model.subscribe("*", this._captureEvent);
        this.canvas.subscribe("*", this._captureEvent);
    }

    setColumns(columns) {
        this.model.setColumns(columns);
    }

    setData(data) {
        this.model.setData(data);
    }

    render() {
        this.canvas.render();
        this.publish("render", this);
    }
}


export class StandardGrid extends BaseGrid {
    constructor(container, data, columns, options={}) {
        let model = new DataModel(options),
            canvas = new GridDivCanvas(options);

        super(model, canvas);

        if(data) this.model.setData(data);
        if(columns) this.model.setColumns(columns);

        this.container = $(container);
        this.header = new GridHeader();
        this.columnRow = new ColumnRow(null, options);

        this.header.setGrid(this);
        this.columnRow.setGrid(this);
        this.header.append(this.columnRow);

        this.header.appendTo(this.container);
        this.canvas.appendTo(this.container);
    }
}