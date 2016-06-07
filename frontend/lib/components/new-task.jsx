var React = require('react');
var PropTypes = React.PropTypes;
var TypingGolf = require('../typing-golf-components.js');
var Handler = require('../modules/handler.js');

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
            solution: []
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
        // console.log(this.state.from)
        // console.log(this.state.to)
        console.log(this.state.solution)
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

                <button onClick={this.sendTask}>Send task</button>

                {(this.state.solution !== undefined && this.state.solution.length !== 0)

                ? <div>
                    <p className="end-text-details">
                        in {this.state.solution.length} steps
                    </p>
                        {this.state.solution.map(function(step){
                            return <TypingGolf.SolutionStep
                                        step={step.desc}/>;
                        })}
                </div>
                : <p className="end-text-details">Searching solution...</p>
                }
            </div>
        );
    }

});

module.exports = NewTask;
