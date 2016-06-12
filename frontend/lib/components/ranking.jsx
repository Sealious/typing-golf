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
	fetch: function(){
		var self = this;
		qwest.get("/api/v1/resources/ranking_entry")
		.then(function(xhr, data){
			self.setState({
				entries: data,
				loaded: true
			})
		})
	},
	getInitialState: function(){
		return {
			loaded: false
		}
	},
	componentDidMount: function(){
		this.fetch();
	},
	render: function(){
		if(!this.state.loaded){
			return (
			   <div className='content'> wczytywanie... </div>
			)
		}else{
			return (
				<div className="content">
					<h2>Ranking</h2>
					<ResourceSelect
						url="/api/v1/resources/task"
						displayAttr="title"
						transformEntry={extractTaskBody}
					/>
					<ResourceList
						url="/api/v1/resources/ranking_entry"
						listElementClass={RankingLi}
					/>
				</div>
			)
		}
	}
});

module.exports = Ranking;