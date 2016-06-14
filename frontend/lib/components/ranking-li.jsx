var React = require("react");

var RankingLi = React.createClass({
	render: function(){
		console.log(this.props);
		var body = this.props.resource.body;
		var medal = <div/>;
		switch(this.props.index){
		case 0:
			medal = <img src="/images/gold.svg" className="medal"/>
			break;
		case 1:
			medal = <img src="/images/silver.svg" className="medal"/>
			break;
		case 2:
			medal = <img src="/images/bronze.svg" className="medal"/>
			break;
		}
		return (
			<li className="ranking-entry" style={{animationDelay: this.props.index*200 + 300 + "ms"}}>
				<span className="medal-container">{medal}</span>
				<span className="index">#{this.props.index+1}</span>
				<span className="nick">{body.nick}</span>
				<span className="score">{body.score}</span>
			</li>
		)
	}
})

module.exports = RankingLi;