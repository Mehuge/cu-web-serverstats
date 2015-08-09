var Rest = require('../lib/cu-rest.js');
var Reflux = require('reflux');
var KillsAction = require('../actions/kills.js');
var ErrorAction = require('../actions/error.js');

var Population = Reflux.createStore({
    listenables: [ KillsAction ],
    fetchKills: function() {
        var store = this;
        function rejected(e) {
            ErrorAction.fire(e);
        }
        Rest.getKills().then(function(args) {
            ErrorAction.clear();
            debugger;
        }, rejected);
    }
});

module.exports = Population;
