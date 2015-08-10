var React = require('react');

// Views
var KillsHeading = require('./killsheading.js');
var KillsTable = require('./killstable.js');

var columns = {
    "kills": [
        { title: "Rank", width: 70, className: "rank" },
        { title: "Name", width: 310 },
        { title: "Kills", width: 100, className: "count" }
    ],
    "deaths": [
        { title: "Rank", width: 70, className: "rank" },
        { title: "Name", width: 310 },
        { title: "Deaths", width: 100, className: "count" }
    ],
    "full": [
        { title: "Rank", width: 70, className: "rank" },
        { title: "Name", width: 310 },
        { title: "Realm", width: 100 },
        { title: "Race", width: 100 },
        { title: "Arch.", width: 100 },
        { title: "Kills", width: 80, className: "count" },
        { title: "Deaths", width: 80, className: "count" },
        { title: "KDR", width: 80, className: "number" }
    ]
};

var Leaderboard = React.createClass({
    getInitialState: function() {
        return { full: false, title: "Leaderboards" };
    },
    render: function() {
        var kills, deaths, mode;
        if (this.state.full !== 'deaths') {
            var mode = this.state.full ? 'full' : 'kills';
            kills = (
                <div className={'board kills' + (this.state.full === 'kills' ? ' full' : '')}>
                    <KillsHeading mode={mode} columns={columns[mode]}/>
                    <KillsTable mode={mode} columns={columns[mode]} data={this.props.kills} toggleMore={this.toggleMoreKills}/>
                </div>
            );
        }
        if (this.state.full !== 'kills') {
            var mode = this.state.full ? 'full' : 'deaths';
            deaths = (
                <div className={'board deaths' + (this.state.full === 'deaths' ? ' full' : '')}>
                    <KillsHeading mode={mode}  columns={columns[mode]}/>
                    <KillsTable mode={mode} columns={columns[mode]} data={this.props.deaths} toggleMore={this.toggleMoreDeaths}/>
                </div>
            );
        }
        return (
            <div className="leaderboards">
                <div className="title">{this.state.title}</div>
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
            this.setState({ full: false, title: "Leaderboards" });
        } else {
            this.setState({ full: what, title: what === "kills" ? "Top Killers" : "Most Killed" });
        }
    }

});

module.exports = Leaderboard;
