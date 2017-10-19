import {coordinateString} from "./util";
import {clamp} from "../common/util";
import {Publisher} from "../common/events";


/**
 * Model class that stores row, column and cell information.
 *
 * Extends Publisher class.
 * topics
 *     data-change
 *          type
 *              data - The data has changed.
 *              column - The columns have changed.
 *
 *
 */
export class DataModel extends Publisher {
    constructor({data=null, columns=null, rowHeight=25, defaultColumnWidth=100, minWidth=null, maxWidth=null, pk=null}={}) {
        super();
        this.rowHeight = rowHeight;
        this.defaultColumnWidth = defaultColumnWidth;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.data = null;
        this.pk = pk;

        this.rowData = new MetaData();
        this.cellData = new MetaData();
        this.columnData = new MetaData();

        if(data) this.setData(data);
        if(columns) this.setColumns(columns);
    }

    /**
     * Sets the model's data property.  The data should be a list of objects that contain the data to display on the grid
     * or an object that implements the GetItemInterface.
     * @param data
     */
    setData(data) {
        this.rowData.clear();
        this.cellData.clear();
        this.data = data;
        this.publish("data-change", "data", this);
    }

    /**
     * Sets the settings for all columns on the grid.
     * @param columns
     */
    setColumns(columns) {
        this.columnData.clear();

        for(let i = 0; i < columns.length; i++) {
            this.columnData.set(i, columns[i]);
        }

        this.columnData.length = columns.length;
        this.publish("data-change", "columns", this);
    }

    /**
     * Returns the total row count.
     * If the data hasn't been set returns 0.
     * @returns {Number}
     */
    getDataLength() {
        if(this.data) {
            if(this.data.getDataLength) {
                return this.data.getDataLength();
            } else {
                return this.data.length;
            }
        }

        return 0;
    }

    /**
     * Returns the data object at the given index or undefined if the object could not be found.
     * @param index
     * @returns {Object}
     */
    getDataItem(index) {
        if(this.data) {
            if(this.data.getDataItem) {
                return this.data.getDataItem(index);
            } else {
                return this.data[index];
            }
        }
    }

    /**
     * Sets the data item value.
     * @param index
     * @param key
     * @param value
     */
    setDataItem(index, key, value) {
        if(this.data) {
            if(this.data.setDataItem) {
                this.data.setDataItem(index, key, value);
            } else {
                this.data[index][key] = value;
            }
        }
    }

    /**
     * Retrieves a column object that the given index.
     * @param index
     * @returns {Column}
     */
    getColumn(index) {
        if(index < 0 || index >= this.getColumnLength()) {
            throw new Error("Cell Number is out of bounds.");
        }

        return new Column(this, index);
    }

    getColumnLength() {
        return this.columnData.length;
    }

    getRow(rowNumber) {
        if(rowNumber < 0 || rowNumber >= this.getDataLength()) {
            throw new Error("Row Number is out of bounds.");
        }

        return new Row(this, rowNumber);
    }

    getCell(rowNumber, cellNumber) {
        if(rowNumber < 0 || rowNumber >= this.getDataLength()) {
            throw new Error("Row Number is out of bounds.");
        }

        if(cellNumber < 0 || cellNumber >= this.getColumnLength()) {
            throw new Error("Cell Number is out of bounds.");
        }

        return new Cell(this, rowNumber, cellNumber);
    }

    getWidth() {
        let r = 0;

        for(let i = 0, l = this.getColumnLength(); i < l; i++) {
            let column = this.getColumn(i);
            r += column.width;
        }

        return r;
    }

    getHeight() {
        return this.getDataLength()*this.rowHeight;
    }

    findRows(param, value) {
        let r = [];

        for(let i = 0, l = this.getDataLength(); i < l; i++) {
            let row = this.getRow(i);

            if(row.getMetaData(param) === value) {
                r.push(row);
            }
        }

        return r;
    }
}


class Row {
    constructor(model, index) {
        this.model = model;
        this.rowNumber = index;
    }

    getAttributes() {
        return this.getMetaData("attributes") || {};
    }

    getStyle() {
        return this.getMetaData("style") || {};
    }

    getClasses() {
        return this.getMetaData("classes") || "";
    }

    getCell(cell_number) {
        return new Cell(this.model, this.rowNumber, cell_number);
    }

    getHeight() {
        return this.model.rowHeight;
    }

    getDataItem() {
        return this.model.getDataItem(this.rowNumber);
    }

    setMetaData(key, value) {
        this.model.rowData.set(this.rowNumber, key, value);
    }

    getMetaData(key) {
        if(arguments.length === 0) {
            return this.model.rowData.get(this.rowNumber);
        }

        return this.model.rowData.get(this.rowNumber, key);
    }

    getTop() {
        return this.rowNumber * this.model.rowHeight;
    }

    get top() {
        return this.rowNumber * this.model.rowHeight;
    }

    get height() {
        return this.model.rowHeight;
    }

    get data() {
        return this.model.getDataItem(this.rowNumber);
    }
}


