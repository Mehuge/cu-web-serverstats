var React = require('react');
var GameData = require('./gamedata.js');
var ServerStats = require('./serverstats.js');
var app = new ServerStats(document.getElementById("server-stats-container"));
app.render();
var game = new GameData("wyrmling");
game.state = undefined;
game.poll(function(e) {
    switch(e.type) {
        case "controlgame":
            var state = {
                state: e.data.gameState,
                countdown: e.data.timeLeft
            };
            // change of game state
            switch(e.data.gameState) {
                case -1: // unknown
                    state.type = "unknown";
                    break;
                case 0: // Inactive
                    state.type = "inactive";
                    break;
                case 1: // Waiting for players
                    state.type = "waiting";
                    break;
                case 2: // Basic game running
                    state.type = "basic";
                    break;
                case 3: // Basic game running
                    state.type = "advanced";
                    break;
            }
            if (game.state != e.data.gameState) {
                if (e.gameState == 2) {
                    // game is starting
                    app.update("gamestart");
                }
            }
            app.update("gamescore", {
                tick: state,
                arthurian: e.data.arthurianScore,
                tdd: e.data.tuathaDeDanannScore,
                viking: e.data.vikingScore
            });
            break;
        case "population":
            app.update("population", {
                arthurian: e.data.arthurians,
                tdd: e.data.tuathaDeDanann,
                viking: e.data.vikings
            });
            break;
    }
});
