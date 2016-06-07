
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

    render: function() {
        if (this.props.task !== undefined) {
            var body = JSON.parse(this.props.task.body.json);
            console.log(body)
            return (
                <div>
                    <div className="content">
                        <h2>Task: {body.title}</h2>
                    </div>
                    <div>
                        <TypingGolf.Input
                            state={body.from}
                            title="Turn this"/>
                        <TypingGolf.Target
                            state={body.to}
                            title={"Into this state below in "+body.solution.length+" steps" }/>
                        <p className="end-text-details">You've done 0 steps</p>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

});

module.exports = ViewTask;
