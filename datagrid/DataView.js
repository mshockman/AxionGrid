

import {MetaData} from "./MetaData";
import {clamp, coordinateString} from "./util";

export class DataModel {
    constructor({data, columns, rowHeight=25, defaultColumnWidth=100, minWidth=null, maxWidth=null, grid=null, pk=null}) {
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
        if(grid) this.setGrid(grid);
    }

    setGrid(grid) {
        this.grid = grid;
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
        if(this.grid) this.grid.publish("data-change");
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
        if(this.grid) this.grid.publish("column-change");
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

    setDataItem(index, key, value) {
        if(this.data) {
            if(this.data.setDataItem) {
                this.data.setDataItem(index, key, value);
            } else {
                this.data[index][key] = value;
            }
        }
    }

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
            r += column.getWidth();
        }

        return r;
    }

    getHeight() {
        return this.getDataLength()*this.rowHeight;
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
        return this.model.rowData.get(this.rowNumber, key);
    }

    getTop() {
        return this.rowNumber * this.model.rowHeight;
    }
}


class Cell {
    constructor(model, rowNumber, cellNumber) {
        this.model = model;
        this.rowNumber = rowNumber;
        this.cellNumber = cellNumber;
    }

    getInheritedObject(key, rowKey, columnKey) {
        let r = {},
            d = this.getColumn().getMetaData(columnKey);

        if(d) Object.assign(r, d);
        d = this.getRow().getMetaData(rowKey);
        if(d) Object.assign(r, d);
        d = this.getMetaData(key);
        if(d) Object.assign(r, d);
        return r;
    }

    getInheritedProperty(key, rowKey, columnKey) {
        let r = this.getMetaData(key);
        if(r !== undefined) return r;
        r = this.getRow().getMetaData(rowKey);
        if(r !== undefined) return r;
        return this.getColumn().getMetaData(columnKey);
    }

    getRow() {
        return new Row(this.model, this.rowNumber);
    }

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

    getValue() {
        let formatter = this.getInheritedProperty("formatter", "cellFormatter", "cellFormatter");
        return formatter ? formatter(this) : this.getRawValue();
    }

    getRawValue() {
        let id = this.getColumn().getMetaData("id");

        if(id) {
            return this.model.getDataItem(this.rowNumber)[id];
        }
    }

    getIndex() {
        return coordinateString(this.cellNumber, this.rowNumber);
    }

    setMetaData(key, value) {
        this.model.cellData.set(this.getIndex(), key, value);
    }

    getMetaData(key) {
        return this.model.cellData.get(this.getIndex(), key);
    }

    getWidth() {
        return this.getColumn().getWidth();
    }

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

    getLeft() {
        return this.getColumn().getLeft();
    }
}


class Column {
    constructor(model, columnNumber) {
        this.model = model;
        this.columnNumber = columnNumber;
    }

    getLabel() {
        let label = this.getMetaData("label") || "";

        if(typeof label === "function") {
            return label(this);
        }

        return label;
    }

    getWidth() {
        let width = this.getMetaData("width");

        if(width == null) {
            return this.model.defaultColumnWidth;
        }

        return width;
    }

    setWidth(width) {
        width = clamp(width, this.getMinWidth(), this.getMaxWidth());
        this.setMetaData("width", width);
    }

    addWidth(amount) {
        let expected = this.getWidth() + amount;
        this.setWidth(expected);
        return expected - this.getWidth();
    }

    setMetaData(key, value) {
        this.model.columnData.set(this.columnNumber, key, value);
    }

    getMetaData(key) {
        return this.model.columnData.get(this.columnNumber, key);
    }

    getDefinition() {
        return this.model.columnData.get(this.columnNumber);
    }

    getCell(index) {
        return new Cell(this.model, index, this.columnNumber);
    }

    getStyle() {
        return this.getMetaData("style") || {};
    }

    getAttributes() {
        return this.getMetaData("attributes") || {};
    }

    getClasses() {
        return this.getMetaData("classes") || "";
    }

    getLeft() {
        let pos = 0;

        for(let i = 0; i < this.columnNumber; i++) {
            let column = this.model.getColumn(i);
            pos += column.getWidth();
        }

        return pos;
    }

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
}


DataModel.Column = Column;
DataModel.Cell = Cell;
DataModel.Row = Row;
