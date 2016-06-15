var React = require("react");

var Loading = React.createClass({
	render: function(){
		var delay = 65;
		//var boxes_amnt = Math.floor(Math.random()*10) + 5;
		var boxes_amnt = 6;
		var boxes  = [];
		for(var i=0; i<boxes_amnt; i++){
			boxes.push(
				<div className="loading-box" style={{animationDelay: delay * i + "ms"}}/>
			)
			boxes.push(
				<div className="loading-shadow"/>
			)
		}
		return (
			<div className="loading-container">
			<div>
				{boxes}
			</div>
			<div className="loading-text">
			Loading...
			</div>
			</div>
		)
	}
})

module.exports = Loading;
