var util =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.events = exports.util = undefined;

var _util = __webpack_require__(2);

var util = _interopRequireWildcard(_util);

var _events = __webpack_require__(3);

var events = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.util = util;
exports.events = events;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.randomChoice = randomChoice;
exports.clamp = clamp;
exports.dictsEqual = dictsEqual;
/**
 * Created by mshoc on 10/10/2017.
 */

/**
 * Chooses a random choice from an array.
 * @param array
 * @return {*}
 */
function randomChoice(array) {
    var c = Math.floor(Math.random() * array.length);
    return array[c];
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value
 * @param min
 * @param max
 * @returns {Number}
 */
function clamp(value) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (min != null) {
        value = Math.max(min, value);
    }

    if (max != null) {
        value = Math.min(max, value);
    }

    return value;
}

/**
 * Compares to objects to see if they are equivalent.
 * @param object1
 * @param object2
 * @return {boolean}
 */
function dictsEqual(object1, object2) {
    if ((typeof object1 === "undefined" ? "undefined" : _typeof(object1)) !== (typeof object2 === "undefined" ? "undefined" : _typeof(object2))) {
        return false;
    }

    var keys1 = Object.keys(object1),
        keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (var i = 0, l = keys1.length; i < l; i++) {
        var key = keys1[i];

        if (keys2.indexOf(key) === -1) {
            return false;
        } else if (object1[key] !== object2[key]) {
            return false;
        }
    }

    return true;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.flagCallback = flagCallback;
exports.thenCallback = thenCallback;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by mshoc on 10/10/2017.
 */

/**
 * An object that implements a simple publisher / subscriber interface.
 */
var Publisher = exports.Publisher = function () {
    function Publisher() {
        _classCallCheck(this, Publisher);

        this.topics = {};
    }

    /**
     * Subscribe to a topic.
     * @param topic
     * @param callback
     */


    _createClass(Publisher, [{
        key: "subscribe",
        value: function subscribe(topic, callback) {
            // Sanity check.
            if (typeof callback !== "function") {
                throw new TypeError("Callback must be a function.");
            }

            if (!this.topics[topic]) {
                this.topics[topic] = [];
            }

            this.topics[topic].push(callback);
        }

        /**
         * Unsubscribe from a topic.
         * @param topic
         * @param callback
         * @returns {*}
         */

    }, {
        key: "unsubscribe",
        value: function unsubscribe(topic, callback) {
            if (this.topics[topic]) {
                var i = this.topics[topic].indexOf(callback);

                if (i !== -1) {
                    this.topics[topic].splice(i, 1);
                    return callback;
                }
            }
        }

        /**
         * Returns true if the callback is subscribed to the topic.
         * @param topic
         * @param callback
         * @returns {boolean}
         */

    }, {
        key: "isSubscribed",
        value: function isSubscribed(topic, callback) {
            return this.topics[topic] ? this.topics[topic].indexOf(callback) !== -1 : false;
        }

        /**
         * Clears a topic of all subscribers.
         * @param topic
         */

    }, {
        key: "clear",
        value: function clear(topic) {
            if (this.topics[topic]) {
                this.topics[topic] = [];
            }
        }

        /**
         * Publishes a topic with the given arguments.
         * @param topic
         * @param args
         */

    }, {
        key: "publish",
        value: function publish(topic) {
            if (this.topics[topic]) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                for (var i = 0, l = this.topics[topic].length; i < l; i++) {
                    var _topics$topic;

                    if ((_topics$topic = this.topics[topic])[i].apply(_topics$topic, args) === false) {
                        break;
                    }
                }
            }
        }
    }]);

    return Publisher;
}();

/**
 * An observable object.  Can add and remove callbacks and fire events.
 */


var Observable = exports.Observable = function () {
    function Observable() {
        _classCallCheck(this, Observable);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        this.args = args;
        this.callbacks = [];
    }

    _createClass(Observable, [{
        key: "add",
        value: function add(callback) {
            // Sanity check.
            if (typeof callback !== "function") {
                throw new TypeError("Callback must be a function.");
            }

            this.callbacks.push(callback);
        }
    }, {
        key: "remove",
        value: function remove(callback) {
            var i = this.indexOf(callback);

            if (i !== -1) {
                this.callbacks.splice(i, 1);
                return callback;
            }
        }
    }, {
        key: "has",
        value: function has(callback) {
            return this.indexOf(callback) !== -1;
        }
    }, {
        key: "indexOf",
        value: function indexOf(callback) {
            return this.callbacks.indexOf(callback);
        }
    }, {
        key: "clear",
        value: function clear() {
            this.callbacks = [];
        }
    }, {
        key: "fire",
        value: function fire() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            if (this.args) {
                args = this.args.concat(args);
            }

            for (var i = 0, l = this.callbacks.length; i < l; i++) {
                var _callbacks;

                (_callbacks = this.callbacks)[i].apply(_callbacks, _toConsumableArray(args));
            }
        }
    }]);

    return Observable;
}();

