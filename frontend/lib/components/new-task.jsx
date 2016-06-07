var React = require('react');
var PropTypes = React.PropTypes;
var TypingGolf = require('../typing-golf-components.js');
var Handler = require('../modules/handler.js');

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
            active: "from",
            solution: null,
			loaded: null
        };
    },
    componentDidMount: function() {
        console.log('hej')
    },
    sendTask: function(){
        console.log('uekgkhmkemk')
        var data = {
            from: this.state.from,
            to: this.state.to
        }

        var self = this;
        Handler.sendTask(data)
        .then(function(response){
            self.setState({
                solution: response
            })
        })

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
        return (
            <div>
			<div className="content">
				<h2>Create a new Task</h2>
			</div>
                <TypingGolf.InputOrTarget
                    state={this.state.from}
                    is_active={this.state.active == "from"}
                    onChange={this.updateFrom}
                    onBlur={this.onBlur}
            		onFocus={this.onFocusFrom}
					title="Initial state:"
                    ref="from"/>

                <TypingGolf.InputOrTarget
                    state={this.state.to}
                    is_active={this.state.active == "to"}
                    onChange={this.updateTo}
                    onBlur={this.onBlur}
            		onFocus={this.onFocusTo}
					title="Goal:"
                    ref="to"/>
				<div className="flex-container">
					<div className="content">
						<button onClick={this.sendTask}>Find shortest solution!</button>
					</div>
				</div>
				<TypingGolf.Solution
					solution={this.state.solution}
				/>	
            </div>
        );
    }

});

module.exports = NewTask;
