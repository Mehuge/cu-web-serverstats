var React = require('react');
var Reflux = require('reflux');
var RouteStore = require('../stores/route.js');
var Link = require('react-router').Link;

var Filter = React.createClass({
    mixins: [
        Reflux.connect(RouteStore, 'route')
    ],
    getInitialState: function() {
        return { route: RouteStore.route };
    },
    render: function() {
        var opts = [];
        var filter = this.props.filter;
        var route = this.state.route;
        if (route && route.server) {
            for (var i = 0; i < filter.values.length; i++) {
                opts.push(<li><Link to="filter" params={{
                    server: route.server,
                    mode: route.mode,
                    filter: filter.key,
                    value: filter.values[i]
                }}>{filter.values[i]}</Link></li>)
            }
        }
        return (
            <ul className="filter">
            {opts}
            </ul>
        );
    }
});

module.exports = Filter;
