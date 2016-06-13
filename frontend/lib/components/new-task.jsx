var React = require('react');
var PropTypes = React.PropTypes;
var TypingGolf = require('../typing-golf-components.js');
var Handler = require('../modules/handler.js');
var SweetAlert = require('sweetalert-react');


var qwest = require("qwest");

var NewTask = React.createClass({
    getInitialState: function() {
        return {
			title: "",
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
			loading: false,
            prompt: false,
            error: false
        };
    },
    sendTask: function(){
        var data = {
            from: this.state.from,
            to: this.state.to,
			solution: null
        }

        var self = this;
		self.setState({loading: true})
        Handler.sendTask(data)
        .then(function(response){
            self.setState({
                solution: response,
				loading: false
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
	changeTitle: function(e){
		this.setState({title: e.target.value});
	},
	save: function(){
        if (this.state.title !== "") {
            var data = {
    			from: this.state.from,
    			to: this.state.to,
    			title: this.state.title,
    			solution: this.state.solution
    		};

    		var data_str = JSON.stringify(data);
    		qwest.post("/api/v1/resources/task",{
    			json: data_str
    		}).then(function(){
                this.setState({
                    prompt: true
                })
    		}.bind(this));
            console.log('ekhm')
        } else {
            this.setState({
                error: true
            })
        }
	},
    clearFields: function(){

    },
    render: function(){
        return (
            <div>
			<div className="content">
				<h2>Create a new Task</h2>
					<input type="text" placeholder="Task title" className="task-title" value={this.state.title} onChange={this.changeTitle}/>
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
				<button onClick={this.sendTask}>Find the shortest solution!</button>
                <SweetAlert
                    show={this.state.prompt}
                    title="Success"
                    text="Your task saved!"
                    type="success"
                    onConfirm={() => {
                        this.setState({ prompt: false });
                    }}
                    onCancel={() => {
                        console.log('cancel');
                    }}
                />
                <SweetAlert
                    show={this.state.error}
                    title="Error"
                    text="Please add title for your task!"
                    type="error"
                    onConfirm={() => {
                        this.setState({ error: false });
                    }}
                    onCancel={() => {
                        console.log('cancel');
                    }}
                />
			</div>

			<div className="flex-container">
				<div className="content">
					<TypingGolf.Solution
						solution={this.state.solution}
						is_loading={this.state.loading}
					 />
				</div>
			</div>
			<div>
			{this.state.solution!=null	?
				<div className="content">
					<button onClick={this.save}> Save this task</button>
				</div>
				: null}
			</div>

            </div>
        );
    }

});

module.exports = NewTask;
