var React = require('react');

// Views
var KillsHeading = require('./killsheading.js');
var KillsTable = require('./killstable.js');

var Leaderboard = React.createClass({
    getInitialState: function() {
        return { full: false };
    },
    render: function() {
        var kills, deaths, mode;
        if (this.state.full !== 'deaths') {
            var mode = this.state.full ? 'full' : '';
            kills = (
                <div className={'board kills' + (this.state.full === 'kills' ? ' full' : '')}>
                    <KillsHeading mode={mode} type="Kills"/>
                    <KillsTable mode={mode} data={this.props.kills} toggleMore={this.toggleMoreKills}/>
                </div>
            );
        }
        if (this.state.full !== 'kills') {
            var mode = this.state.full ? 'full' : '';
            deaths = (
                <div className={'board deaths' + (this.state.full === 'deaths' ? ' full' : '')}>
                    <KillsHeading mode={mode} type="Deaths"/>
                    <KillsTable mode={mode} data={this.props.deaths} toggleMore={this.toggleMoreDeaths}/>
                </div>
            );
        }
        return (
            <div className="leaderboards">
                <div className="title">Leaderboards</div>
                {kills}
                {deaths}
            </div>
        );
    },

    toggleMoreKills: function() {
        this.toggleMore('kills');
    },

    toggleMoreDeaths: function() {
        this.toggleMore('deaths');
    },

    toggleMore: function(what) {
        if (this.state.full) {
            this.setState({ full: false });
        } else {
            this.setState({ full: what });
        }
    }

});

module.exports = Leaderboard;
