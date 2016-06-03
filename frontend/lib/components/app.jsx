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
	getDefaultProps: function() {
		//only for test reset function
		return {
			begin:{
				text: "Ala ma kota",
				start: 3,
				end: 5,
				direction: "f"
			}
		};
	},
	getInitialState: function() {
		return {
			begin:{
				text: "Ala ma kota",
				start: 3,
				end: 5,
				direction: "f"
			},
			target: {
				text: "Ala ma psa",
				start: 2,
				end: 8,
				direction: "b"
			},
			counter: 0,
			showCheatsheet: false,
			showModal: true
		};
	},
	handleChange: function(event) {
		var eventDirection = ((event.target.selectionDirection).localeCompare("backward") == 0) ? "b" : "f";
		var currentCounter = this.state.counter;

		if (event.target.value !== this.state.begin.text ||
			event.target.selectionStart !== this.state.begin.start ||
			event.target.selectionEnd !== this.state.begin.end ||
			eventDirection !== this.state.begin.direction) {
				currentCounter += 1;
			}

		var new_state = {
			text: event.target.value,
			start: event.target.selectionStart,
			end: event.target.selectionEnd,
			direction: eventDirection
		}

		this.setState({
			begin: new_state,
			counter: currentCounter
		});
	},
	coverCheatsheet: function() {
		var new_value = (this.state.showCheatsheet == true) ? false : true;
		this.setState({
			showCheatsheet : new_value
		});
	},
	resetTask: function() {
		this.setState({
			begin: this.props.begin,
			counter: 0
		})
	},
	render: function() {
		return (
			<div>
				<div className="nav">
					<div className="logo-item">
						<div className="logo animated flipInY">typing…·golf</div>
					</div>
					<div className="nav-item">
						<a className="link" onClick={this.resetTask}>random task </a>
					</div>
					<div className="nav-item">
						<a className="link">ranking</a>
					</div>
				</div>

				<TypingGolf.Input
					begin={this.state.begin}
					handleChange={this.handleChange}
					showCheatsheet={this.state.showCheatsheet}/>

				<p className="end-text-details"> you've done {this.state.counter} steps</p>

				<TypingGolf.Target
					target={this.state.target}/>

				<TypingGolf.Cheatsheet
					showCheatsheet={this.state.showCheatsheet}
					coverCheatsheet={this.coverCheatsheet}/>

				<div
					className="cheatsheet-box"
					onClick={this.coverCheatsheet}>?</div>
			</div>
		)
	}
});