class Cell {
    constructor(model, rowNumber, cellNumber) {
        this.model = model;
        this.rowNumber = rowNumber;
        this.cellNumber = cellNumber;
        this.index = coordinateString(this.cellNumber, this.rowNumber);
    }

    getInheritedObject(key, rowKey, columnKey) {
        let r = {},
            d = this.parentColumn.getMetaData(columnKey);

        if(d) Object.assign(r, d);
        d = this.parentRow.getMetaData(rowKey);
        if(d) Object.assign(r, d);
        d = this.getMetaData(key);
        if(d) Object.assign(r, d);
        return r;
    }

    getInheritedProperty(key, rowKey, columnKey) {
        let r = this.getMetaData(key);
        if(r !== undefined) return r;
        r = this.parentRow.getMetaData(rowKey);
        if(r !== undefined) return r;
        return this.parentColumn.getMetaData(columnKey);
    }

    /**
     * Use parentRow property instead.
     * @deprecated Depreciated in favor of parentRow
     * @returns {Row}
     */
    getRow() {
        return new Row(this.model, this.rowNumber);
    }

    /**
     * Use parentColumn property instead.
     * @deprecated
     * @returns {Column}
     */
    getColumn() {
        return new Column(this.model, this.cellNumber);
    }

    getAttributes() {
        return this.getInheritedObject("attributes", "cellAttributes", "cellAttributes");
    }

    getStyle() {
        return this.getInheritedObject("style", "cellStyle", "cellStyle");
    }

    getClasses() {
        return this.getInheritedObject("classes", "cellClasses", "cellClasses");
    }

    /**
     * Deprecated in favor of value property and getFormattedValue() method.
     * @deprecated
     * @returns {*}
     */
    getValue() {
        let formatter = this.getInheritedProperty("formatter", "cellFormatter", "cellFormatter");
        return formatter ? formatter(this) : this.value;
    }

    /**
     * Deprecated in favor of value property.
     * @deprecated
     * @returns {*}
     */
    getRawValue() {
        let id = this.parentColumn.getMetaData("id");

        if(id) {
            return this.model.getDataItem(this.rowNumber)[id];
        }
    }

    /**
     * Use index property.
     * @deprecated
     * @returns {string}
     */
    getIndex() {
        return coordinateString(this.cellNumber, this.rowNumber);
    }

    /**
     * Sets the cells metadata.
     * @param key
     * @param value
     */
    setMetaData(key, value) {
        this.model.cellData.set(this.index, key, value);
    }

    /**
     * Gets the cells metadata.
     * @param key
     * @returns {*}
     */
    getMetaData(key) {
        if(arguments.length === 0) {
            return this.model.cellData.get(this.id);
        }

        return this.model.cellData.get(this.id, key);
    }

    /**
     * Use width property.
     * @deprecated
     * @returns {*}
     */
    getWidth() {
        return this.parentColumn.width;
    }

    /**
     * Capture and event for the cell and passes it along to the correct method.
     * @param event
     */
    handleEvent(event) {
        let handle;

        if(event.type === "click") {
            handle = "onClick";
        } else if(event.type === "change") {
            handle = "onChange";
        }

        handle = this.getInheritedProperty(handle, handle, handle);

        if(handle) {
            handle(this, event);
        }
    }

    /**
     * Depreciated in favor of left property.
     * @deprecated
     * @returns {*}
     */
    getLeft() {
        return this.parentColumn.left;
    }

    get id() {
        return this.parentColumn.getMetaData("id");
    }

    get left() {
        return this.parentColumn.left;
    }

    get value() {
        let id = this.id;

        if(id) {
            let value = this.model.getDataItem(this.rowNumber)[id];

            return typeof value === "function" ? value(this) : value;
        }
    }

    set value(value) {
        let id = this.id;
        this.model.setDataItem(this.index, id, value);
    }

    get width() {
        return this.parentColumn.getWidth();
    }

    get height() {
        // todo implement.
        throw new Error("Not Yet Implemented");
    }

    get parentRow() {
        return new Row(this.model, this.rowNumber);
    }

    get parentColumn() {
        return new Column(this.model, this.cellNumber);
    }

    get formatter() {
        return this.getInheritedProperty("formatter", "cellFormatter", "cellFormatter");
    }
}


class Column {
    constructor(model, columnNumber) {
        /**
         * @type DataModel
         */
        this.model = model;

        /**
         * @type Number
         */
        this.columnNumber = columnNumber;
    }

    getLabel() {
        let label = this.getMetaData("label") || "";

        if(typeof label === "function") {
            return label(this);
        }

        return label;
    }

    /**
     * Use width property
     * @deprecated
     * @returns {*}
     */
    getWidth() {
        let width = this.getMetaData("width");

        if(width == null) {
            return this.model.defaultColumnWidth;
        }

        return width;
    }

    /**
     * Use height property.
     * @deprecated
     * @param width
     */
    setWidth(width) {
        width = clamp(width, this.minWidth, this.maxWidth);
        this.setMetaData("width", width);
    }

    /**
     * Use this.width += amount;
     *
     * let expected = this.width + amount;
     * this.width = expected;
     * return expected - this.width;
     *
     * @deprecated
     * @param {number} amount
     * @returns {number}
     */
    addWidth(amount) {
        let expected = this.width + amount;
        this.width = expected;
        return expected - this.width;
    }

