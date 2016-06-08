var React = require('react');
var PropTypes = React.PropTypes;
var router = require('react-router');
var equal = require('deep-equal');
var TypingGolf = require('../typing-golf-components.js')

var qwest = require("qwest");

var ViewTask = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
	fetch: function(){
		this.setState({loaded: false});
		var self = this;
		qwest.get("/api/v1/resources/task/" + this.props.params.id)
		.then(function(xhr, data){
			var task = JSON.parse(data.body.json);
			self.setState({
				loaded: true,
				title: task.title,
				to: task.to,
				from: task.from,
				current_state: task.from,
				solution: task.solution
			});
		});
	},
    getInitialState: function() {
         return {
			 to: {},
			 from: {},
			 title: "",
			 solution: [],
			 resolved: false,
			 counter: 0,
		};
    },
	componentDidMount: function(){
		console.log("hello!");
	},
    componentDidUpdate: function(prevProps, prevState) {
		try{
        if (equal(this.state.current_state, this.state.to) && this.state.loaded ) {
            if (this.state.resolved === false) {
                this.setState({
                    resolved: true
                })
				var message = "Congratulations! \nYou've solve the task in "+this.state.counter+" steps.";
				if(this.state.counter > this.state.solution.length){
					message += "\nCan you solve it in " + this.state.solution.length + "? :)";
				}
                alert(message)
//                this.context.router.push('/tasks')
            }
        }
		}catch(e){
			console.log(e);
		}
    },
    handleChange: function(new_data) {
        var direction = ((new_data.direction).localeCompare("b") == 0) ? "b" : "f";
        var counter = this.state.counter;

        if (new_data.text !== this.state.current_state.text ||
            new_data.start !== this.state.current_state.start ||
            new_data.end !== this.state.current_state.end ||
            direction !== this.state.current_state.direction) {
                counter += 1;
        }

        var new_state = {
            text: new_data.text,
            start: new_data.start,
            end: new_data.end,
            direction: direction
        }

        this.setState({
            current_state: new_state,
            counter: counter
        });

    },
	componentDidMount: function(){
		this.fetch();
	},
	reset: function(){
		this.setState({current_state: this.state.from, counter: 0});
		this.refs.input.focusInput();
	},
    render: function() {
		try{
			var ret;
			if(!this.state.loaded){
				ret =  <div className="content">Loading...</div>
			}else{
				var body = this.state;
				var direction = ""
				if (body.to.start !== body.to.end) {
					if (body.to.direction === "b") direction += "(Direction selection: ←)"
					else direction += "(Direction selection: →)"
				}
				ret = (
					<div>
						<div className="content">
							<h2>Task: {body.title}</h2>
							<button onClick={this.reset}>Reset task</button>
						</div>
					<div>
							<TypingGolf.Input
								state={body.current_state}
								onChange={this.handleChange}
								onSelect={this.handleChange}
								ref="input"
								title="Turn this:"/>
							<p className="end-text-details">You've done {body.counter} steps</p>
							<TypingGolf.Target
								state={body.to}
								title={"Into this state below in "+body.solution.length+" steps: " +direction}
							/>
						</div>
					</div>
				);
			}
			return ret;
		}catch(e){
			console.log(e);
		}
    }

});

module.exports = ViewTask;
