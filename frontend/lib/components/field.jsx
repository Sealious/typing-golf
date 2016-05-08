var React = require('react');
var ReactDOM = require("react-dom");

var Field = React.createClass({
	componentDidMount: function() {
		this.selectText();
	},
	selectText: function(){
		this.refs.input.focus();
		var direction;
		if (this.props.selectionStart <= this.props.selectionEnd) direction = "forward"
		else direction = "backward"
		this.refs.input.setSelectionRange(this.props.selectionStart, this.props.selectionEnd, direction);
	},
	render: function() {
		return (
			<div>
				<input 
					className="input" 
					type="text" 
					value={this.props.text} 
					onChange={this.props.handleChange}
					onSelect={this.props.handleChange}
					ref="input" />
			</div>
		);
	}
});

module.exports = Field;
