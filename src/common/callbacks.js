/**
 * Created by mshoc on 10/10/2017.
 */


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