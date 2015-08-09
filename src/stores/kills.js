var Rest = require('../lib/cu-rest.js');
var Reflux = require('reflux');
var KillsAction = require('../actions/kills.js');
var ErrorAction = require('../actions/error.js');

var Population = Reflux.createStore({
    listenables: [ KillsAction ],
    parseKills: function(kills) {
        var players = {};

        // count kills and deaths per player
        for (var i = 0; i < kills.length; i++) {
            var k = kills[i].killer, v = kills[i].victim;
            (players[k.name] = players[k.name] || { kills: 0, deaths: 0 }).kills ++;
            (players[v.name] = players[v.name] || { kills: 0, deaths: 0 }).deaths ++;
        }

        var leaderboard = this.leaderboard = {
            kills: [], deaths: []
        };

        // split players into kills and deaths tables
        for (var name in players) {
            if (players[name].kills) {
                leaderboard.kills.push({ name: name, count: players[name].kills });
            }
            if (players[name].deaths) {
                leaderboard.deaths.push({ name: name, count: players[name].deaths });
            }
        }

        // sort player tables
        function compare(a, b) {
            return b.count - a.count;
        }
        leaderboard.kills.sort(compare);
        leaderboard.deaths.sort(compare);
    },
    fetchKills: function() {
        var store = this;
        function rejected(e) {
            ErrorAction.fire(e);
        }
        Rest.getKills().then(function(args) {
            ErrorAction.clear();
            store.parseKills(args);
            store.trigger(store.leaderboard);
        }, rejected);
    }
});

module.exports = Population;
