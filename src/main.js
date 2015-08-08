(function() {
    var React = require('react');

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
                    <RealmScore realm="tdd" title="Tuatha De Denann" score="12030" players="94"/>
                    <RealmScore realm="arthurian" title="Arthurians" score="12030" players="26"/>
                    <RealmScore realm="viking" title="Vikings" score="12030" players="26"/>
                </div>
            );
        }
    });

    /* ********************************************************************** */

    var KillsBoard = React.createClass({
        render: function() {
            return (
                <div className="kills-board">
                </div>
            );
        }
    })

    /* ********************************************************************** */

    var ServerStats = React.createClass({
        render: function() {
            return(
                <div className="server-stats">
                    <GameState/>
                    <GameStats/>
                    <KillsBoard/>
                </div>
            );
        }
    })

    React.render(<ServerStats/>,document.getElementById("server-stats-container"));

})();
