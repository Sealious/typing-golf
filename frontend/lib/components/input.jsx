var React = require('react');
var PropTypes = React.PropTypes;
var TypingGolf = require('../typing-golf-components.js');


var Input = React.createClass({
    componentDidMount: function() {
        this.selectText(this.props.state);
    },
    handleChange: function(event) {
        if(event.nativeEvent.button != undefined){
            return event.preventDefault();
        }
        var eventDirection = ((event.target.selectionDirection).localeCompare("backward") == 0) ? "b" : "f";
        // var currentCounter = this.state.counter;

        if (event.target.value !== this.props.state.text ||
            event.target.selectionStart !== this.props.state.start ||
            event.target.selectionEnd !== this.props.state.end ||
            eventDirection !== this.props.state.direction) {
                // currentCounter += 1;
            }

            var new_state = {
                text: event.target.value,
                start: event.target.selectionStart,
                end: event.target.selectionEnd,
                direction: eventDirection
            }

            this.props.onChange(new_state)

            // this.setState({
            // 	last: this.state.begin,
            // 	begin: new_state,
            // 	counter: currentCounter
            // });
    },
    selectText: function(state){
        this.refs.input.focus()
        var direction;
        if (state.start <= state.end) direction = "forward"
        else direction = "backward"
        this.refs.input.setSelectionRange(state.start, state.end, direction);
    },
    focusInput: function(){ this.selectText(this.props.state); },
    clickInput: function(e) {
        e.preventDefault();
        this.selectText(this.props.state);
    },
    render: function() {
        return (
            <div>

                <textarea
                    className="input"
                    type="text"
                    value={this.props.state.text}
                    onChange={this.handleChange}
                    onSelect={this.handleChange}
                    onFocus={this.focusInput}
                    onClick={this.clickInput}
                    onBlur={this.props.onBlur}
                    ref="input" />

            </div>
        )
    }
});

module.exports = Input;
