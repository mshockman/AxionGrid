/**
 * Created by mshoc on 10/10/2017.
 */


/**
 * An object that implements a simple publisher / subscriber interface.
 */
export class Publisher {
    constructor() {
        this.topics = {};
    }

    /**
     * Subscribe to a topic.
     * @param topic
     * @param callback
     */
    subscribe(topic, callback) {
        // If only 1 argument is provided the topic is *.
        if(arguments.length === 1) {
            callback = topic;
            topic = "*";
        }

        // Sanity check.
        if(typeof callback !== "function") {
            throw new TypeError("Callback must be a function.");
        }

        if(!this.topics[topic]) {
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
    unsubscribe(topic, callback) {
        // If only 1 argument is provided the topic is *.
        if(arguments.length === 1) {
            callback = topic;
            topic = "*";
        }

        if(this.topics[topic]) {
            let i = this.topics[topic].indexOf(callback);

            if(i !== -1) {
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
    isSubscribed(topic, callback) {
        // If only 1 argument is provided the topic is *.
        if(arguments.length === 1) {
            callback = topic;
            topic = "*";
        }

        return this.topics[topic] ? this.topics[topic].indexOf(callback) !== -1 : false;
    }

    /**
     * Clears a topic of all subscribers.
     * @param topic
     */
    clear(topic) {
        if(this.topics[topic]) {
            this.topics[topic] = [];
        }
    }

    /**
     * Publishes a topic with the given arguments.
     * @param topic
     * @param args
     */
    publish(topic, ...args) {
        if(topic === "*") {
            throw new Error("You cannot publish the global topic *.");
        }

        if(this.topics[topic]) {
            for(let i = 0, l = this.topics[topic].length; i < l; i++) {
                if(this.topics[topic][i](...args) === false) {
                    break;
                }
            }
        }

        if(this.topics["*"]) {
            for(let i = 0, l = this.topics["*"].length; i < l; i++) {
                if(this.topics["*"][i](topic, ...args) === false) {
                    break;
                }
            }
        }
    }
}


/**
 * An observable object.  Can add and remove callbacks and fire events.
 */
export class Observable {
    constructor(...args) {
        this.args = args;
        this.callbacks = [];
    }

    add(callback) {
        // Sanity check.
        if(typeof callback !== "function") {
            throw new TypeError("Callback must be a function.");
        }

        this.callbacks.push(callback);
    }

    remove(callback) {
        let i = this.indexOf(callback);

        if(i !== -1) {
            this.callbacks.splice(i, 1);
            return callback;
        }
    }

    has(callback) {
        return this.indexOf(callback) !== -1;
    }

    indexOf(callback) {
        return this.callbacks.indexOf(callback);
    }

    clear() {
        this.callbacks = [];
    }

    fire(...args) {
        if(this.args) {
            args = this.args.concat(args);
        }

        for(let i = 0, l = this.callbacks.length; i < l; i++) {
            this.callbacks[i](...args);
        }
    }
}


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
export function flagCallback() {
    let fn = function() {
        fn.flag = true;
    };

    fn.flag = false;

    fn.wasCalled = function() {
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
export function thenCallback() {
    let fn = function(callback) {
        fn.actions.push(callback);
    };

    fn.actions = [];

    fn.fire = function(...args) {
        for(let i = 0, l = fn.actions.length; i < l; i++) {
            fn.action[i](...args);
        }
    };

    return fn;
}
