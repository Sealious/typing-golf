var React = require('react');
var PropTypes = React.PropTypes;

var SolutionStep = React.createClass({
    render: function() {
        return (
            <kbd className="key"> {this.props.step} </kbd>
        );
    }
});
module.exports = SolutionStep;
