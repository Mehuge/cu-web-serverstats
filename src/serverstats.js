
var React = require('react');
var Reflux = require('reflux');
var ScoreStore = require('./stores/score.js');
var PopulationStore = require('./stores/population.js');
var KillsStore = require('./stores/kills.js');
var ErrorStore = require('./stores/error.js');

/* ********************************************************************** */

var GameState = React.createClass({
    render: function() {
        return(<div className="game-state">
                <span className="state">Game State: {this.props.state}</span>
                <span className="time">Time Remaining: {this.props.remain}</span>
                <span className="pop">Current Player Count: {this.props.count}</span>
                </div>
            );
    }
})

/* ********************************************************************** */

var RealmBackground = React.createClass({
    render: function() {
        return(<div className="score-bg"></div>);
    }
});

var RealmPoints = React.createClass({
    render: function() {
        return (
            <div>
            <div className="label">Score</div>
            <div className="points">{this.props.score}</div>
            </div>
        );
    }
});

var RealmTitle = React.createClass({
    render: function() {
        return (<div className="title">{this.props.title}</div>);
    }
});

var RealmPlayers = React.createClass({
    render: function() {
        return (<div className="players">{this.props.players} players</div>);
    }
});

var RealmScore = React.createClass({
    render: function() {
        return(
            <div className={"realm-score " + this.props.realm}>
                <RealmBackground realm={this.props.realm}/>
                <RealmTitle title={this.props.title}/>
                <RealmPoints score={this.props.score}/>
                <RealmPlayers players={this.props.players}/>
            </div>
        );
    }
});

var GameStats = React.createClass({
    render: function() {
        return (
            <div className="realm-scores">
                <RealmScore realm="tdd" title="Tuatha De Danann" score={this.props.score.tdd} players={this.props.population.tdd}/>
                <RealmScore realm="arthurian" title="Arthurians" score={this.props.score.arthurian} players={this.props.population.arthurian}/>
                <RealmScore realm="viking" title="Vikings" score={this.props.score.viking} players={this.props.population.viking}/>
            </div>
        );
    }
});

/* ********************************************************************** */

var KillsBoard = React.createClass({
    render: function() {
        return (
            <div className="kills-board">
                <div className="title">Leaderboards</div>
                <div className="kills">
                    <div className="heading">
                        <span>Rank</span>
                        <span>Name</span>
                        <span>Kills</span>
                    </div>
                    <div className="table">
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                    </div>
                </div>
                <div className="deaths">
                    <div className="heading">
                        <span>Rank</span>
                        <span>Name</span>
                        <span>Kills</span>
                    </div>
                    <div className="table">
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                        <div className="row">
                            <span>1</span>
                            <span>Mehuge</span>
                            <span>99999</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})

/* ********************************************************************** */
var ServerStats = React.createClass({
    mixins: [
        Reflux.connect(ScoreStore, 'score'),
        Reflux.connect(PopulationStore, 'population'),
        Reflux.connect(ErrorStore, 'error'),
        Reflux.connect(KillsStore, 'kills')
    ],
    getInitialState: function() {
        return {
            events: {},
            population: { tdd: 0, arthurian: 0, viking: 0 },
            score: {
                tdd: 0, arthurian: 0, viking: 0,
                tick: { countdown: 0 }
            }
        };
    },
    getGameStateText: function() {
        if (this.state.error) {
            switch (this.state.error) {
                case "timeout": return "Server is Offline";
                default: return this.state.error;
            }
        }
        var tick = this.state.score.tick;
        if (tick) {
            switch(tick.type) {
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
    render: function() {
        var state = this.state,
            population = state.population,
            tick = state.score.tick,
            count = population.arthurian
                    + population.tdd
                    + population.viking,
            remain = tick.countdown|0;
        remain = ((remain/60)|0) + ' min. ' + (remain%60) + ' sec.';
        return(
            <div className="server-stats">
                <GameState state={this.getGameStateText()} remain={remain} count={count}/>
            <GameStats score={this.state.score} population={this.state.population}/>
                <KillsBoard kills={this.state.kills} deaths={this.state.deaths}/>
            </div>
        );
    }
});

var obj = function(container) {
    this.container = container;
    return this;
};

obj.prototype.render = function() {
    this.renderer = React.render(<ServerStats/>,this.container);
};

module.exports = obj;
