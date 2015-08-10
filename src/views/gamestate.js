var React = require('react');

var GameState = React.createClass({
    render: function() {
        return(<div className="game-state">
                <span className="state">Game State: {this.props.state}</span>
                <span className="time">Time Remaining: {this.props.remain}</span>
                <span className="pop">Current Player Count: {this.props.count}</span>
                </div>
            );
    }
});

module.exports = GameState;
