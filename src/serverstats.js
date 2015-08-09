
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

var KillsRow = React.createClass({
    render: function() {
        return (
            <div className={'row ' + this.props.rank}>
                <span>{this.props.rank}</span>
                <span>{this.props.name}</span>
                <span>{this.props.count}</span>
            </div>
        );
    }
});

var ShowMore = React.createClass({
    render: function() {
        return (
            <div className="row more">Show More</div>
        );
    }
})

var KillsHeading = React.createClass({
    render: function() {
        return (
            <div className="heading">
                <span>Rank</span><span>Name</span><span>{this.props.type}</span>
            </div>
        );
    }
});

var KillsTable = React.createClass({
    render: function() {
        var rows = [], data = this.props.data;
        for (var i = 0; i < data.length && i < 9; i++) {
            var entry = data[i];
            rows.push(<KillsRow rank={i+1} name={entry.name} count={entry.count}/>);
        }
        if (data.length > 9) {
            rows.push(<ShowMore/>);
        }
        return (
            <div className="table">{rows}</div>
        );
    }
});

var Leaderboard = React.createClass({
    render: function() {
        return (
            <div className="leaderboards">
                <div className="title">Leaderboards</div>
                <div className="board kills">
                    <KillsHeading type="Kills"/>
                    <KillsTable data={this.props.kills}/>
                </div>
                <div className="board deaths">
                    <KillsHeading type="Deaths"/>
                    <KillsTable data={this.props.deaths}/>
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
        Reflux.connect(KillsStore, 'leaderboard')
    ],
    getInitialState: function() {
        return {
            events: {},
            population: { tdd: 0, arthurian: 0, viking: 0 },
            score: {
                tdd: 0, arthurian: 0, viking: 0,
                tick: { countdown: 0 }
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
                <Leaderboard kills={this.state.leaderboard.kills} deaths={this.state.leaderboard.deaths}/>
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
