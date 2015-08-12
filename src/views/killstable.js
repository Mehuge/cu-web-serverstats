var React = require('react');

// Views
var KillsRow = require('./killsrow.js');
var ShowMore = require('./showmore.js');


var KillsTable = React.createClass({
    render: function() {
        var rows = [], data = this.props.data;
        for (var i = 0; i < data.length && i < 9; i++) {
            var entry = data[i];
            rows.push(<KillsRow columns={this.props.columns} rank={i+1} name={entry.name} count={entry.count} info={entry.info}/>);
        }
        for (/* no-op */; i < 9; i++) {
            rows.push(<KillsRow/>);
        }
        rows.push(<ShowMore type={this.props.type}/>);
        return (<div className="table">{rows}</div>);
    }
});

module.exports = KillsTable;
