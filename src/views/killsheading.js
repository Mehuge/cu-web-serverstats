var React = require('react');

var KillsHeading = React.createClass({
    render: function() {
        var rest, cols = [], columns = this.props.columns;
        for (var i = 0; i < columns.length; i++) {
            var col = (<span className={columns[i].className} style={{ width: columns[i].width }}>{columns[i].title}</span>);
            cols.push(col);
        }
        return (
            <div className="heading">
                {cols}
            </div>
        );
    }
});

module.exports = KillsHeading;
