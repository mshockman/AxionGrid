var grid =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["stringFromColumnIndex"] = stringFromColumnIndex;
/* harmony export (immutable) */ __webpack_exports__["stringToIndex"] = stringToIndex;
/* harmony export (immutable) */ __webpack_exports__["coordinateString"] = coordinateString;
/* harmony export (immutable) */ __webpack_exports__["fromCoordinateString"] = fromCoordinateString;
/* harmony export (immutable) */ __webpack_exports__["randomChoice"] = randomChoice;
/* harmony export (immutable) */ __webpack_exports__["clamp"] = clamp;


const reg_coord = /([A-Z]+)([0-9]+)/;


/**
 * Converts an index to a BASE 26 string where 1 = A.
 * @param index
 * @returns {string}
 */
function stringFromColumnIndex(index) {
    let ret = "";
    index++;

    while(index > 0) {
        index--;
        let r = index % 26,
            d = String.fromCharCode(r + 65);

        ret = d + ret;
        index = (index - r) / 26;
    }

    return ret;
}


/**
 * Converts the BASE 26 letter string back into a number.
 * @param s
 * @returns {number}
 */
function stringToIndex(s) {
    let r = 0;

    for(let i = s.length-1; i >= 0; i--) {
        let p = (s.length-1) - i,
            c = s.charCodeAt(i) - 64;

        r += Math.pow(26, p)*c;
    }

    r--;
    return r;
}


/**
 * Takes an x, y pair and converts it into a cell coordinate.
 * @param x
 * @param y
 * @returns {string}
 */
function coordinateString(x, y) {
    return stringFromColumnIndex(x) + (y+1);
}


/**
 * Takes a cell coordinate and returns an x, y pair.
 * @param c
 * @returns {[null,null]}
 */
function fromCoordinateString(c) {
    let reg = reg_coord.exec(c),
        x = reg[1],
        y = reg[2];

    return [stringToIndex(x), parseInt(y, 10)-1];
}


function randomChoice(array) {
    let c = Math.floor(Math.random() * array.length);
    return array[c];
}


