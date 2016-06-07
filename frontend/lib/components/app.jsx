var TypingGolf = {};

var React = require("react");
var Router = require("react-router");
var ReactDOM = require("react-dom");
var solver = require('../../../common/solver.js');

module.exports = TypingGolf;

TypingGolf.Container = require('./container.jsx');
TypingGolf.TaskView = require('./task-view.jsx');
TypingGolf.SolutionStep = require('./solution-step.jsx');
TypingGolf.Input = require('./input.jsx');
TypingGolf.Target = require('./target.jsx');
TypingGolf.Cheatsheet = require('./cheatsheet.jsx');
TypingGolf.Form = require('./form.jsx');
TypingGolf.NewTask = require('./new-task.jsx');

TypingGolf.App = React.createClass({
	mixins: [Router.State, Router.Navigation],
	getDefaultProps: function() { //it is here only for test resetTask function
		return {
			begin:{
				text: "ala ma kota",
				start: 7,
				end: 7,
				direction: "f"
			}
		};
	},
	getInitialState: function() {
		return {
			begin:{
				text: "ala ma kota",
				start: 7,
				end: 7,
				direction: "f"
			},
			last:{},
			target: {
				text: "ala ma koty",
				start: 11,
				end: 11,
				direction: "f"
			},
			solution:[],
			resolved: false,
			counter: 0,
			showCheatsheet: false
		};
	},
	componentDidMount: function() {
		window.addEventListener('keyup', this.handleKeyboard)

		window.setTimeout(function(){
			var steps = solver(this.state.begin, this.state.target)
			this.setState({
				solution: steps
			})
		}.bind(this),1000)

	},
	componentDidUpdate: function(prevProps, prevState) {
		if (this.state.begin.text === this.state.target.text) {
			if (this.state.resolved === false) {
				this.setState({
					resolved: true
				})
				alert('Brawo! [ENTER]')
			}
		}
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
		event.preventDefault();
		if (event.keyCode === 27) {
			if (this.state.showCheatsheet == true) this.coverCheatsheet();
			else this.resetTask();
		}
		if (event.keyCode === 113) {
			alert('function → generate new task')
		}

		if (event.keyCode === 115) {
			alert('function → ranking')
		}
	},
	resetTask: function() {
		this.setState({
			begin: this.props.begin,
			counter: 0,
			resolved: false
		})
		this.refs.input.selectText(this.state.begin)
	},
	render: function() {
		return (
			<div>
				<div className="logo-item">
					<div className="logo animated flipInX">typing…·golf</div>
				</div>
				<div className="nav">
					<div className="nav-item">
						<a className="link" onClick={this.resetTask}>#reset current task [ESC] </a>
					</div>
					<div className="nav-item">
						<a className="link">#random new task [F2]</a>
					</div>
					<div className="nav-item">
						<a className="link">#ranking [F4]</a>
					</div>
				</div>
				<div>
					<p className="end-text-details">Turn this ⤵</p>

					<TypingGolf.Input
						begin={this.state.begin}
						last={this.state.last}
						handleChange={this.handleChange}
						showCheatsheet={this.state.showCheatsheet}
						ref="input"/>

					<TypingGolf.Target
						target={this.state.target}
						solution={this.state.solution}/>

					<p className="end-text-details">You've done {this.state.counter} steps</p>

					<TypingGolf.Cheatsheet
						showCheatsheet={this.state.showCheatsheet}
						coverCheatsheet={this.coverCheatsheet}/>

					<div
						className="cheatsheet-box"
						onClick={this.coverCheatsheet}>?</div>
				</div>
				{this.props.children}
			</div>
		)
	}
});
