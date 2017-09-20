import {DataModel} from "./DataView";
import * as util from "./util";
import {MetaData} from "./MetaData";
import {GridDivCanvas} from "./Canvas";
import {ViewPort} from "./ViewPort";
import {CheckboxColumn} from "./Columns";
import {GridHeader, ColumnRow} from "./Header";
import {InlineFilterBar, TextFilter} from "./InlineFilters";

import {publisher} from "./Publisher";


class BaseGrid {
    constructor(model, viewport, canvas) {
        this.viewport = viewport;
        this.model = model;
        this.canvas = canvas;

        this.viewport.setGrid(this);
        this.model.setGrid(this);
        this.canvas.setGrid(this);
    }

    setColumns(columns) {

    }

    setData(data) {

    }

    render() {
        this.canvas.render();
    }

    subscribe(topic, callback) {
        if(!this._subscriptions) {
            this._subscriptions = {};
        }

        if(!this._subscriptions[topic]) {
            this._subscriptions[topic] = [];
        }

        this._subscriptions[topic].push(callback);
    }

    publish(topic, ...args) {
        if(this._subscriptions && this._subscriptions[topic]) {
            for(let i = 0, l = this._subscriptions[topic].length; i < l; i++) {
                if(this._subscriptions[topic][i](...args) === false) {
                    break;
                }
            }
        }
    }

    unsubscribe(topic, callback) {
        if(this._subscriptions && this._subscriptions[topic]) {
            let i = this._subscriptions[topic].indexOf(callback);

            if(i !== -1) {
                this._subscriptions[topic].splice(i, 1);
                return callback;
            }
        }
    }
}


Object.assign(BaseGrid.prototype, publisher);


export {
    DataModel,
    util,
    MetaData,
    GridDivCanvas,
    ViewPort,
    CheckboxColumn,
    BaseGrid,
    GridHeader,
    ColumnRow,
    InlineFilterBar,
    TextFilter,
};
