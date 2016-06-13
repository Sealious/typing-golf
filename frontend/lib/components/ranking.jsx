var React = require("react");

var qwest = require("qwest");

var RankingLi = require("./ranking-li.jsx");

var ResourceSelect = require("../sealious-components/resource-select.jsx");
var ResourceList = require("../sealious-components/resource-list.jsx");

var extractTaskBody = function(task){
	task.body = JSON.parse(task.body.json);
	return task;
}

var Ranking = React.createClass({
	getInitialState: function(){
		return {
			loaded: false
		}
	},
	changeTask: function(e){
		this.setState({task_id: e.target.value});
	},
	render: function(){
		return (
			<div className="ranking-container">
				<div className="content">
					<h2>Ranking</h2>
					<ResourceSelect
						url="/api/v1/resources/task"
						displayAttr="title"
						transformEntry={extractTaskBody}
						value={this.state.task_id}
						onChange={this.changeTask}
						allowNoValue="true"				 
						noValueOptionName="Choose a task..."
					/>
					<ResourceList
						url="/api/v1/resources/ranking_entry"
						listElementClass={RankingLi}
						filter={{task:this.state.task_id}}
						sort={{"body.score":"asc"}}
					/>
				</div>
			</div>
		)
	}
});

module.exports = Ranking;