var React = require('react');

var KillsRow = React.createClass({
    render: function() {
        var rest, cols = [], columns = this.props.columns;
        if (columns) {
            for (var i = 0; i < columns.length; i++) {
                var value;
                switch(columns[i].title) {
                    case "Rank": value = this.props.rank; break;
                    case "Name": value = this.props.name; break;
                    case "Realm": value = this.props.info.player.faction; break;
                    case "Race": value = this.props.info.player.race; break;
                    case "Arch.":
                        value = this.props.info.player.archetype;
                        break;
                    case "Kills": value = this.props.info.kills.length; break;
                    case "Deaths": value = this.props.info.deaths.length; break;
                    case "KDR":
                        var kills = this.props.info.kills, deaths = this.props.info.deaths;
                        value = deaths.length ? (kills.length/deaths.length).toFixed(2) : kills.length;
                        break;
                }
                var col = (<span className={columns[i].className} style={{ width: columns[i].width }}>{value}</span>);
                cols.push(col);
            }
        }
        return (
            <div className={'row ' + this.props.rank}>
                {cols}
            </div>
        );
    }
});

module.exports = KillsRow;
