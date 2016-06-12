var React = require("react");

var ResourceListPagination = React.createClass({
	render: function(){

		return (
			<ul className="resource-list-pagination">
				<li 
					className="btn" 
					style={{visibility: this.props.hasPrev? "visible" : "hidden"}}
					onClick={this.props.onPrev}
				>
					&#x25C0; poprzednie
				</li>

				<li 
					className="btn" 
					style={{visibility: this.props.hasNext? "visible" : "hidden"}}
					onClick={this.props.onNext}
				>
					następne &#x25B6;
				</li>
			</ul>
		);
	}
})


module.exports = ResourceListPagination;
