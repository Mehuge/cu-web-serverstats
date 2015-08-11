var React = require('react');
var Rest = require('./lib/cu-rest.js');
var ServerStats = require('./views/serverstats.js');
var Score = require('./actions/score.js');
var Population = require('./actions/population.js');
var Kills = require('./actions/kills.js');

var App = function(params) {
    this.container = params.container;
    this.server = params.server;
    return this;
};

App.prototype.render = function() {
    this.renderer = React.render(<ServerStats/>,this.container);
};

App.prototype.run = function() {

    // Render UI
    this.render();

    // Select server
    Rest.selectServer(this.server);

    // What to do every tick
    function tick() {
        Score.fetchScore();
        Population.fetchPopulation();
    }

    // What to do every slow tick
    function slowtick() {
        Kills.fetchKills();
    }

    // Start ticks
    tick(); setInterval(tick, 1000);
    setInterval(slowtick, 10000);
};

module.exports = App;
