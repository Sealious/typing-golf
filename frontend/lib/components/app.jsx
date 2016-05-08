var Example = {};

var React = require("react");
var Router = require("react-router");
module.exports = Example;

Example.Field = require('./field.jsx');

Example.App = React.createClass({
	mixins: [Router.State, Router.Navigation],
	// componentDidMount: function() {
	// 	var self = this;
	// },
	getInitialState: function() {
		return {
			text: "Ala ma kota",
			selectionStart: 3,
			selectionEnd: 7
		};
	},
	handleChange: function(event) {
		this.setState({
			text: event.target.value, 
			selectionStart: event.target.selectionStart, 
			selectionEnd: event.target.selectionEnd
		});
	},
	render: function() {
		return (
			<div>
				"text": {this.state.text}<br/>
				"start": {this.state.selectionStart}<br/>
				"end": {this.state.selectionEnd}<br/>
				<Example.Field
					text={this.state.text}
					selectionStart={this.state.selectionStart}
					selectionEnd={this.state.selectionEnd}
					handleChange={this.handleChange}/>
			</div>
		)
	}
});
