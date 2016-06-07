var React = require('react');
var PropTypes = React.PropTypes;
var TypingGolf = require('../typing-golf-components.js');

console.log(TypingGolf)

var NewTask = React.createClass({
    getInitialState: function() {
        return {
            from:{
                text: "",
                start: 0,
                end: 0
            },
            to:{
                text: "",
                start: 0,
                end: 0
            },
            active: "from"
        };
    },
    componentDidMount: function() {
        console.log('hej')
    },
    updateFrom: function(state){
        this.setState({
            from: state
        })
    },
    updateTo: function(state){
        this.setState({
            to: state
        })
    },
    onBlur: function(){
        this.setState({
            active: "null"
        })
    },
    onFocusFrom: function(){
        this.setState({
            active: "from"
        })
    },
    onFocusTo: function(){
        this.setState({
            active: "to"
        })
    },
    render: function(){
        console.log(this.state.from)
        console.log(this.state.to)
        return (
            <div>

                <TypingGolf.InputOrTarget
                    state={this.state.from}
                    is_active={this.state.active == "from"}
                    onChange={this.updateFrom}
                    onBlur={this.onBlur}
                    onFocus={this.onFocusFrom}
                    ref="from"/>

                <TypingGolf.InputOrTarget
                    state={this.state.to}
                    is_active={this.state.active == "to"}
                    onChange={this.updateTo}
                    onBlur={this.onBlur}
                    onFocus={this.onFocusTo}
                    ref="to"/>
            </div>
        );
    }

});

module.exports = NewTask;
