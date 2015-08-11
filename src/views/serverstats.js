var React = require('react');
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;
var Rest = require('../lib/cu-rest.js');

// Datastores
var ScoreStore = require('../stores/score.js');
var PopulationStore = require('../stores/population.js');
var KillsStore = require('../stores/kills.js');
var ErrorStore = require('../stores/error.js');

// Views
var GameState = require('./gamestate.js');
var GameStats = require('./gamestats.js');
var Leaderboard = require('./leaderboard.js');

var ServerStats = React.createClass({
    mixins: [
        Reflux.connect(ScoreStore, 'score'),
        Reflux.connect(PopulationStore, 'population'),
        Reflux.connect(ErrorStore, 'error'),
        Reflux.connect(KillsStore, 'leaderboard')
    ],
    getInitialState: function() {
        return {
            mode: "leaderboards",
            events: {},
            population: { tdd: 0, arthurian: 0, viking: 0 },
            score: {
                tdd: 0, arthurian: 0, viking: 0,
                game: { countdown: 0 }
            },
            leaderboard: {
                kills: [],
                deaths: []
            }
        };
    },
    getGameStateText: function() {
        if (this.state.error) {
            switch (this.state.error) {
                case "timeout": return "Offline";
                default: return this.state.error;
            }
        }
        var game = this.state.score.game;
        if (game) {
            switch(game.type) {
                case "inactive":
                    return 'Game is Inactive';
                case "waiting":
                    return 'Waiting for Next Round';
                case "basic": case "advanced":
                    return 'Round In Progress';
            }
        }
        return "";
    },
    componentDidMount: function () {
        if (this.props.params) {
            console.log('select server ' + this.props.params.server);
            Rest.selectServer(this.props.params.server);
            var mode = this.props.params.mode || "leaderboards";
            console.log('set mode from route ' + mode);
            this.setState({ mode: mode });
        }
    },
    render: function() {
        var state = this.state,
            population = state.population,
            game = state.score.game,
            count = population.arthurian + population.tdd + population.viking,
            remain = game.countdown|0;
        remain = ((remain/60)|0) + ' min. ' + (remain%60) + ' sec.';
        console.log('ServerStats mode is ' + state.mode);
        return(
            <div className="server-stats">
                <GameState state={this.getGameStateText()} remain={remain} count={count}/>
                <GameStats score={this.state.score} population={this.state.population}/>
                <Leaderboard mode={this.state.mode} kills={this.state.leaderboard.kills} deaths={this.state.leaderboard.deaths}/>
                <RouteHandler/>
            </div>
        );
    }
});

module.exports = ServerStats;
