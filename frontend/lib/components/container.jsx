var React = require('react');
var ReactRouter = require('react-router')

var Container = React.createClass({
	render: function() {
		return (
			<div className="Container">
				{this.props.children}
			</div>
		);
	}
});

module.exports = Container;
