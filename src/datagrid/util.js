

const reg_coord = /([A-Z]+)([0-9]+)/;


/**
 * Converts an index to a BASE 26 string where 1 = A.
 * @param index
 * @returns {string}
 */
export function stringFromColumnIndex(index) {
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
export function stringToIndex(s) {
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
export function coordinateString(x, y) {
    return stringFromColumnIndex(x) + (y+1);
}


/**
 * Takes a cell coordinate and returns an x, y pair.
 * @param c
 * @returns {[null,null]}
 */
export function fromCoordinateString(c) {
    let reg = reg_coord.exec(c),
        x = reg[1],
        y = reg[2];

    return [stringToIndex(x), parseInt(y, 10)-1];
}


export function randomChoice(array) {
    let c = Math.floor(Math.random() * array.length);
    return array[c];
}

/**
 *
 * @param value
 * @param min
 * @param max
 * @returns {*}
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