
var React = require('react');
var PropTypes = React.PropTypes;
var router = require('react-router');
var TypingGolf = require('../typing-golf-components.js')

var ViewTask = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    componentWillMount: function() {
        console.log(this.props.task)
        if (this.props.task === undefined) {
            this.context.router.push('/tasks')
        }
    },

    getInitialState: function() {
        if (this.props.task !== undefined) {
            var body = JSON.parse(this.props.task.body.json);
            return {
                from: body.from,
                to: body.to,
                solution: body.solution,
                title: body.title,
                resolved: false,
    			counter: 0,
            };
        } else {
            return null;
        }
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.from.text === this.state.to.text) {
            if (this.state.resolved === false) {
                this.setState({
                    resolved: true
                })
                alert(`You've done task in `+this.state.counter+` steps`)
            }
        }
    },
    handleChange: function(event) {
        console.log('ekhm')
        console.log('event', event);
        var direction = ((event.direction).localeCompare("backward") == 0) ? "b" : "f";
        var currentCounter = this.state.counter;

        if (event.text !== this.state.from.text ||
            event.start !== this.state.from.start ||
            event.end !== this.state.from.end ||
            direction !== this.state.from.direction) {
                currentCounter += 1;
        }

        var new_state = {
            text: event.text,
            start: event.start,
            end: event.end,
            direction: direction
        }

        this.setState({
            from: new_state,
            counter: currentCounter
        });
    },

    render: function() {
        if (this.props.task !== undefined) {
            var body = this.state;
            console.log('body:',body)
            return (
                <div>
                    <div className="content">
                        <h2>Task: {body.title}</h2>
                    </div>
                    <div>
                        <TypingGolf.Input
                            state={body.from}
                            onChange={this.handleChange}
        					onSelect={this.handleChange}
                            title="Turn this"/>
                        <TypingGolf.Target
                            state={body.to}
                            title={"Into this state below in "+body.solution.length+" steps" }/>
                        <p className="end-text-details">You've done {this.state.counter} steps</p>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

});

module.exports = ViewTask;
