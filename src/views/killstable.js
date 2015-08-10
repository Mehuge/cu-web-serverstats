var React = require('react');

// Views
var KillsRow = require('./killsrow.js');
var ShowMore = require('./showmore.js');

var KillsTable = React.createClass({
    render: function() {
        var rows = [], data = this.props.data;
        for (var i = 0; i < data.length && i < 9; i++) {
            var entry = data[i];
            rows.push(<KillsRow rank={i+1} name={entry.name} count={entry.count}/>);
        }
        for (/* no-op */; i < 9; i++) {
            rows.push(<KillsRow/>);
        }
        rows.push(<ShowMore onClick={this.toggleMore} mode={this.props.mode}/>);
        return (
            <div className="table">{rows}</div>
        );
    },
    toggleMore: function() {
        this.props.toggleMore();
    }
});

module.exports = KillsTable;