function clamp(value, min=null, max=null) {
    if(min != null) {
        value = Math.max(min, value);
    }

    if(max != null) {
        value = Math.min(max, value);
    }

    return value;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class MetaData {
    constructor(metadata) {
        this.data = {};
        this.dataCache = {};

        if(metadata) this.setMetaData(metadata);
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
            return this.data[index][key];
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
/* harmony export (immutable) */ __webpack_exports__["a"] = MetaData;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StandardGrid", function() { return StandardGrid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DataView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Dimension__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MetaData__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Canvas__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ViewPort__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Columns__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Header__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DataModel", function() { return __WEBPACK_IMPORTED_MODULE_0__DataView__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Dimension", function() { return __WEBPACK_IMPORTED_MODULE_1__Dimension__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return __WEBPACK_IMPORTED_MODULE_2__util__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MetaData", function() { return __WEBPACK_IMPORTED_MODULE_3__MetaData__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "$GridDivCanvas", function() { return __WEBPACK_IMPORTED_MODULE_4__Canvas__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ViewPort", function() { return __WEBPACK_IMPORTED_MODULE_5__ViewPort__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxColumn", function() { return __WEBPACK_IMPORTED_MODULE_6__Columns__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GridHeader", function() { return __WEBPACK_IMPORTED_MODULE_7__Header__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ColumnRow", function() { return __WEBPACK_IMPORTED_MODULE_7__Header__["a"]; });










class StandardGrid {
    constructor(container, model) {
        this.viewport = null;
        this.model = null;
        this.canvas = null;
        this.container = null;
    }
}





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MetaData__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);





class DataModel {
    constructor({data, columns, rowHeight=25, defaultColumnWidth=100}) {
        this.rowHeight = rowHeight;
        this.defaultColumnWidth = defaultColumnWidth;
        this.data = null;

        this.rowData = new __WEBPACK_IMPORTED_MODULE_0__MetaData__["a" /* MetaData */]();
        this.cellData = new __WEBPACK_IMPORTED_MODULE_0__MetaData__["a" /* MetaData */]();
        this.columnData = new __WEBPACK_IMPORTED_MODULE_0__MetaData__["a" /* MetaData */]();

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
/* harmony export (immutable) */ __webpack_exports__["a"] = DataModel;



class Row {
    constructor(model, index) {
        this.model = model;
        this.rowNumber = index;
    }

    getAttributes() {
        return this.model.rowData.get("attributes") || {};
    }

    getStyle() {
        return this.model.rowData.get("style") || {};
    }

    getClasses() {
        return this.model.rowData.get("classes") || "";
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
            d = this.model.columnData.get(this.cellNumber, columnKey);

        if(d) Object.assign(r, d);
        d = this.model.rowData.get(this.rowNumber, rowKey);
        if(d) Object.assign(r, d);
        d = this.model.cellData.get(this.cellNumber, key);
        if(d) Object.assign(r, d);
        return r;
    }

    getInheritedProperty(key, rowKey, columnKey) {
        let r = this.model.cellData.get(this.cellNumber, key);
        if(r !== undefined) return r;
        r = this.model.rowData.get(this.rowNumber, rowKey);
        if(r !== undefined) return r;
        return this.model.columnData.get(this.cellNumber, columnKey);
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
        let id = this.model.columnData.get(this.cellNumber, "id");

        if(id) {
            return this.model.getDataItem(this.rowNumber)[id];
        }
    }

    getIndex() {
        return Object(__WEBPACK_IMPORTED_MODULE_1__util__["coordinateString"])(this.cellNumber, this.rowNumber);
    }

    setMetaData(key, value) {
        this.model.cellData.set(this.getIndex(), key, value);
    }

    getMetaData(key) {
        return this.model.cellData.get(this.getIndex(), key);
    }

    getWidth() {
        return this.getColumn(this.cellNumber).getWidth();
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

    setMetaData(key, value) {
        this.model.columnData.set(this.columnNumber, key, value);
    }

    getMetaData(key) {
        return this.model.columnData.get(this.columnNumber, key);
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
}


DataModel.Column = Column;
DataModel.Cell = Cell;
DataModel.Row = Row;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Dimension {
    constructor(length, bucketSize=null, defaultSize) {
        this.length = length;
        this.bucketSize = bucketSize === null ? Math.floor(Math.sqrt(this.length)) : bucketSize;
        this.bucketLength = Math.ceil(this.length / this.bucketSize);
        this.defaultSize = defaultSize;

        this.buckets = {};
        this.start = null;
        this.end = null;
    }

    getBucket(index) {
        // Sanity check
        if(index < 0 || index >= this.bucketLength) {
            throw new Error(index + " is out of bounds.");
        }

        if(this.buckets[index]) {
            return this.buckets[index];
        }

        if(!this.start || this.start.index > index) {
            let r = new Bucket(this, index);
            if(this.start && this.start.index > index) r.setNext(this.start);
            return r;
        }

        let i = index;

        while(i--) {
            if(this.buckets[i]) {
                let r = new Bucket(this, index);
                r.setPrevious(this.buckets[i]);
                return r;
            }
        }

        return new Bucket(this, index);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dimension;



class Bucket {
    constructor(dimension, index) {
        this.index = index;
        this.dimension = dimension;

        this.length = this.index === this.dimension.bucketLength-1 ? (this.dimension.length % this.dimension.bucketSize) : this.dimension.bucketSize;
        this.prev = null;
        this.next = null;
        this.position = this.index * this.dimension.defaultSize * this.length;
        this.size = this.length * this.dimension.defaultSize;
    }

    setPrevious(bucket) {
        this.prev = bucket;
        this.position = this.prev.position + this.prev.size + ((this.index - this.prev.index - 1) * this.dimension.defaultSize * this.dimension.bucketSize);
    }

    setNext(bucket) {
        this.next = bucket;
    }

    isInserted() {
        return this.prev && this.prev.next === this || this.dimension.start === this;
    }
}


class SizeNode {
    constructor() {
        this.children = {};
        this.start = null;
        this.index = 0;

        this.parent = null;
        this.root = null;
        this.nextSibling = null;
        this.previousSibling = null;

        this.position = 0;
        this.size = 0;
        this.length = 0;
    }
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/**
 * A canvas object is responsible for drawing the currently viewable parts of the data model to the screen and catching
 * and passing events that happen to those element to the grid.
 */


class $GridDivCanvas {
    constructor(container=null) {
        this.canvas = $("<div>").addClass("grid-canvas").css({
            position: "relative"
        });

        if(container) {
            this.canvas.appendTo(container);
        }

        this.canvas.on("change click", (event) => {
            let $target = $(event.target),
                $cell = $target.closest(".grid-cell", this.canvas),
                x = $cell.data("cellNumber"),
                y = $cell.data("rowNumber"),
                cell = this.model.getCell(y, x);

            cell.handleEvent(event);
        });
    }

    setDataModel(model) {
        this.model = model;
    }

    setViewPort(x, y, width, height) {
        this.viewport = {
            x: x,
            y: y,
            width: width,
            height: height
        };
    }

    render() {
        let rowRange = this.getRowRange(this.viewport.y, this.viewport.y + this.viewport.height),
            columnRange = this.getColumnRange(this.viewport.x, this.viewport.x + this.viewport.width),
            rowPos = 0,
            totalWidth = this.model.getWidth(),
            frag = document.createDocumentFragment();

        this.canvas.css({
            height: this.model.getHeight(),
            width: totalWidth
        });

        for(let y = rowRange.start; y < rowRange.stop; y++) {
            let cellPos = 0,
                row = this.model.getRow(y),
                top = row.getTop(),
                rowHeight = row.getHeight(),
                $row = $("<div>").addClass("grid-row").css({
                    position: "absolute",
                    top: top,
                    height: rowHeight,
                    width: totalWidth
                });

            $row.addClass(row.getClasses());
            $row.attr(row.getAttributes());
            $row.css(row.getStyle());
            $row.data("rowNumber", row.rowNumber);
            $row.attr("data-row-number", row.rowNumber);
            rowPos += row.getHeight();

            for(let x = columnRange.start; x < columnRange.stop; x++) {
                let cell = row.getCell(x),
                    cellWidth = cell.getWidth(),
                    $cell = $("<div class='grid-cell'>").css({
                        position: "absolute",
                        left: cellPos,
                        width: cellWidth,
                        height: rowHeight
                    });

                cellPos += cellWidth;

                $cell.append(cell.getValue());
                $cell.data({
                    "cellNumber": cell.cellNumber,
                    "rowNumber": row.rowNumber
                });
                $cell.attr("data-cell-number", cell.cellNumber);
                $cell.css(cell.getStyle());
                $cell.attr(cell.getAttributes());
                $cell.addClass(cell.getClasses());

                $row.append($cell);
            }

            $row.appendTo(frag);
        }

        this.canvas.empty();
        this.canvas.append(frag);
    }

    appendTo(element) {
        return this.canvas.appendTo(element);
    }

    getRowRange(start, stop) {
        let l = this.model.getDataLength();

        return {
            start: Object(__WEBPACK_IMPORTED_MODULE_0__util__["clamp"])(Math.floor(start / this.model.rowHeight), 0, l),
            stop: Object(__WEBPACK_IMPORTED_MODULE_0__util__["clamp"])(Math.floor(stop / this.model.rowHeight), 0, l)
        };
    }

    getColumnRange(start, stop) {
        let pos = 0,
            r = {},
            column,
            i = 0,
            l = this.model.getColumnLength();

        r.start = 0;
        r.stop = l;

        for(; i < l; i++) {
            column = this.model.getColumn(i);
            pos += column.getWidth();
            r.start = i;

            if(pos > start) {
                i++;
                break;
            }
        }

        for(; i < l; i++) {
            column = this.model.getColumn(i);
            pos += column.getWidth();
            r.stop = i + 1;

            if(pos >= stop) {
                break;
            }
        }

        return r;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = $GridDivCanvas;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class ViewPort {
    constructor(container, canvas, {increment=400, verticalPadding=1000, horizontalPadding=1000, speedLimit=1000, refreshRate=100}={}) {
        this.viewport = $("<div class='grid-viewport'>");

        if(container) {
            this.viewport.appendTo(container);
        }

        if(canvas) this.setCanvas(canvas);

        this._onScroll = this.onScroll.bind(this);
        this.viewport.on("scroll", this._onScroll);

        this.increment = increment;
        this.verticalPadding = verticalPadding;
        this.horizontalPadding = horizontalPadding;
        this.speedLimit = speedLimit;
        this.refreshRate = refreshRate;

        this._left = 0;
        this._top = 0;
        this._incrementX = 0;
        this._incrementY = 0;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        canvas.appendTo(this.viewport);
    }

    onScroll() {
        this._left = this.viewport.scrollLeft();
        this._top = this.viewport.scrollTop();

        if(!this._timer) {
            let x = this._left,
                y = this._top;

            let onTimeout = () => {
                if(this.speedLimit && (Math.abs(x - this._left) > this.speedLimit || Math.abs(y - this._top) > this.speedLimit)) {
                    x = this._left;
                    y = this._top;
                    this._timer = setTimeout(onTimeout, this.refreshRate);
                    return;
                }

                this._timer = null;

                let incrementX = Math.floor(this._left / this.increment),
                    incrementY = Math.floor(this._top / this.increment);

                if(incrementX === this._incrementX && incrementY === this._incrementY) {
                    return;
                }

                this.refresh();
            };

            this._timer = setTimeout(onTimeout, this.refreshRate);
        }
    }

    refresh() {
        this._incrementX = Math.floor(this._left / this.increment);
        this._incrementY = Math.floor(this._top / this.increment);

        let left = this._left,
            top = this._top,
            width = this.viewport.innerWidth(),
            height = this.viewport.innerHeight();

        this.canvas.setViewPort(left-this.horizontalPadding, top-this.verticalPadding, width+(this.horizontalPadding*2), height+(this.verticalPadding*2));
        this.canvas.render();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ViewPort;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class CheckboxColumn {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = CheckboxColumn;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class GridHeader {
    constructor() {
        this.view = $("<div class='grid-header'>");
        this.viewport = $("<div class='grid-header-viewport'>");
        this.viewport.css({
            "overflow-x": "hidden",
            position: "relative",
            height: 25
        });
        this.view.append(this.viewport);
    }

    bindToViewPort(viewport) {
        if(viewport.viewport) {
            viewport = $(viewport.viewport);
        } else {
            viewport = $(viewport);
        }

        viewport.on("scroll", (event) => {
            this.viewport.scrollLeft($(event.target).scrollLeft());
        });
    }

    appendTo(element) {
        this.view.appendTo(element);
    }

    append(element) {
        if(element.appendTo) {
            element.appendTo(this.viewport);
        } else {
            this.viewport.append(element);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = GridHeader;



class ColumnRow {
    constructor(model) {
        this.model = model;
        this.view = $("<div class='grid-column-row'>").css({
            position: "relative"
        });
    }

    setViewport(viewport) {

    }

    render() {
        let pos = 0;

        this.view.css({
            width: this.model.getWidth()
        });

        for(let i = 0, l = this.model.getColumnLength(); i < l; i++) {
            let $column = $("<div class='grid-column'>"),
                column = this.model.getColumn(i),
                name = column.getLabel(),
                width = column.getWidth();

            $column.addClass(column.getClasses());
            $column.attr(column.getAttributes());
            $column.css(column.getStyle());

            $column.css({
                position: "absolute",
                width: width,
                left: pos
            });

            pos += width;

            $column.append(name);
            this.view.append($column);
        }
    }

    appendTo(element) {
        this.view.appendTo(element);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ColumnRow;



/***/ })
/******/ ]);
//# sourceMappingURL=grid.js.map