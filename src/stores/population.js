var Rest = require('../lib/cu-rest.js');
var Reflux = require('reflux');
var PopulationAction = require('../actions/population.js');
var ErrorAction = require('../actions/error.js');

var Population = Reflux.createStore({
    listenables: [ PopulationAction ],
    fetchPopulation: function() {
        var store = this;
        function rejected(e) {
            ErrorAction.fire(e);
        }
        Rest.getPlayers().then(function(args) {
            ErrorAction.clear();
            store._population = {
                arthurian: args.arthurians,
                tdd: args.tuathaDeDanann,
                viking: args.vikings
            };
            store.trigger(store._population);
        }, rejected);
    }
});

module.exports = Population;
