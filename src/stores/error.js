var Reflux = require('reflux');
var ErrorAction = require('../actions/error.js');

var Error = Reflux.createStore({
    listenables: [ ErrorAction ],
    fire: function(e) {
        this.error = e;
        this.trigger(this.error);
    },
    clear: function() {
        this.error = null;
        this.trigger(this.error);
    }
});

module.exports = Error;
