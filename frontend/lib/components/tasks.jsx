var React = require("react");
var qwest = require("qwest");

var Task = require("./task-li.jsx");

var Tasks = React.createClass({
	getInitialState: function(){
		return {
			loaded: false,
			data: []
		};
	},
	refresh: function(){
		var self = this;
		self.setState({
			loaded: false
		});
		qwest.get("/api/v1/resources/task")
		.then(function(xhr, response){
			self.setState({
				data: response,
				loaded: true
			});
		});
	},
	componentDidMount: function(){
		this.refresh();
	},
	render: function(){
		console.log(this.state.data);
		console.log(this.props.params.id)
		if (this.props.params.id !== undefined) {
			var data = this.state.data;
			var current_task;
			for (var i = 0; i < data.length; i++) {
				if (data[i].id === this.props.params.id) current_task = data[i]
			}
			return (
				<div>
					{React.cloneElement(this.props.children, { task: current_task })}
				</div>
			)
		} else {

			if(!this.state.loaded){
				return <div className="content"> Loading...</div>
			}else{
				var elements = this.state.data.map(function(task){return <Task data={task} key={task.id}/>});
				return (
					<div className="content">
					{elements}
					</div>
				)
			}
		}
	}
});

module.exports = Tasks;
