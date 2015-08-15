var React = require('react');
var Filter = require('./filter.js');

var KillsHeading = React.createClass({
    getInitialState: function() {
        return { clicked: false };
    },
    render: function() {
        var filter = this.props.filter;
        var element, hasFilter = '', className = [];
        if (filter && filter.key && filter.values.length) {
            if (this.state.clicked) {
                element = (<Filter filter={filter}/>);
            }
            className.push('has-filter');
        }
        if (this.props.className) {
            className.push(this.props.className);
        }
        return (
            <span className={className.join(' ')} style={{ width: this.props.width }} onClick={this.onclick}>
                {this.props.title}
                {element}
            </span>
        );
    },

    onclick: function() {
        if (this.props.filter) {
            this.setState({ clicked: !this.state.clicked });
        }
    }
});

module.exports = KillsHeading;
