/**
 * Parses an html string into a document fragment.
 * @param html
 * @returns {DocumentFragment}
 */
import {isEmptyObject} from "./util";


export function parseHTML(html) {
    let div = document.createElement("div"),
        frag = document.createDocumentFragment();

    div.innerHTML = html;

    for(let i = 0; i < div.children.length; i++) {
        frag.appendChild(div.children[i]);
    }

    return frag;
}


class DataCache {
    static uuid = 0;

    constructor() {
        this.expando = "_" + (++DataCache.uuid) + "-" + Math.round(Math.random()*100000);
    }

    cache(owner) {
        let value = owner[this.expando];

        if(!value) {
            value = {};

            if(DataCache.acceptsData(owner)) {
                if(owner.nodeType) {
                    owner[this.expando] = value;
                }
            } else {
                Object.defineProperty( owner, this.expando, {
                    value: value,
                    configurable: true
                } );
            }
        }

        return value;
    }

    get(owner, key) {
        return key === undefined ? this.cache(owner) : owner[this.expando][key];
    }

    set(owner, data, value) {
        let cache = this.cache(owner);

        if(typeof data === "string") {
            cache[data] = value;
        } else {
            for(let key in data) {
                if(data.hasOwnProperty(key)) {
                    cache[key] = data[key];
                }
            }
        }

        return cache;
    }

    access(owner, key, value) {
        if(key === undefined || (key && typeof key === "string" && value === undefined)) {
            return this.get(owner, key);
        } else {
            this.set(owner, key, value);
            return value !== undefined ? value : key;
        }
    }

    remove(owner, key) {
        let cache = owner[this.expando]; // Get directly because we don't want to create it if it doesn't exist.

        if(cache === undefined) {
            return;
        }

        if(key !== undefined) {
            if(!Array.isArray(key)) {
                key = [key];
            }

            let i = key.length;

            while(i--) {
                delete cache[key[i]];
            }
        }

        if(key === undefined || isEmptyObject(cache)) {
            if(owner.nodeType) {
                owner[this.expando] = undefined;
            } else {
                delete owner[this.expando];
            }
        }
    }

    static acceptsData(owner) {
        if(owner) {
            return owner.nodeType === 1 || owner.nodeType === 9 || !(owner.nodeType);
        }
    }
}