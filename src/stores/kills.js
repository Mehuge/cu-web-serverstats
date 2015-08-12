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
                KillsAction.fetchKills();
            } else if (args.game.state > 1) {
                // already started, guestimate the game start time
                this.gameStart = args.game.now - (((1800 - args.game.countdown)|0)*1000);
                console.log('client GAME START ' + this.gameStart);
                this.lastGameState = args.game.state;
                KillsAction.fetchKills();
            }
        }
    },

    // Parse the data from the kills API which is a chronological list of kills
    // since a point in time.  Group the kill details into kills and deaths for
    // each player.  From that, build a list of people with kills, and those with
    // deaths including a count of how many, then sort into ranked order.
    //
    //  leaderboard: {
    //      kills: [
    //          name: "Player Name",
    //          count: 10, // kill count
    //          info: [
    //              killdata, ...       // kill data (kills API record)
    //          ]
    //      ],
    //      deaths: [
    //          name: "Player Name",
    //          count: 10, // death count
    //          info: [
    //              deathdata, ...       // death data (kills API record)
    //          ]
    //      ]
    //  }
    //
    parseKills: function(kills) {
        var players = {};

        // count kills and deaths per player
        for (var i = 0; i < kills.length; i++) {
            var k = kills[i].killer, v = kills[i].victim;
            if (k.id !== v.id) {        // ignore suicides
                (players[k.name] = players[k.name] || { player: k, kills: [], deaths: [] }).kills.push(kills[i]);
                (players[v.name] = players[v.name] || { player: v, kills: [], deaths: [] }).deaths.push(kills[i]);
            }
        }

        var leaderboard = this.leaderboard = {
            kills: [], deaths: []
        };

        // split players into kills and deaths tables
        for (var name in players) {
            if (players[name].kills.length) {
                leaderboard.kills.push({
                    name: name,
                    count: players[name].kills.length,
                    info: players[name]
                });
            }
            if (players[name].deaths.length) {
                leaderboard.deaths.push({
                    name: name,
                    count: players[name].deaths.length,
                    info: players[name]
                });
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
            q.start = (new Date(this.gameStart)).toISOString();
        }
        Rest.getKills(q).then(function(args) {
            ErrorAction.clear();
            store.parseKills(args);
            store.trigger(store.leaderboard);
        }, rejected);
    }
});

module.exports = Kills;
