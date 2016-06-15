var React = require('react');
var PropTypes = React.PropTypes;
var router = require('react-router');
var equal = require('deep-equal');
var TypingGolf = require('../typing-golf-components.js');
var SweetAlert = require('sweetalert-react');

var Loading = require("./loading.jsx");

var qwest = require("qwest");

var ViewTask = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    fetch: function(){
        this.setState({loaded: false});
        var self = this;
		setTimeout(function(){
			qwest.get("/api/v1/resources/task/" + self.props.params.id)
			.then(function(xhr, data){
				var task = JSON.parse(data.body.json);
				self.setState({
					task_id: data.id,
					loaded: true,
					title: task.title,
					to: task.to,
					from: task.from,
					current_state: task.from,
					solution: task.solution
				});
			});
		}, 1400)

    },
    getInitialState: function() {
        return {
            to: {},
            from: {},
            title: "",
            solution: [],
            resolved: false,
            counter: 0,
            save_ranking: false
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
        this.setState({current_state: this.state.from, counter: 0, resolved: false});
        this.refs.input.focusInput();
    },
    postScore: function(nick){
        var self = this;
        qwest.post("/api/v1/resources/ranking_entry", {
            nick: nick,
            score: self.state.counter,
            task: self.state.task_id
        }).then(function(){
            console.log("posted!");
        });
    },
    redirectToTasks: function() {
        this.context.router.push('/tasks')
    },
    render: function() {
        var message = "Congratulations! \nYou've solve the task in "+this.state.counter+" steps.";
        if(this.state.counter > this.state.solution.length){
            message += "\nCan you solve it in " + this.state.solution.length + "? :)";
        }
        message += "\nWould you like to post your result to the leaderboard?";

        try{
            var ret;
            if(!this.state.loaded){
                ret = <Loading/>
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

                            <h2 className="complex-header">

                                <span>
                                    Task: {body.title}
                                </span>

                                <div class="button-wrapper">
                                    <button onClick={this.reset}>
                                        Reset task
                                    </button>
                                </div>

                            </h2>

                            <TypingGolf.Input
                                state={body.current_state}
                                onChange={this.handleChange}
                                onSelect={this.handleChange}
                                ref="input"
                                steps={this.state.counter}
                                title="Turn this:"/>

                            <TypingGolf.Target
                                state={body.to}
                                title={"into this:"}
                                />

                            <h3>
                                in {body.solution.length} steps!
                            </h3>
                            <SweetAlert
                                show={this.state.resolved}
                                title="Congratulations!"
                                text={message}
                                type="success"
                                onConfirm={() => {
                                    this.setState({ save_ranking: true });
                                }}
                                onCancel={() => {
                                    console.log('cancel');
                                    this.reset();
                                    this.redirectToTasks();

                                }}
                                showCancelButton
                                />
                            <SweetAlert
                                show={this.state.save_ranking}
                                title="Please enter your nickname:"
                                type="input"
                                inputType="text"
                                inputPlaceholder="text"
                                onConfirm={(inputValue) => {
                                    console.log(inputValue);
                                    this.postScore(inputValue)
                                    this.setState({ save_ranking: false });
                                    this.reset();
                                    this.redirectToTasks();

                                }}
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
