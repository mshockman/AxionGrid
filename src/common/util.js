/**
 * Created by mshoc on 10/10/2017.
 */


/**
 * Chooses a random choice from an array.
 * @param array
 * @return {*}
 */
export function randomChoice(array) {
    let c = Math.floor(Math.random() * array.length);
    return array[c];
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value
 * @param min
 * @param max
 * @returns {Number}
 */
export function clamp(value, min=null, max=null) {
    if(min != null) {
        value = Math.max(min, value);
    }

    if(max != null) {
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
export function dictsEqual(object1, object2) {
    if(typeof object1 !== typeof object2) {
        return false;
    }

    let keys1 = Object.keys(object1),
        keys2 = Object.keys(object2);

    if(keys1.length !== keys2.length) {
        return false;
    }

    for(let i = 0, l = keys1.length; i < l; i++) {
        let key = keys1[i];

        if(keys2.indexOf(key) === -1) {
            return false;
        } else if(object1[key] !== object2[key]) {
            return false;
        }
    }

    return true;
}


export function isEmptyObject(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}