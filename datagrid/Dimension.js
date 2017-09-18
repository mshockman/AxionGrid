

export class Dimension {
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