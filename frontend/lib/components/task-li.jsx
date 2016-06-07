var React = require("react");

var Link = require("react-router").Link

var TaskLi = React.createClass({
	render: function(){
		try{
			var body = JSON.parse(this.props.data.body.json);
			console.log("body: ", body);
			return (
				<li>
					<h2><Link to={"/tasks/" + this.props.data.id}>{body.title}</Link></h2>
				</li>
			)
		}catch(e){
			console.log(e);
		}
	}
});

module.exports = TaskLi;