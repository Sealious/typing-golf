var React = require('react');
var ReactDOM = require("react-dom");

var Field = React.createClass({
	componentDidMount: function() {
		this.selectText();
	},
	selectText: function(){
		this.refs.input.focus();

		var direction;
		if (this.props.selectionStart < this.props.selectionEnd) {
			direction = "forward"
		} else {
			direction = "backward"
		}
		
		this.refs.input.setSelectionRange(this.props.selectionStart, this.props.selectionEnd, direction);
		console.log(this.refs.input)
		console.log(this.refs.input.selectionStart)
		console.log(this.refs.input.selectionEnd)

	},
	render: function() {
		return (
			<div>
				{this.props.text}
				{this.props.selectionStart}
				{this.props.selectionEnd}

				<input 
					className="input" 
					type="text" 
					value={this.props.text} 
					onChange={this.props.handleChange}
					ref="input" />

			</div>
		);
	}
});

module.exports = Field;
