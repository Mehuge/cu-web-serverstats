var React = require('react');

var KillsHeading = React.createClass({
    render: function() {
        return (
            <div className="heading">
                <span>Rank</span><span>Name</span><span>{this.props.type}</span>
            </div>
        );
    }
});

module.exports = KillsHeading;
