

export class MetaData {
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
            return arguments.length > 1 ? this.data[index][key] : this.data[index];
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
