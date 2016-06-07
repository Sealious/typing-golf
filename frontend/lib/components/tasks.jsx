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
});

module.exports = Tasks;
	