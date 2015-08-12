var React = require('react');
var Rest = require('./lib/cu-rest.js');
var ServerStats = require('./views/serverstats.js');
var Score = require('./actions/score.js');
var Population = require('./actions/population.js');
var Kills = require('./actions/kills.js');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
    <Route handler={ServerStats} path="/">
        <DefaultRoute handler={ServerStats}/>
        <Route name="go" path="/:server/:mode" handler={ServerStats} />
        <Route name="server" path="/:server" handler={ServerStats} />
    </Route>
);

var App = function(params) {
    this.container = params.container;
    return this;
};

App.prototype.render = function() {
    var container = this.container;
    Router.run(routes, Router.HashLocation, function(Root, state) {
        state.params.server = state.params.server || "hatchery";
        state.params.mode = state.params.mode || "leaderboards";
        React.render(<Root params={state.params}/>, container);
    });
};

App.prototype.run = function() {

    // Render UI
    this.render();

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
    tick(); setInterval(tick, 5000);    // temp slow down while testing
    slowtick(); setInterval(slowtick, 10000);
};

module.exports = App;
