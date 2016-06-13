var React = require("react");

var Loading = require("./loading.jsx");

var Solution = React.createClass({
	render: function(){
		if(this.props.is_loading){
			return <Loading/>
		}else if (this.props.solution == null){
			return <div></div>
		}else{
			return (
				<div>
				<h3>The shortest solution has {this.props.solution.length} steps:</h3>
				<ul className="steps-list">
					{this.props.solution.map(function(el){
						return <li><kbd className="key">{el.desc}</kbd></li>
					})}
				</ul>
				</div>
			)
		}		
	}
});

module.exports = Solution;