var Rest = require('../lib/cu-rest.js');
var Reflux = require('reflux');
var KillsAction = require('../actions/kills.js');
var ErrorAction = require('../actions/error.js');
var ScoreStore = require('../stores/score.js');

var Kills = Reflux.createStore({
    listenables: [ KillsAction ],
    lastGameState: undefined,
    gameStart: 0,
    init: function() {
        this.listenTo(ScoreStore, this.score);
    },
    score: function(args) {
        if (args.game.state != this.lastGameState) {
            // new game state, are we moving from waiting to basic or advanced?
            if (this.lastGameState === 1 && args.game.state > 1) {
                // game starting
                this.gameStart = args.game.now;
                console.log('client GAME START ' + this.gameStart);
                this.lastGameState = args.game.state;
            }
        }
    },
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
        var q = {};
        if (this.gameStart) {
            q.start = (new Date(this.gameStart)).toISOString()
        }
        Rest.getKills(q).then(function(args) {
            ErrorAction.clear();
            store.parseKills(args);
            store.trigger(store.leaderboard);
        }, rejected);
    }
});

module.exports = Kills;
