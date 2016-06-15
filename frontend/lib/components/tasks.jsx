var React = require("react");
var qwest = require("qwest");

var Task = require("./task-li.jsx");
var Loading = require("./loading.jsx");

var Promise = require("bluebird");

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
		return new Promise(function(resolve){
			setTimeout(resolve, 700)
		}).then(function(){
			return qwest.get("/api/v1/resources/task")
			.then(function(xhr, response){
				console.log(arguments);
				self.setState({
					data: response,
					loaded: true
				});
			});
		})
	},
	componentDidMount: function(){
		this.refresh();
	},
	render: function(){
		if(!this.state.loaded){
			return <div className="content"><Loading/></div>
		}else{
			var elements = this.state.data.map(function(task, index){
				return <Task data={task} key={task.id} index={index}/>
			});
			return (
				<div className="content">
				<h2>Tasks</h2>
				<ul className="tasklist">
					{elements}
				</ul>
				</div>
			)
		}
	}
});

module.exports = Tasks;
