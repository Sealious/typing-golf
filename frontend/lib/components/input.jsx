var React = require('react');
var PropTypes = React.PropTypes;

var Input = React.createClass({
	componentDidMount: function() {
		this.selectText();
	},
	selectText: function(){
		this.refs.input.focus()
		var direction;
		if (this.props.begin.start <= this.props.begin.end) direction = "forward"
		else direction = "backward"
		this.refs.input.setSelectionRange(this.props.begin.start, this.props.begin.end, direction);
	},
	render: function() {
		return (
			<div>
				<textarea
					className="input"
					type="text"
					value={this.props.begin.text}
					onChange={this.props.handleChange}
					onSelect={this.props.handleChange}
					onFocus={this.selectText}
					ref="input" />
			</div>
		);
	}
});

module.exports = Input;
