
var React = require('react');
var PropTypes = React.PropTypes;
var router = require('react-router');
var equal = require('deep-equal');
var TypingGolf = require('../typing-golf-components.js')

var ViewTask = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    componentWillMount: function() {
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
        console.log('from',this.state.from)
        console.log('to  ',this.state.to)
        if (equal(this.state.from, this.state.to) ) {
            if (this.state.resolved === false) {
                this.setState({
                    resolved: true
                })
                alert(`You've done this task in `+this.state.counter+` steps`)
                this.context.router.push('/tasks')
            }
        }
    },
    handleChange: function(event) {

        console.log(event.direction)
        var direction = ((event.direction).localeCompare("b") == 0) ? "b" : "f";
        var counter = this.state.counter;

        if (event.text !== this.state.from.text ||
            event.start !== this.state.from.start ||
            event.end !== this.state.from.end ||
            direction !== this.state.from.direction) {
                counter += 1;
        }

        var new_state = {
            text: event.text,
            start: event.start,
            end: event.end,
            direction: direction
        }

        this.setState({
            from: new_state,
            counter: counter
        });
    },

    render: function() {
        if (this.props.task !== undefined) {
            var body = this.state;
            var direction = ""
            if (this.state.to.start !== this.state.to.end) {
                if (this.state.to.direction === "b") direction += "(Direction selection: ←)"
                else direction += "(Direction selection: →)"
            }
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
                            title="Turn this:"/>
                        <TypingGolf.Target
                            state={body.to}
                            title={"Into this state below in "+body.solution.length+" steps: " +direction}/>
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