    /**
     * Sets Column metadata.
     * @param {string} key
     * @param value
     */
    setMetaData(key, value) {
        this.model.columnData.set(this.columnNumber, key, value);
    }

    /**
     * Gets column metadata.
     * @param key
     * @returns {*}
     */
    getMetaData(key) {
        if(arguments.length === 0) {
            return this.model.columnData.get(this.columnNumber);
        }

        return this.model.columnData.get(this.columnNumber, key);
    }

    /**
     * Use data property.
     * @deprecated
     * @returns {{}}
     */
    getDefinition() {
        return this.model.columnData.get(this.columnNumber);
    }

    /**
     * Gets the cell for the column at the given row index.
     * @param index
     * @returns {Cell}
     */
    getCell(index) {
        return new Cell(this.model, index, this.columnNumber);
    }

    /**
     * Returns a map of css properties for the Column.
     * @returns {{}}
     */
    getStyle() {
        return this.getMetaData("style") || {};
    }

    /**
     * Returns a map of attributes for the column.
     * @returns {{}}
     */
    getAttributes() {
        return this.getMetaData("attributes") || {};
    }

    /**
     * Returns a string of css classes.
     * @returns {string}
     */
    getClasses() {
        return this.getMetaData("classes") || "";
    }

    /**
     * Use left property.
     * @deprecated
     * @returns {number}
     */
    getLeft() {
        let pos = 0;

        for(let i = 0; i < this.columnNumber; i++) {
            let column = this.model.getColumn(i);
            pos += column.width;
        }

        return pos;
    }

    /**
     * Use minWidth property
     * @deprecated
     * @returns {*}
     */
    getMinWidth() {
        let min = this.getMetaData("minWidth");

        if(min == null) {
            min = this.model.minWidth;
        }

        if(typeof min !== "number") {
            return 0;
        } else {
            return min;
        }
    }

    /**
     * Use maxWidth property.
     * @deprecated
     * @returns {*}
     */
    getMaxWidth() {
        let max = this.getMetaData("maxWidth");

        if(max == null) {
            max = this.model.maxWidth;
        }

        return typeof max !== "number" ? Infinity : max;
    }

    isResizeable() {
        return this.getMetaData("resizeable") || false;
    }

    nextColumn() {
        return this.model.getColumnLength() > this.columnNumber + 1 ? new Column(this.model, this.columnNumber+1) : null;
    }

    prevColumn() {
        return this.columnNumber - 1 >= 0 ? new Column(this.model, this.columnNumber-1) : null;
    }

    get data() {
        return this.model.columnData.get(this.columnNumber);
    }

    get minWidth() {
        let min = this.getMetaData("minWidth");

        if(min == null) {
            min = this.model.minWidth;
        }

        if(typeof min !== "number") {
            return 0;
        } else {
            return min;
        }
    }

    get maxWidth() {
        let max = this.getMetaData("maxWidth");

        if(max == null) {
            max = this.model.maxWidth;
        }

        return typeof max !== "number" ? Infinity : max;
    }

    get left() {
        let pos = 0;

        for(let i = 0; i < this.columnNumber; i++) {
            let column = this.model.getColumn(i);
            pos += column.width;
        }

        return pos;
    }

    get top() {
        return 0;
    }

    get width() {
        let width = this.getMetaData("width");

        if(width == null) {
            return this.model.defaultColumnWidth;
        }

        return width;
    }

    set width(value) {
        this.setMetaData("width", clamp(value, this.minWidth, this.maxWidth));
    }
}


DataModel.Column = Column;
DataModel.Cell = Cell;
DataModel.Row = Row;


/**
 * Class that stores MetaData for rows and columns.
 */
export class MetaData {
    constructor(metadata) {
        this.data = {};
        this.dataCache = {};

        if(metadata) this.setMetaData(metadata);
    }

    setMetaData(metadata) {
        this.data = metadata;
    }

    clear() {
        this.data = {};
        this.dataCache = {};
    }

    set(index, key, value) {
        if(!this.data[index]) {
            this.data[index] = {};
        }

        if(arguments.length === 2 && typeof key === "object") {
            Object.assign(this.data[index], key);
        } else {
            this.data[index][key] = value;
        }
    }

    get(index, key) {
        if(this.data[index]) {
            return arguments.length > 1 ? this.data[index][key] : this.data[index];
        }
    }

    remove(index, key) {
        if(this.data[index]) {
            delete this.data[index][key];
        }
    }

    cache(index, key, value) {
        if(arguments.length === 1) {
            return this.dataCache[index];
        } else if(arguments.length === 2) {
            return this.dataCache[index] ? this.dataCache[index][key] : undefined;
        } else if(arguments.length === 3) {
            if(value === undefined) {
                if(this.dataCache[index]) {
                    delete this.dataCache[index][key];
                }
            } else {
                if(!this.dataCache[index]) {
                    this.dataCache[index] = {};
                }

                this.dataCache[index][key] = value;
            }
        }
    }
}


DataModel.MetaData = MetaData;