/**
 * Returns a function that sets a flag if it is called once.
 *
 * Expected usage.
 *
 * let flag = flagCallback();
 *
 * pubsub.publish("someTopic", flag);
 *
 * if(flag.wasCalled()) {
 *     // Do something
 * }
 *
 * @return {fn}
 */


function flagCallback() {
    var fn = function fn() {
        fn.flag = true;
    };

    fn.flag = false;

    fn.wasCalled = function () {
        return fn.flag;
    };

    return fn;
}

/**
 * Creates a function that register any function passed to it to a list of actions.  You can then call fn.fire(...args)
 * to fire all register callbacks of that function.  The expected usage of this function is to create parameters for
 * other callback function.
 *
 * Example usage.
 *
 * let before = thenCallback(),
 *     after = thenCallback();
 *
 * pubsub.publish("someTopic", before, after);
 *
 * before.fire();
 * // do something.
 * after.fire();
 *
 * @return {fn}
 */
function thenCallback() {
    var fn = function fn(callback) {
        fn.actions.push(callback);
    };

    fn.actions = [];

    fn.fire = function () {
        for (var i = 0, l = fn.actions.length; i < l; i++) {
            var _fn$action;

            (_fn$action = fn.action)[i].apply(_fn$action, arguments);
        }
    };

    return fn;
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjk4ODU3YmZjZmVjY2I2OGUzYmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9ldmVudHMuanMiXSwibmFtZXMiOlsidXRpbCIsImV2ZW50cyIsInJhbmRvbUNob2ljZSIsImNsYW1wIiwiZGljdHNFcXVhbCIsImFycmF5IiwiYyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInZhbHVlIiwibWluIiwibWF4Iiwib2JqZWN0MSIsIm9iamVjdDIiLCJrZXlzMSIsIk9iamVjdCIsImtleXMiLCJrZXlzMiIsImkiLCJsIiwia2V5IiwiaW5kZXhPZiIsImZsYWdDYWxsYmFjayIsInRoZW5DYWxsYmFjayIsIlB1Ymxpc2hlciIsInRvcGljcyIsInRvcGljIiwiY2FsbGJhY2siLCJUeXBlRXJyb3IiLCJwdXNoIiwic3BsaWNlIiwiYXJncyIsIk9ic2VydmFibGUiLCJjYWxsYmFja3MiLCJjb25jYXQiLCJmbiIsImZsYWciLCJ3YXNDYWxsZWQiLCJhY3Rpb25zIiwiZmlyZSIsImFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7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QyxJQUFILEdBQVUsS0FBVjs7QUFFQUQsT0FBR0UsU0FBSCxHQUFlLFlBQVc7QUFDdEIsZUFBT0YsR0FBR0MsSUFBVjtBQUNILEtBRkQ7O0FBSUEsV0FBT0QsRUFBUDtBQUNIOztBQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQk8sU0FBU1osWUFBVCxHQUF3QjtBQUMzQixRQUFJWSxLQUFLLFNBQUxBLEVBQUssQ0FBU1IsUUFBVCxFQUFtQjtBQUN4QlEsV0FBR0csT0FBSCxDQUFXVCxJQUFYLENBQWdCRixRQUFoQjtBQUNILEtBRkQ7O0FBSUFRLE9BQUdHLE9BQUgsR0FBYSxFQUFiOztBQUVBSCxPQUFHSSxJQUFILEdBQVUsWUFBa0I7QUFDeEIsYUFBSSxJQUFJckIsSUFBSSxDQUFSLEVBQVdDLElBQUlnQixHQUFHRyxPQUFILENBQVc5QixNQUE5QixFQUFzQ1UsSUFBSUMsQ0FBMUMsRUFBNkNELEdBQTdDLEVBQWtEO0FBQUE7O0FBQzlDLDZCQUFHc0IsTUFBSCxFQUFVdEIsQ0FBVjtBQUNIO0FBQ0osS0FKRDs7QUFNQSxXQUFPaUIsRUFBUDtBQUNILEMiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY5ODg1N2JmY2ZlY2NiNjhlM2JhIiwiaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwiLi91dGlsXCI7XHJcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tIFwiLi9ldmVudHNcIjtcclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgdXRpbCxcclxuICAgIGV2ZW50cyxcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1zaG9jIG9uIDEwLzEwLzIwMTcuXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDaG9vc2VzIGEgcmFuZG9tIGNob2ljZSBmcm9tIGFuIGFycmF5LlxyXG4gKiBAcGFyYW0gYXJyYXlcclxuICogQHJldHVybiB7Kn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21DaG9pY2UoYXJyYXkpIHtcclxuICAgIGxldCBjID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoKTtcclxuICAgIHJldHVybiBhcnJheVtjXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENsYW1wcyBhIG51bWJlciBiZXR3ZWVuIGEgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZS5cclxuICogQHBhcmFtIHZhbHVlXHJcbiAqIEBwYXJhbSBtaW5cclxuICogQHBhcmFtIG1heFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW49bnVsbCwgbWF4PW51bGwpIHtcclxuICAgIGlmKG1pbiAhPSBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSBNYXRoLm1heChtaW4sIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihtYXggIT0gbnVsbCkge1xyXG4gICAgICAgIHZhbHVlID0gTWF0aC5taW4obWF4LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmVzIHRvIG9iamVjdHMgdG8gc2VlIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXHJcbiAqIEBwYXJhbSBvYmplY3QxXHJcbiAqIEBwYXJhbSBvYmplY3QyXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGljdHNFcXVhbChvYmplY3QxLCBvYmplY3QyKSB7XHJcbiAgICBpZih0eXBlb2Ygb2JqZWN0MSAhPT0gdHlwZW9mIG9iamVjdDIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGtleXMxID0gT2JqZWN0LmtleXMob2JqZWN0MSksXHJcbiAgICAgICAga2V5czIgPSBPYmplY3Qua2V5cyhvYmplY3QyKTtcclxuXHJcbiAgICBpZihrZXlzMS5sZW5ndGggIT09IGtleXMyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IobGV0IGkgPSAwLCBsID0ga2V5czEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IGtleXMxW2ldO1xyXG5cclxuICAgICAgICBpZihrZXlzMi5pbmRleE9mKGtleSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYob2JqZWN0MVtrZXldICE9PSBvYmplY3QyW2tleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vdXRpbC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1zaG9jIG9uIDEwLzEwLzIwMTcuXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBbiBvYmplY3QgdGhhdCBpbXBsZW1lbnRzIGEgc2ltcGxlIHB1Ymxpc2hlciAvIHN1YnNjcmliZXIgaW50ZXJmYWNlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFB1Ymxpc2hlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRvcGljcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3Vic2NyaWJlIHRvIGEgdG9waWMuXHJcbiAgICAgKiBAcGFyYW0gdG9waWNcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBzdWJzY3JpYmUodG9waWMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy8gU2FuaXR5IGNoZWNrLlxyXG4gICAgICAgIGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMudG9waWNzW3RvcGljXSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvcGljc1t0b3BpY10gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG9waWNzW3RvcGljXS5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuc3Vic2NyaWJlIGZyb20gYSB0b3BpYy5cclxuICAgICAqIEBwYXJhbSB0b3BpY1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgdW5zdWJzY3JpYmUodG9waWMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYodGhpcy50b3BpY3NbdG9waWNdKSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gdGhpcy50b3BpY3NbdG9waWNdLmluZGV4T2YoY2FsbGJhY2spO1xyXG5cclxuICAgICAgICAgICAgaWYoaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9waWNzW3RvcGljXS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGNhbGxiYWNrIGlzIHN1YnNjcmliZWQgdG8gdGhlIHRvcGljLlxyXG4gICAgICogQHBhcmFtIHRvcGljXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc1N1YnNjcmliZWQodG9waWMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9waWNzW3RvcGljXSA/IHRoaXMudG9waWNzW3RvcGljXS5pbmRleE9mKGNhbGxiYWNrKSAhPT0gLTEgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhIHRvcGljIG9mIGFsbCBzdWJzY3JpYmVycy5cclxuICAgICAqIEBwYXJhbSB0b3BpY1xyXG4gICAgICovXHJcbiAgICBjbGVhcih0b3BpYykge1xyXG4gICAgICAgIGlmKHRoaXMudG9waWNzW3RvcGljXSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvcGljc1t0b3BpY10gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdWJsaXNoZXMgYSB0b3BpYyB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHMuXHJcbiAgICAgKiBAcGFyYW0gdG9waWNcclxuICAgICAqIEBwYXJhbSBhcmdzXHJcbiAgICAgKi9cclxuICAgIHB1Ymxpc2godG9waWMsIC4uLmFyZ3MpIHtcclxuICAgICAgICBpZih0aGlzLnRvcGljc1t0b3BpY10pIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMCwgbCA9IHRoaXMudG9waWNzW3RvcGljXS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMudG9waWNzW3RvcGljXVtpXSguLi5hcmdzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBbiBvYnNlcnZhYmxlIG9iamVjdC4gIENhbiBhZGQgYW5kIHJlbW92ZSBjYWxsYmFja3MgYW5kIGZpcmUgZXZlbnRzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGUge1xyXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xyXG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQoY2FsbGJhY2spIHtcclxuICAgICAgICAvLyBTYW5pdHkgY2hlY2suXHJcbiAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUoY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgaSA9IHRoaXMuaW5kZXhPZihjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIGlmKGkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYXMoY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKGNhbGxiYWNrKSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXhPZihjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmUoLi4uYXJncykge1xyXG4gICAgICAgIGlmKHRoaXMuYXJncykge1xyXG4gICAgICAgICAgICBhcmdzID0gdGhpcy5hcmdzLmNvbmNhdChhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSB0aGlzLmNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbaV0oLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHNldHMgYSBmbGFnIGlmIGl0IGlzIGNhbGxlZCBvbmNlLlxyXG4gKlxyXG4gKiBFeHBlY3RlZCB1c2FnZS5cclxuICpcclxuICogbGV0IGZsYWcgPSBmbGFnQ2FsbGJhY2soKTtcclxuICpcclxuICogcHVic3ViLnB1Ymxpc2goXCJzb21lVG9waWNcIiwgZmxhZyk7XHJcbiAqXHJcbiAqIGlmKGZsYWcud2FzQ2FsbGVkKCkpIHtcclxuICogICAgIC8vIERvIHNvbWV0aGluZ1xyXG4gKiB9XHJcbiAqXHJcbiAqIEByZXR1cm4ge2ZufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZsYWdDYWxsYmFjaygpIHtcclxuICAgIGxldCBmbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZuLmZsYWcgPSB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICBmbi5mbGFnID0gZmFsc2U7XHJcblxyXG4gICAgZm4ud2FzQ2FsbGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGZuLmZsYWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBmbjtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZWdpc3RlciBhbnkgZnVuY3Rpb24gcGFzc2VkIHRvIGl0IHRvIGEgbGlzdCBvZiBhY3Rpb25zLiAgWW91IGNhbiB0aGVuIGNhbGwgZm4uZmlyZSguLi5hcmdzKVxyXG4gKiB0byBmaXJlIGFsbCByZWdpc3RlciBjYWxsYmFja3Mgb2YgdGhhdCBmdW5jdGlvbi4gIFRoZSBleHBlY3RlZCB1c2FnZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNyZWF0ZSBwYXJhbWV0ZXJzIGZvclxyXG4gKiBvdGhlciBjYWxsYmFjayBmdW5jdGlvbi5cclxuICpcclxuICogRXhhbXBsZSB1c2FnZS5cclxuICpcclxuICogbGV0IGJlZm9yZSA9IHRoZW5DYWxsYmFjaygpLFxyXG4gKiAgICAgYWZ0ZXIgPSB0aGVuQ2FsbGJhY2soKTtcclxuICpcclxuICogcHVic3ViLnB1Ymxpc2goXCJzb21lVG9waWNcIiwgYmVmb3JlLCBhZnRlcik7XHJcbiAqXHJcbiAqIGJlZm9yZS5maXJlKCk7XHJcbiAqIC8vIGRvIHNvbWV0aGluZy5cclxuICogYWZ0ZXIuZmlyZSgpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0aGVuQ2FsbGJhY2soKSB7XHJcbiAgICBsZXQgZm4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIGZuLmFjdGlvbnMucHVzaChjYWxsYmFjayk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZuLmFjdGlvbnMgPSBbXTtcclxuXHJcbiAgICBmbi5maXJlID0gZnVuY3Rpb24oLi4uYXJncykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSBmbi5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBmbi5hY3Rpb25baV0oLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZm47XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9ldmVudHMuanMiXSwic291cmNlUm9vdCI6IiJ9