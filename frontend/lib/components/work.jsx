var React = require('react');

var Work = React.createClass({
	render: function() {
		return (
			<div>
				<div className="flex-item sentence no-padding">
					<span className="animated bounceInDown information">work mode</span>
					<div className="slug">
						{'teamodorro.sealcode.org/#/'+this.props.session.body.slug}
					</div>
				</div>
				<div className="flex-item">
					<div className="circle-block work animated fadeIn">
						{this.props.time}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Work;
