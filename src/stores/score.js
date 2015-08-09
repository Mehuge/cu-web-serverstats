var Rest = require('../lib/cu-rest.js');
var Reflux = require('reflux');
var ScoreAction = require('../actions/score.js');
var ErrorAction = require('../actions/error.js');

var GameState = {};
GameState[-1] = "unknown";
GameState[0] = "inactive";
GameState[1] = "waiting";
GameState[2] = "basic";
GameState[3] = "advanced";

var Score = Reflux.createStore({
    listenables: [ ScoreAction ],
    fetchScore: function() {
        var store = this;
        function rejected(e) {
            ErrorAction.fire(e);
        }
        Rest.getControlGame({ includeControlPoints: false }).then(function(args) {
            ErrorAction.clear();
            store.gameData = {
                game: {
                    now: Date.now(),
                    type: GameState[args.gameState],
                    state: args.gameState,
                    countdown: args.timeLeft
                },
                arthurian: args.arthurianScore,
                tdd: args.tuathaDeDanannScore,
                viking: args.vikingScore
            };
            store.trigger(store.gameData);
        }, rejected);
    }
});

module.exports = Score;
