var React = require('react');

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

module.exports = KillsRow;
