var TypingGolf = {};

var React = require("react");
var Router = require("react-router");
var ReactDOM = require("react-dom");

module.exports = TypingGolf;

TypingGolf.Input = require('./input.jsx');
TypingGolf.Target= require('./target.jsx');
TypingGolf.Cheatsheet = require('./cheatsheet.jsx');

TypingGolf.App = React.createClass({
	mixins: [Router.State, Router.Navigation],
	getInitialState: function() {
		return {
			beginText: "Ala ma kota",
			selectionStart: 6,
			selectionEnd: 7,
			selectionDirection: "f",

			targetText: "Ala ma psa",
			targetSelectionStart: 6,
			targetSelectionEnd:6	,
			targetSelectionDirection: "b",

			counter: 0,
			showCheatsheet: false
		};
	},
	handleChange: function(event) {
		var eventDirection = ((event.target.selectionDirection).localeCompare("backward") == 0) ? "b" : "f";
 		var currentCounter = this.state.counter;

		if (event.target.value !== this.state.beginText ||
			event.target.selectionStart !== this.state.selectionStart ||
			event.target.selectionEnd !== this.state.selectionEnd ||
			eventDirection !== this.state.selectionDirection) {
			currentCounter += 1;
		}

		this.setState({
			beginText: event.target.value,
			selectionStart: event.target.selectionStart,
			selectionEnd: event.target.selectionEnd,
			selectionDirection: eventDirection,
			counter: currentCounter
		});
	},

	coverCheatsheet: function() {
		var new_value = (this.state.showCheatsheet == true) ? false : true;
		this.setState({
			showCheatsheet : new_value
		});
	},
	render: function() {
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
					showCheatsheet={this.state.showCheatsheet}
					increaseCounter={this.increaseCounter}/>

				<p className="end-text-details"> you've done {this.state.counter} steps</p>

				<TypingGolf.Target
					targetText={this.state.targetText}
					targetSelectionStart={this.state.targetSelectionStart}
					targetSelectionEnd={this.state.targetSelectionEnd}
					counter={this.state.counter}/>

				<TypingGolf.Cheatsheet
					showCheatsheet={this.state.showCheatsheet}
					coverCheatsheet={this.coverCheatsheet}/>

				<div className="cheatsheet-box" onClick={this.coverCheatsheet}>?</div>
			</div>
		)
	}
});
