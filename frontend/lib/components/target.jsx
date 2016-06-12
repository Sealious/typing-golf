var React = require('react');
var PropTypes = React.PropTypes;
var TypingGolf = require('../typing-golf-components.js');

var Target = React.createClass({
    selectText: function(state) {
		var text = state.text;
		var start = state.start;
		var end = state.end;
		var direction = state.direction;
        var targetText;
		var sub_1 = text.slice(0, start);
		var sub_2 = "﻿";
		var sub_3 = text.slice(end);

        if (start !== end) {
            sub_2 = text.slice(start, end)
            targetText = <p className="end-text">{sub_1}<span className={"selection " + direction}>{sub_2}</span>{sub_3}</p>;
        } else {
            targetText = <p className="end-text">{sub_1}<span className="blink">{sub_2}</span>{sub_3}</p>;
        }
        return targetText;
    },
    render: function() {
        return (
            <div className="target-container">
                    <h3>
                        {this.props.title || "into this ⤵"}
                    </h3>
                    {this.selectText(this.props.state)}
            </div>

        );
    }

});

module.exports = Target;
