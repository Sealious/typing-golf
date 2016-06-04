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
	getDefaultProps: function() { //it is here only for test resetTask function
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
			last:{},
			target: {
				text: "Ala ma psa",
				start: 2,
				end: 8,
				direction: "b"
			},
			counter: 0,
			showCheatsheet: false
		};
	},
	componentDidMount: function() {
		window.addEventListener('keyup', this.handleKeyboard)
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
			last: this.state.begin,
			begin: new_state,
			counter: currentCounter
		});
	},
	coverCheatsheet: function() {
		var new_value = (this.state.showCheatsheet == true) ? false : true;
		this.setState({ showCheatsheet : new_value });
	},
	handleKeyboard: function(event){
		if (event.keyCode === 27) {
			if (this.state.showCheatsheet == true) this.coverCheatsheet(); // this line doesn't work
			else this.resetTask();
		}
		if (event.keyCode === 112) {
			alert('function → generate new task')
		}

		if (event.keyCode === 113) {
			alert('function → ranking')
		}
	},
	resetTask: function() {
		this.setState({
			begin: this.props.begin,
			counter: 0
		})
		this.refs.input.selectText()
	},
	render: function() {
		return (
			<div>
				<div className="logo-item">
					<div className="logo animated flipInY">typing…·golf</div>
				</div>
				<div className="nav">
					<div className="nav-item">
						<a className="link" onClick={this.resetTask}>#reset current task [ESC] </a>
					</div>
					<div className="nav-item">
						<a className="link">#random new task [F1]</a>
					</div>
					<div className="nav-item">
						<a className="link">#ranking [F2]</a>
					</div>
				</div>

				<p className="end-text-details">Turn this</p>

				<TypingGolf.Input
					begin={this.state.begin}
					last={this.state.last}
					handleChange={this.handleChange}
					showCheatsheet={this.state.showCheatsheet}
					ref="input"/>

				<TypingGolf.Target
					target={this.state.target}/>

				<p className="end-text-details"> you've done {this.state.counter} steps</p>

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
