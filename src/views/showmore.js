var React = require('react');

var ShowMore = React.createClass({
    render: function() {
        var text = this.props.mode === 'full' ? 'Show Less' : 'Show More';
        return (
            <div className="row more disable-selection" onClick={this.props.onClick}>{text}</div>
        );
    }
});

module.exports = ShowMore;
