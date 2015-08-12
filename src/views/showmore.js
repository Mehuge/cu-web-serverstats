var React = require('react');
var Link = require('react-router').Link;

var ShowMore = React.createClass({
    render: function() {
        var link;
        switch(this.props.type) {
            case "detail":
                link = (<Link to="go" params={{ server: "hatchery", mode: "leaderboards" }}>Show Less</Link>);
                break;
            case "kills":
                link = (<Link to="go" params={{ server: "hatchery", mode: "kills" }}>Show More</Link>);
                break;
            case "deaths":
                link = (<Link to="go" params={{ server: "hatchery", mode: "deaths" }}>Show More</Link>);
                break;
        }
        return (
            <div className="row more disable-selection">{link}</div>
        );
    }
});

module.exports = ShowMore;
