var TypingGolf = {};

var React = require("react");
var Router = require("react-router");
var ReactDOM = require("react-dom");

module.exports = TypingGolf;

TypingGolf.Input = require('./field.jsx');
TypingGolf.Target= require('./target.jsx');
TypingGolf.Cheatsheet = require('./cheatsheet.jsx');

TypingGolf.App = React.createClass({
	mixins: [Router.State, Router.Navigation],
	// componentDidMount: function() {
	// 	var self = this;
	// },
	getInitialState: function() {
		return {
			beginText: "Ala ma foka",
			targetText: "Ala ma kota",
			selectionStart: 3,
			selectionEnd: 7,
			showCheatsheet: true
		};
	},
	handleChange: function(event) {
		var eventDirection = ((event.target.selectionDirection).localeCompare("backward") == 0) ? "b" : "f";
		this.setState({
			beginText: event.target.value,
			selectionStart: event.target.selectionStart,
			selectionEnd: event.target.selectionEnd,
			direction: eventDirection
		});
	},
	coverCheatsheet: function() {
		var new_value = (this.state.showCheatsheet == true) ? false : true;
		this.setState({
			showCheatsheet : new_value
		});
	},
	render: function() {
		console.log('---')
		console.log('this.state.beginText', this.state.beginText);
		console.log('this.state.targetText', this.state.targetText);
		console.log('this.state.selectionStart', this.state.selectionStart);
		console.log('this.state.selectionEnd', this.state.selectionEnd);
		return (
			<div>
				<div className="nav">
					<div className="logo-item">
						<div className="logo animated flipInY">typing…·golf</div>
					</div>
					<div className="nav-item">
						<a className="link">random task </a>
					</div>
					<div className="nav-item">
						<a className="link">ranking</a>
					</div>
				</div>

				<TypingGolf.Input
					beginText={this.state.beginText}
					selectionStart={this.state.selectionStart}
					selectionEnd={this.state.selectionEnd}
					handleChange={this.handleChange}
					showCheatsheet={this.state.showCheatsheet}/>

				<TypingGolf.Target
					targetText={this.state.targetText}/>

				<TypingGolf.Cheatsheet
					showCheatsheet={this.state.showCheatsheet}
					coverCheatsheet={this.coverCheatsheet}/>

				<div className="cheatsheet-box" onClick={this.coverCheatsheet}>?</div>
			</div>
		)
	}
});
