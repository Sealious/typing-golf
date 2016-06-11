var React = require('react');
var PropTypes = React.PropTypes;
var TypingGolf = require('../typing-golf-components.js');
var de = require("deep-equal");



var Input = React.createClass({
    componentDidMount: function() {
        this.selectText(this.props.state);
    },
    handleChange: function(event) {
		if(event.type=="keydown") return;
        if(event.nativeEvent.button != undefined){
            return event.preventDefault();
        }
		
        var eventDirection = event.target.selectionDirection[0];
		var new_state = {
			text: event.target.value,
			start: event.target.selectionStart,
			end: event.target.selectionEnd,
			direction: eventDirection
		}

		if(!de(new_state, this.props.state)){
			console.log(event);
			console.log(new_state, this.props.state);
			this.props.onChange(new_state)
		}

		event.stopPropagation();
    },
    selectText: function(state){
        this.refs.input.focus()
		var direction;
		if(state.direction == "b"){
			direction = "backward";
		}else{
			direction = "forward";
		}
        this.refs.input.setSelectionRange(state.start, state.end, direction);
    },
    focusInput: function(){ this.selectText(this.props.state); },
    clickInput: function(e) {
        e.preventDefault();
        this.selectText(this.props.state);
    },
	componentDidUpdate: function(){
		this.selectText(this.props.state);
	},
    render: function() {
        return (
            <div className="flex-container">
			<div className="content">
				<h3>{this.props.title || ""}</h3>
				<textarea
                    className="input"
            		type="text"
					rows="1"
                    value={this.props.state.text}
                    onChange={this.handleChange}
                    onSelect={this.handleChange}
                    onFocus={this.focusInput}
                    onClick={this.clickInput}
                    onBlur={this.props.onBlur}
                    ref="input" />
			</div>
            </div>
        )
    }
});

module.exports = Input;
