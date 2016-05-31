var React = require('react');
var ReactDOM = require("react-dom");

var Input = React.createClass({
	componentDidMount: function() {
		this.selectText();
	},
	selectText: function(with_focus){
		this.refs.input.focus()
		var direction;
		if (this.props.selectionStart <= this.props.selectionEnd) direction = "forward"
		else direction = "backward"
		this.refs.input.setSelectionRange(this.props.selectionStart, this.props.selectionEnd, direction);
	},
	alertOnMouse: function() {
		// if (!this.props.showCheatsheet)	alert('Nie oszukuj :)')
	},
	render: function() {
		return (
			<div>
				<textarea
					className="input"
					type="text"
					value={this.props.beginText}
					onChange={this.props.handleChange}
					onSelect={this.props.handleChange}
					onFocus={this.selectText}
					onClick={this.alertOnMouse}
					ref="input" />
			</div>
		);
	}
});

module.exports = Input;
