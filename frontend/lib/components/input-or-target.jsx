var React = require('react');
var PropTypes = React.PropTypes;
var TypingGolf = require('../typing-golf-components.js');

var InputOrTarget = React.createClass({

    render: function() {
        console.log(this.props)
        if (this.props.is_active) {
            return(
                <div onClick={this.props.onFocus}>
                    <TypingGolf.Input
                        state={this.props.state}
                        onBlur={this.props.onBlur}
                        onChange={this.props.onChange}/>
                </div>
            )
        } else {
            return (
                <div onClick={this.props.onFocus}>
                    <TypingGolf.Target
                        state={this.props.state}
                        onBlur={this.props.onBlur}/>
                </div>
            );
        }
    }

});

module.exports = InputOrTarget;
