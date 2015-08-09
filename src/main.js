var Rest = require('./lib/cu-rest.js');
var ServerStats = require('./serverstats.js');
var Score = require('./actions/score.js');
var Population = require('./actions/population.js');
var Kills = require('./actions/kills.js');

// Render the UI
var app = new ServerStats(document.getElementById("server-stats-container"));
app.render();

Rest.selectServer("hatchery");

function tick() {
    Score.fetchScore();
    Population.fetchPopulation();
    // Kills.fetchKills();
}

setInterval(tick, 1000);
