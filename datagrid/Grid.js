import {DataModel} from "./DataView";
import {Dimension} from "./Dimension";
import * as util from "./util";
import {MetaData} from "./MetaData";
import {$GridDivCanvas} from "./Canvas";
import {ViewPort} from "./ViewPort";
import {CheckboxColumn} from "./Columns";
import {GridHeader, ColumnRow} from "./Header";


class BaseGrid {
    constructor(model, viewport, canvas) {
        this.viewport = viewport;
        this.model = model;
        this.canvas = canvas;
    }

    render() {
        this.canvas.render();
    }
}


export {
    DataModel,
    Dimension,
    util,
    MetaData,
    $GridDivCanvas,
    ViewPort,
    CheckboxColumn,
    BaseGrid,
    GridHeader,
    ColumnRow
};
