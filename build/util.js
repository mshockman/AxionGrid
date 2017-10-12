(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("util", [], factory);
	else if(typeof exports === 'object')
		exports["util"] = factory();
	else
		root["util"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
            // If only 1 argument is provided the topic is *.
            if (arguments.length === 1) {
                callback = topic;
                topic = "*";
            }

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
            // If only 1 argument is provided the topic is *.
            if (arguments.length === 1) {
                callback = topic;
                topic = "*";
            }

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
            // If only 1 argument is provided the topic is *.
            if (arguments.length === 1) {
                callback = topic;
                topic = "*";
            }

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
            if (topic === "*") {
                throw new Error("You cannot publish the global topic *.");
            }

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            if (this.topics[topic]) {
                for (var i = 0, l = this.topics[topic].length; i < l; i++) {
                    var _topics$topic;

                    if ((_topics$topic = this.topics[topic])[i].apply(_topics$topic, args) === false) {
                        break;
                    }
                }
            }

            if (this.topics["*"]) {
                for (var _i = 0, _l = this.topics["*"].length; _i < _l; _i++) {
                    var _topics$;

                    if ((_topics$ = this.topics["*"])[_i].apply(_topics$, [topic].concat(args)) === false) {
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
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjOTY0MTcyNDc1ZWJlNTAzMWU2NyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2V2ZW50cy5qcyJdLCJuYW1lcyI6WyJ1dGlsIiwiZXZlbnRzIiwicmFuZG9tQ2hvaWNlIiwiY2xhbXAiLCJkaWN0c0VxdWFsIiwiYXJyYXkiLCJjIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwidmFsdWUiLCJtaW4iLCJtYXgiLCJvYmplY3QxIiwib2JqZWN0MiIsImtleXMxIiwiT2JqZWN0Iiwia2V5cyIsImtleXMyIiwiaSIsImwiLCJrZXkiLCJpbmRleE9mIiwiZmxhZ0NhbGxiYWNrIiwidGhlbkNhbGxiYWNrIiwiUHVibGlzaGVyIiwidG9waWNzIiwidG9waWMiLCJjYWxsYmFjayIsImFyZ3VtZW50cyIsIlR5cGVFcnJvciIsInB1c2giLCJzcGxpY2UiLCJFcnJvciIsImFyZ3MiLCJPYnNlcnZhYmxlIiwiY2FsbGJhY2tzIiwiY29uY2F0IiwiZm4iLCJmbGFnIiwid2FzQ2FsbGVkIiwiYWN0aW9ucyIsImZpcmUiLCJhY3Rpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtB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QixRQUFJYyxLQUFLLFNBQUxBLEVBQUssQ0FBU1YsUUFBVCxFQUFtQjtBQUN4QlUsV0FBR0csT0FBSCxDQUFXVixJQUFYLENBQWdCSCxRQUFoQjtBQUNILEtBRkQ7O0FBSUFVLE9BQUdHLE9BQUgsR0FBYSxFQUFiOztBQUVBSCxPQUFHSSxJQUFILEdBQVUsWUFBa0I7QUFDeEIsYUFBSSxJQUFJdkIsSUFBSSxDQUFSLEVBQVdDLElBQUlrQixHQUFHRyxPQUFILENBQVdoQyxNQUE5QixFQUFzQ1UsSUFBSUMsQ0FBMUMsRUFBNkNELEdBQTdDLEVBQWtEO0FBQUE7O0FBQzlDLDZCQUFHd0IsTUFBSCxFQUFVeEIsQ0FBVjtBQUNIO0FBQ0osS0FKRDs7QUFNQSxXQUFPbUIsRUFBUDtBQUNILEMiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidXRpbFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ1dGlsXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInV0aWxcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzk2NDE3MjQ3NWViZTUwMzFlNjciLCJpbXBvcnQgKiBhcyB1dGlsIGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0ICogYXMgZXZlbnRzIGZyb20gXCIuL2V2ZW50c1wiO1xyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICB1dGlsLFxyXG4gICAgZXZlbnRzLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbXNob2Mgb24gMTAvMTAvMjAxNy5cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIENob29zZXMgYSByYW5kb20gY2hvaWNlIGZyb20gYW4gYXJyYXkuXHJcbiAqIEBwYXJhbSBhcnJheVxyXG4gKiBAcmV0dXJuIHsqfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUNob2ljZShhcnJheSkge1xyXG4gICAgbGV0IGMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGgpO1xyXG4gICAgcmV0dXJuIGFycmF5W2NdO1xyXG59XHJcblxyXG4vKipcclxuICogQ2xhbXBzIGEgbnVtYmVyIGJldHdlZW4gYSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlLlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICogQHBhcmFtIG1pblxyXG4gKiBAcGFyYW0gbWF4XHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbj1udWxsLCBtYXg9bnVsbCkge1xyXG4gICAgaWYobWluICE9IG51bGwpIHtcclxuICAgICAgICB2YWx1ZSA9IE1hdGgubWF4KG1pbiwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKG1heCAhPSBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSBNYXRoLm1pbihtYXgsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQ29tcGFyZXMgdG8gb2JqZWN0cyB0byBzZWUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cclxuICogQHBhcmFtIG9iamVjdDFcclxuICogQHBhcmFtIG9iamVjdDJcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkaWN0c0VxdWFsKG9iamVjdDEsIG9iamVjdDIpIHtcclxuICAgIGlmKHR5cGVvZiBvYmplY3QxICE9PSB0eXBlb2Ygb2JqZWN0Mikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQga2V5czEgPSBPYmplY3Qua2V5cyhvYmplY3QxKSxcclxuICAgICAgICBrZXlzMiA9IE9iamVjdC5rZXlzKG9iamVjdDIpO1xyXG5cclxuICAgIGlmKGtleXMxLmxlbmd0aCAhPT0ga2V5czIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcihsZXQgaSA9IDAsIGwgPSBrZXlzMS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBsZXQga2V5ID0ga2V5czFbaV07XHJcblxyXG4gICAgICAgIGlmKGtleXMyLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZihvYmplY3QxW2tleV0gIT09IG9iamVjdDJba2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi91dGlsLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbXNob2Mgb24gMTAvMTAvMjAxNy5cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIEFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMgYSBzaW1wbGUgcHVibGlzaGVyIC8gc3Vic2NyaWJlciBpbnRlcmZhY2UuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHVibGlzaGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudG9waWNzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdWJzY3JpYmUgdG8gYSB0b3BpYy5cclxuICAgICAqIEBwYXJhbSB0b3BpY1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKi9cclxuICAgIHN1YnNjcmliZSh0b3BpYywgY2FsbGJhY2spIHtcclxuICAgICAgICAvLyBJZiBvbmx5IDEgYXJndW1lbnQgaXMgcHJvdmlkZWQgdGhlIHRvcGljIGlzICouXHJcbiAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IHRvcGljO1xyXG4gICAgICAgICAgICB0b3BpYyA9IFwiKlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2FuaXR5IGNoZWNrLlxyXG4gICAgICAgIGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMudG9waWNzW3RvcGljXSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvcGljc1t0b3BpY10gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG9waWNzW3RvcGljXS5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuc3Vic2NyaWJlIGZyb20gYSB0b3BpYy5cclxuICAgICAqIEBwYXJhbSB0b3BpY1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgdW5zdWJzY3JpYmUodG9waWMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy8gSWYgb25seSAxIGFyZ3VtZW50IGlzIHByb3ZpZGVkIHRoZSB0b3BpYyBpcyAqLlxyXG4gICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSB0b3BpYztcclxuICAgICAgICAgICAgdG9waWMgPSBcIipcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMudG9waWNzW3RvcGljXSkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMudG9waWNzW3RvcGljXS5pbmRleE9mKGNhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvcGljc1t0b3BpY10uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBjYWxsYmFjayBpcyBzdWJzY3JpYmVkIHRvIHRoZSB0b3BpYy5cclxuICAgICAqIEBwYXJhbSB0b3BpY1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNTdWJzY3JpYmVkKHRvcGljLCBjYWxsYmFjaykge1xyXG4gICAgICAgIC8vIElmIG9ubHkgMSBhcmd1bWVudCBpcyBwcm92aWRlZCB0aGUgdG9waWMgaXMgKi5cclxuICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdG9waWM7XHJcbiAgICAgICAgICAgIHRvcGljID0gXCIqXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy50b3BpY3NbdG9waWNdID8gdGhpcy50b3BpY3NbdG9waWNdLmluZGV4T2YoY2FsbGJhY2spICE9PSAtMSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGEgdG9waWMgb2YgYWxsIHN1YnNjcmliZXJzLlxyXG4gICAgICogQHBhcmFtIHRvcGljXHJcbiAgICAgKi9cclxuICAgIGNsZWFyKHRvcGljKSB7XHJcbiAgICAgICAgaWYodGhpcy50b3BpY3NbdG9waWNdKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9waWNzW3RvcGljXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFB1Ymxpc2hlcyBhIHRvcGljIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50cy5cclxuICAgICAqIEBwYXJhbSB0b3BpY1xyXG4gICAgICogQHBhcmFtIGFyZ3NcclxuICAgICAqL1xyXG4gICAgcHVibGlzaCh0b3BpYywgLi4uYXJncykge1xyXG4gICAgICAgIGlmKHRvcGljID09PSBcIipcIikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2Fubm90IHB1Ymxpc2ggdGhlIGdsb2JhbCB0b3BpYyAqLlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMudG9waWNzW3RvcGljXSkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwLCBsID0gdGhpcy50b3BpY3NbdG9waWNdLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50b3BpY3NbdG9waWNdW2ldKC4uLmFyZ3MpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnRvcGljc1tcIipcIl0pIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMCwgbCA9IHRoaXMudG9waWNzW1wiKlwiXS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMudG9waWNzW1wiKlwiXVtpXSh0b3BpYywgLi4uYXJncykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQW4gb2JzZXJ2YWJsZSBvYmplY3QuICBDYW4gYWRkIGFuZCByZW1vdmUgY2FsbGJhY2tzIGFuZCBmaXJlIGV2ZW50cy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlIHtcclxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy8gU2FuaXR5IGNoZWNrLlxyXG4gICAgICAgIGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGkgPSB0aGlzLmluZGV4T2YoY2FsbGJhY2spO1xyXG5cclxuICAgICAgICBpZihpICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFzKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZihjYWxsYmFjaykgIT09IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGluZGV4T2YoY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKC4uLmFyZ3MpIHtcclxuICAgICAgICBpZih0aGlzLmFyZ3MpIHtcclxuICAgICAgICAgICAgYXJncyA9IHRoaXMuYXJncy5jb25jYXQoYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwLCBsID0gdGhpcy5jYWxsYmFja3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW2ldKC4uLmFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBzZXRzIGEgZmxhZyBpZiBpdCBpcyBjYWxsZWQgb25jZS5cclxuICpcclxuICogRXhwZWN0ZWQgdXNhZ2UuXHJcbiAqXHJcbiAqIGxldCBmbGFnID0gZmxhZ0NhbGxiYWNrKCk7XHJcbiAqXHJcbiAqIHB1YnN1Yi5wdWJsaXNoKFwic29tZVRvcGljXCIsIGZsYWcpO1xyXG4gKlxyXG4gKiBpZihmbGFnLndhc0NhbGxlZCgpKSB7XHJcbiAqICAgICAvLyBEbyBzb21ldGhpbmdcclxuICogfVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtmbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmbGFnQ2FsbGJhY2soKSB7XHJcbiAgICBsZXQgZm4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBmbi5mbGFnID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgZm4uZmxhZyA9IGZhbHNlO1xyXG5cclxuICAgIGZuLndhc0NhbGxlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBmbi5mbGFnO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZm47XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmVnaXN0ZXIgYW55IGZ1bmN0aW9uIHBhc3NlZCB0byBpdCB0byBhIGxpc3Qgb2YgYWN0aW9ucy4gIFlvdSBjYW4gdGhlbiBjYWxsIGZuLmZpcmUoLi4uYXJncylcclxuICogdG8gZmlyZSBhbGwgcmVnaXN0ZXIgY2FsbGJhY2tzIG9mIHRoYXQgZnVuY3Rpb24uICBUaGUgZXhwZWN0ZWQgdXNhZ2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBjcmVhdGUgcGFyYW1ldGVycyBmb3JcclxuICogb3RoZXIgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEV4YW1wbGUgdXNhZ2UuXHJcbiAqXHJcbiAqIGxldCBiZWZvcmUgPSB0aGVuQ2FsbGJhY2soKSxcclxuICogICAgIGFmdGVyID0gdGhlbkNhbGxiYWNrKCk7XHJcbiAqXHJcbiAqIHB1YnN1Yi5wdWJsaXNoKFwic29tZVRvcGljXCIsIGJlZm9yZSwgYWZ0ZXIpO1xyXG4gKlxyXG4gKiBiZWZvcmUuZmlyZSgpO1xyXG4gKiAvLyBkbyBzb21ldGhpbmcuXHJcbiAqIGFmdGVyLmZpcmUoKTtcclxuICpcclxuICogQHJldHVybiB7Zm59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGhlbkNhbGxiYWNrKCkge1xyXG4gICAgbGV0IGZuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBmbi5hY3Rpb25zLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICBmbi5hY3Rpb25zID0gW107XHJcblxyXG4gICAgZm4uZmlyZSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwLCBsID0gZm4uYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgZm4uYWN0aW9uW2ldKC4uLmFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGZuO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vZXZlbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==