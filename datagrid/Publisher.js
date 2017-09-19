

export let publisher = {
    subscribe: function(topic, callback) {
        if(!this._subscriptions) {
            this._subscriptions = {};
        }

        if(!this._subscriptions[topic]) {
            this._subscriptions[topic] = [];
        }

        this._subscriptions[topic].push(callback);
    },

    publish: function(topic, ...args) {
        if(this._subscriptions && this._subscriptions[topic]) {
            for(let i = 0, l = this._subscriptions[topic].length; i < l; i++) {
                if(this._subscriptions[topic][i](...args) === false) {
                    break;
                }
            }
        }
    },

    unsubscribe: function(topic, callback) {
        if(this._subscriptions && this._subscriptions[topic]) {
            let i = this._subscriptions[topic].indexOf(callback);

            if(i !== -1) {
                this._subscriptions[topic].splice(i, 1);
                return callback;
            }
        }
    }
};
