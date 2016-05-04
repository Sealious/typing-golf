var Example = {};

var React = require("react");
var Router = require("react-router");


module.exports = Example;

// Example.Work = require('./work.jsx');
Example.Field = require('./field.jsx');

Example.App = React.createClass({
	mixins: [Router.State, Router.Navigation],
	componentDidMount: function() {
		var self = this;
	},
	getInitialState: function() {
		return {
			text: "Ala ma kota",
			selectionStart: 3,
			selectionEnd: 7
		};
	},
	handleChange: function(event) {
		this.setState({text: event.target.value});
	},

	render: function() {

		return (
			<div>
				<strong>It works</strong>
				<Example.Field
					text={this.state.text}
					selectionStart={this.state.selectionStart}
					selectionEnd={this.state.selectionEnd}
					handleChange={this.handleChange}/>

			</div>
		)
	}
});
