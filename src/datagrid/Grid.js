

export class BaseGrid {
    constructor(model, viewport, canvas) {
        this.viewport = viewport;
        this.model = model;
        this.canvas = canvas;

        this.viewport.setGrid(this);
        this.model.setGrid(this);
        this.canvas.setGrid(this);
    }

    setColumns(columns) {
        this.model.setColumns(columns);
    }

    setData(data) {
        this.model.setData(data);
    }

    render() {
        this.canvas.render();
    }

    subscribe(topic, callback) {
        if(!this._subscriptions) {
            this._subscriptions = {};
        }

        if(!this._subscriptions[topic]) {
            this._subscriptions[topic] = [];
        }

        this._subscriptions[topic].push(callback);
    }

    publish(topic, ...args) {
        if(this._subscriptions && this._subscriptions[topic]) {
            for(let i = 0, l = this._subscriptions[topic].length; i < l; i++) {
                if(this._subscriptions[topic][i](...args) === false) {
                    break;
                }
            }
        }
    }

    unsubscribe(topic, callback) {
        if(this._subscriptions && this._subscriptions[topic]) {
            let i = this._subscriptions[topic].indexOf(callback);

            if(i !== -1) {
                this._subscriptions[topic].splice(i, 1);
                return callback;
            }
        }
    }
}


