var React = require("react");

var Solution = React.createComponent({
	render: function(){
		if(this.props.solution == null){
			return <div></div>
		}else if (this.props.is_loading){
			return <div>Waiting for the server response...</div>
		}else{
			return (
				<div>
				<ul>
					{this.props.solution.map(function(el){
						return <li><kbd>el.desc</kbd></li>
					})}
				</ul>
				</div>
			)
		
	}
});

module.exports = Solution;