var React = require('react');
var PropTypes = React.PropTypes;

var Target = React.createClass({

    render: function() {
        return (
            <div className="flex-container">
                <div className="content">
                    <p className="end-text-details">
                        into this ⤵
                    </p>
                    <p className="end-text">
                        {this.props.targetText}
                    </p>
                    <p className="end-text-details">
                        in 6 steps
                    </p>
                </div>
            </div>

        );
    }

});

module.exports = Target;
