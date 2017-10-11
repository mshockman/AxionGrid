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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzJkMGJmZjc2MTdlY2ExOTVjYjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9ldmVudHMuanMiXSwibmFtZXMiOlsidXRpbCIsImV2ZW50cyIsInJhbmRvbUNob2ljZSIsImNsYW1wIiwiZGljdHNFcXVhbCIsImFycmF5IiwiYyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInZhbHVlIiwibWluIiwibWF4Iiwib2JqZWN0MSIsIm9iamVjdDIiLCJrZXlzMSIsIk9iamVjdCIsImtleXMiLCJrZXlzMiIsImkiLCJsIiwia2V5IiwiaW5kZXhPZiIsImZsYWdDYWxsYmFjayIsInRoZW5DYWxsYmFjayIsIlB1Ymxpc2hlciIsInRvcGljcyIsInRvcGljIiwiY2FsbGJhY2siLCJhcmd1bWVudHMiLCJUeXBlRXJyb3IiLCJwdXNoIiwic3BsaWNlIiwiRXJyb3IiLCJhcmdzIiwiT2JzZXJ2YWJsZSIsImNhbGxiYWNrcyIsImNvbmNhdCIsImZuIiwiZmxhZyIsIndhc0NhbGxlZCIsImFjdGlvbnMiLCJmaXJlIiwiYWN0aW9uIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFF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QUFILEdBQWEsRUFBYjs7QUFFQUgsT0FBR0ksSUFBSCxHQUFVLFlBQWtCO0FBQ3hCLGFBQUksSUFBSXZCLElBQUksQ0FBUixFQUFXQyxJQUFJa0IsR0FBR0csT0FBSCxDQUFXaEMsTUFBOUIsRUFBc0NVLElBQUlDLENBQTFDLEVBQTZDRCxHQUE3QyxFQUFrRDtBQUFBOztBQUM5Qyw2QkFBR3dCLE1BQUgsRUFBVXhCLENBQVY7QUFDSDtBQUNKLEtBSkQ7O0FBTUEsV0FBT21CLEVBQVA7QUFDSCxDIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MmQwYmZmNzYxN2VjYTE5NWNiNSIsImltcG9ydCAqIGFzIHV0aWwgZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSBcIi4vZXZlbnRzXCI7XHJcblxyXG5cclxuZXhwb3J0IHtcclxuICAgIHV0aWwsXHJcbiAgICBldmVudHMsXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vaW5kZXguanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBtc2hvYyBvbiAxMC8xMC8yMDE3LlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogQ2hvb3NlcyBhIHJhbmRvbSBjaG9pY2UgZnJvbSBhbiBhcnJheS5cclxuICogQHBhcmFtIGFycmF5XHJcbiAqIEByZXR1cm4geyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tQ2hvaWNlKGFycmF5KSB7XHJcbiAgICBsZXQgYyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCk7XHJcbiAgICByZXR1cm4gYXJyYXlbY107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbGFtcHMgYSBudW1iZXIgYmV0d2VlbiBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUuXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKiBAcGFyYW0gbWluXHJcbiAqIEBwYXJhbSBtYXhcclxuICogQHJldHVybnMge051bWJlcn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCh2YWx1ZSwgbWluPW51bGwsIG1heD1udWxsKSB7XHJcbiAgICBpZihtaW4gIT0gbnVsbCkge1xyXG4gICAgICAgIHZhbHVlID0gTWF0aC5tYXgobWluLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYobWF4ICE9IG51bGwpIHtcclxuICAgICAgICB2YWx1ZSA9IE1hdGgubWluKG1heCwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJlcyB0byBvYmplY3RzIHRvIHNlZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxyXG4gKiBAcGFyYW0gb2JqZWN0MVxyXG4gKiBAcGFyYW0gb2JqZWN0MlxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRpY3RzRXF1YWwob2JqZWN0MSwgb2JqZWN0Mikge1xyXG4gICAgaWYodHlwZW9mIG9iamVjdDEgIT09IHR5cGVvZiBvYmplY3QyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBrZXlzMSA9IE9iamVjdC5rZXlzKG9iamVjdDEpLFxyXG4gICAgICAgIGtleXMyID0gT2JqZWN0LmtleXMob2JqZWN0Mik7XHJcblxyXG4gICAgaWYoa2V5czEubGVuZ3RoICE9PSBrZXlzMi5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBpID0gMCwgbCA9IGtleXMxLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGxldCBrZXkgPSBrZXlzMVtpXTtcclxuXHJcbiAgICAgICAgaWYoa2V5czIuaW5kZXhPZihrZXkpID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmKG9iamVjdDFba2V5XSAhPT0gb2JqZWN0MltrZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3V0aWwuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBtc2hvYyBvbiAxMC8xMC8yMDE3LlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogQW4gb2JqZWN0IHRoYXQgaW1wbGVtZW50cyBhIHNpbXBsZSBwdWJsaXNoZXIgLyBzdWJzY3JpYmVyIGludGVyZmFjZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBQdWJsaXNoZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50b3BpY3MgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN1YnNjcmliZSB0byBhIHRvcGljLlxyXG4gICAgICogQHBhcmFtIHRvcGljXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAqL1xyXG4gICAgc3Vic2NyaWJlKHRvcGljLCBjYWxsYmFjaykge1xyXG4gICAgICAgIC8vIElmIG9ubHkgMSBhcmd1bWVudCBpcyBwcm92aWRlZCB0aGUgdG9waWMgaXMgKi5cclxuICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdG9waWM7XHJcbiAgICAgICAgICAgIHRvcGljID0gXCIqXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTYW5pdHkgY2hlY2suXHJcbiAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighdGhpcy50b3BpY3NbdG9waWNdKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9waWNzW3RvcGljXSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b3BpY3NbdG9waWNdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5zdWJzY3JpYmUgZnJvbSBhIHRvcGljLlxyXG4gICAgICogQHBhcmFtIHRvcGljXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICB1bnN1YnNjcmliZSh0b3BpYywgY2FsbGJhY2spIHtcclxuICAgICAgICAvLyBJZiBvbmx5IDEgYXJndW1lbnQgaXMgcHJvdmlkZWQgdGhlIHRvcGljIGlzICouXHJcbiAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IHRvcGljO1xyXG4gICAgICAgICAgICB0b3BpYyA9IFwiKlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy50b3BpY3NbdG9waWNdKSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gdGhpcy50b3BpY3NbdG9waWNdLmluZGV4T2YoY2FsbGJhY2spO1xyXG5cclxuICAgICAgICAgICAgaWYoaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9waWNzW3RvcGljXS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGNhbGxiYWNrIGlzIHN1YnNjcmliZWQgdG8gdGhlIHRvcGljLlxyXG4gICAgICogQHBhcmFtIHRvcGljXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc1N1YnNjcmliZWQodG9waWMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy8gSWYgb25seSAxIGFyZ3VtZW50IGlzIHByb3ZpZGVkIHRoZSB0b3BpYyBpcyAqLlxyXG4gICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSB0b3BpYztcclxuICAgICAgICAgICAgdG9waWMgPSBcIipcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvcGljc1t0b3BpY10gPyB0aGlzLnRvcGljc1t0b3BpY10uaW5kZXhPZihjYWxsYmFjaykgIT09IC0xIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYSB0b3BpYyBvZiBhbGwgc3Vic2NyaWJlcnMuXHJcbiAgICAgKiBAcGFyYW0gdG9waWNcclxuICAgICAqL1xyXG4gICAgY2xlYXIodG9waWMpIHtcclxuICAgICAgICBpZih0aGlzLnRvcGljc1t0b3BpY10pIHtcclxuICAgICAgICAgICAgdGhpcy50b3BpY3NbdG9waWNdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHVibGlzaGVzIGEgdG9waWMgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxyXG4gICAgICogQHBhcmFtIHRvcGljXHJcbiAgICAgKiBAcGFyYW0gYXJnc1xyXG4gICAgICovXHJcbiAgICBwdWJsaXNoKHRvcGljLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgaWYodG9waWMgPT09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3QgcHVibGlzaCB0aGUgZ2xvYmFsIHRvcGljICouXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy50b3BpY3NbdG9waWNdKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSB0aGlzLnRvcGljc1t0b3BpY10ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRvcGljc1t0b3BpY11baV0oLi4uYXJncykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMudG9waWNzW1wiKlwiXSkge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwLCBsID0gdGhpcy50b3BpY3NbXCIqXCJdLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50b3BpY3NbXCIqXCJdW2ldKHRvcGljLCAuLi5hcmdzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBbiBvYnNlcnZhYmxlIG9iamVjdC4gIENhbiBhZGQgYW5kIHJlbW92ZSBjYWxsYmFja3MgYW5kIGZpcmUgZXZlbnRzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGUge1xyXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xyXG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQoY2FsbGJhY2spIHtcclxuICAgICAgICAvLyBTYW5pdHkgY2hlY2suXHJcbiAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUoY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgaSA9IHRoaXMuaW5kZXhPZihjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIGlmKGkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYXMoY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKGNhbGxiYWNrKSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXhPZihjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmUoLi4uYXJncykge1xyXG4gICAgICAgIGlmKHRoaXMuYXJncykge1xyXG4gICAgICAgICAgICBhcmdzID0gdGhpcy5hcmdzLmNvbmNhdChhcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSB0aGlzLmNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbaV0oLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHNldHMgYSBmbGFnIGlmIGl0IGlzIGNhbGxlZCBvbmNlLlxyXG4gKlxyXG4gKiBFeHBlY3RlZCB1c2FnZS5cclxuICpcclxuICogbGV0IGZsYWcgPSBmbGFnQ2FsbGJhY2soKTtcclxuICpcclxuICogcHVic3ViLnB1Ymxpc2goXCJzb21lVG9waWNcIiwgZmxhZyk7XHJcbiAqXHJcbiAqIGlmKGZsYWcud2FzQ2FsbGVkKCkpIHtcclxuICogICAgIC8vIERvIHNvbWV0aGluZ1xyXG4gKiB9XHJcbiAqXHJcbiAqIEByZXR1cm4ge2ZufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZsYWdDYWxsYmFjaygpIHtcclxuICAgIGxldCBmbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZuLmZsYWcgPSB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICBmbi5mbGFnID0gZmFsc2U7XHJcblxyXG4gICAgZm4ud2FzQ2FsbGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGZuLmZsYWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBmbjtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZWdpc3RlciBhbnkgZnVuY3Rpb24gcGFzc2VkIHRvIGl0IHRvIGEgbGlzdCBvZiBhY3Rpb25zLiAgWW91IGNhbiB0aGVuIGNhbGwgZm4uZmlyZSguLi5hcmdzKVxyXG4gKiB0byBmaXJlIGFsbCByZWdpc3RlciBjYWxsYmFja3Mgb2YgdGhhdCBmdW5jdGlvbi4gIFRoZSBleHBlY3RlZCB1c2FnZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNyZWF0ZSBwYXJhbWV0ZXJzIGZvclxyXG4gKiBvdGhlciBjYWxsYmFjayBmdW5jdGlvbi5cclxuICpcclxuICogRXhhbXBsZSB1c2FnZS5cclxuICpcclxuICogbGV0IGJlZm9yZSA9IHRoZW5DYWxsYmFjaygpLFxyXG4gKiAgICAgYWZ0ZXIgPSB0aGVuQ2FsbGJhY2soKTtcclxuICpcclxuICogcHVic3ViLnB1Ymxpc2goXCJzb21lVG9waWNcIiwgYmVmb3JlLCBhZnRlcik7XHJcbiAqXHJcbiAqIGJlZm9yZS5maXJlKCk7XHJcbiAqIC8vIGRvIHNvbWV0aGluZy5cclxuICogYWZ0ZXIuZmlyZSgpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0aGVuQ2FsbGJhY2soKSB7XHJcbiAgICBsZXQgZm4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIGZuLmFjdGlvbnMucHVzaChjYWxsYmFjayk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZuLmFjdGlvbnMgPSBbXTtcclxuXHJcbiAgICBmbi5maXJlID0gZnVuY3Rpb24oLi4uYXJncykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSBmbi5hY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBmbi5hY3Rpb25baV0oLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZm47XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9ldmVudHMuanMiXSwic291cmNlUm9vdCI6IiJ9