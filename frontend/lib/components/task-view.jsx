var React = require('react');
var PropTypes = React.PropTypes;

var TaskView = React.createClass({
    componentDidMount: function() {
        console.log('mount taskview')
    },
    render: function() {
        return (
            <div>Task View</div>
        );
    }

});

module.exports = TaskView;
