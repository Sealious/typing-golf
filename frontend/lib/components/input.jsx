var React = require('react');
var PropTypes = React.PropTypes;

var Input = React.createClass({
	componentDidMount: function() {
		this.selectText(this.props.begin);
	},
	selectText: function(state){
		this.refs.input.focus()
		var direction;
		if (state.start <= state.end) direction = "forward"
		else direction = "backward"
		this.refs.input.setSelectionRange(state.start, state.end, direction);
	},
	focusInput: function(){ this.selectText(this.props.begin); },
	clickInput: function(){ alert(`Please don't cheat! :)`); this.selectText(this.props.last); },
	render: function() {
		return (
			<div>
				<textarea
					className="input"
					type="text"
					value={this.props.begin.text}
					onChange={this.props.handleChange}
					onSelect={this.props.handleChange}
					onFocus={this.focusInput}
					onClick={this.clickInput}
					ref="input" />
			</div>
		);
	}
});

module.exports = Input;
