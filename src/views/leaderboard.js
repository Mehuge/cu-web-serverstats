var React = require('react');

// Views
var KillsHeading = require('./killsheading.js');
var KillsTable = require('./killstable.js');

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
});

module.exports = Leaderboard;
