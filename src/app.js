var React = require('react');
var Rest = require('./lib/cu-rest.js');
var ServerStats = require('./views/serverstats.js');
var Score = require('./actions/score.js');
var Population = require('./actions/population.js');
var Kills = require('./actions/kills.js');

var App = function(container) {
    this.container = container;
    return this;
};

App.prototype.render = function() {
    this.renderer = React.render(<ServerStats/>,this.container);
};

App.prototype.run = function() {

    debugger;
    
    // Render UI
    this.render();

    // Select server
    Rest.selectServer("hatchery");

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
    slowtick(); setInterval(slowtick, 10000);
};

module.exports = App;
