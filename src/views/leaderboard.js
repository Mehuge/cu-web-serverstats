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
    "detail": [
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

        function makeTable(type, mode, data) {
            var layout = mode === 'leaderboards' ? type : 'detail';
            return (
                <div className={'board ' + type + (mode === 'kills' ? ' detail' : ' summary')}>
                    <KillsHeading columns={columns[layout]}/>
                    <KillsTable type={layout} columns={columns[layout]} data={data} />
                </div>
            );
        }

        // mode is either kills (detail) deaths (detail) or leaderboards (summaries)
        var kills, deaths, mode = this.props.mode;
        if (mode !== 'deaths') {        // kills or leaderboards
            kills = makeTable('kills', mode, this.props.kills);
        }
        if (mode !== 'kills') {
            deaths = makeTable('deaths', mode, this.props.deaths);
        }

        return (
            <div className="leaderboards">
                <div style={{ color: 'white' }}>DEBUG: mode={mode}</div>
                <div className="title">{this.state.title}</div>
                {kills}
                {deaths}
            </div>
        );
    }

});

module.exports = Leaderboard;
