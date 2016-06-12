var React = require("react");

var Link = require("react-router").Link

var TaskLi = React.createClass({
	render: function(){
		try{
			var body = JSON.parse(this.props.data.body.json);
			return (
				<li className="task-li" style={{animationDelay: this.props.index*75 + "ms"}}>
					<Link to={"/tasks/" + this.props.data.id}>{body.title}</Link>
				</li>
			)
		}catch(e){
			console.log(e);
		}
	}
});

module.exports = TaskLi;
