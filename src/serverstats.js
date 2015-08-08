
var React = require('react');
var Events = require('./events.js');

/* ********************************************************************** */

var GameState = React.createClass({
    render: function() {
        return(<div className="game-state"></div>);
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
            <div className="game-stats">
                <RealmScore realm="tdd" title="Tuatha De Denann" score={this.props.scores.tdd} players={this.props.population.tdd}/>
                <RealmScore realm="arthurian" title="Arthurians" score={this.props.scores.arthurian} players={this.props.population.arthurian}/>
                <RealmScore realm="viking" title="Vikings" score={this.props.scores.viking} players={this.props.population.viking}/>
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
    getInitialState: function() {
        return {
            events: {},
            scores: {
                arthurian: 0, tdd: 0, viking: 0
            },
            population: {
                arthurian: 0, tdd: 0, viking: 0
            },
            kills: [],
            deaths: []
        };
    },
    render: function() {
        return(
            <div className="server-stats">
                <GameState/>
            <GameStats scores={this.state.scores} population={this.state.population}/>
                <KillsBoard/>
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

obj.prototype.update = function(what, data) {
    switch(what) {
        case "gamestart":
            this.renderer.setState({
                scores: { arthurian: 0, tdd: 0, viking: 0 }
            });
            break;
        case "gamescore":
            this.renderer.setState({
                scores: {
                    arthurian: data.arthurian,
                    tdd: data.tdd,
                    viking: data.viking
                }
            });
            break;
        case "gameend":
            break;
        case "population":
            this.renderer.setState({
                population: {
                    arthurian: data.arthurian,
                    tdd: data.tdd,
                    viking: data.viking
                }
            });
            break;
        case "kills":
            this.renderer.setState({
                kills: data
            });
            break;
        case "deaths":
            this.renderer.setState({
                deaths: data
            });
            break;
    }
};

module.exports = obj;
