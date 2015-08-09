var Rest = require('./lib/cu-rest.js');
var ServerStats = require('./serverstats.js');
var Score = require('./actions/score.js');
var Population = require('./actions/population.js');

// Render the UI
var app = new ServerStats(document.getElementById("server-stats-container"));
app.render();

Rest.selectServer("wyrmling");

function tick() {
    Score.fetchScore();
    Population.fetchPopulation();
}

setInterval(tick, 1000);
