var React = require('react');
var PropTypes = React.PropTypes;

var Target = React.createClass({
    componentDidMount: function() {

    },
    selectText: function(text, selectionStart, selectionEnd) {
        var targetText;
		var sub_1 = text.slice(0, selectionStart);
		var sub_2 = "﻿";
		var sub_3 = text.slice(selectionEnd);

        if (selectionStart !== selectionEnd) {
            sub_2 = text.slice(selectionStart, selectionEnd)
            targetText = <p className="end-text">{sub_1}<span className="selection">{sub_2}</span>{sub_3}</p>;
        } else {
            targetText = <p className="end-text">{sub_1}<span className="blink">{sub_2}</span>{sub_3}</p>;
        }
        return targetText;
    },

    render: function() {
        return (
            <div className="flex-container">
                <div className="content">
                    <p className="end-text-details">
                        into this ⤵
                    </p>
                    {this.selectText(this.props.targetText, this.props.targetSelectionStart, this.props.targetSelectionEnd)}
                    <p className="end-text-details">
                        in 6 steps
                    </p>
                </div>
            </div>

        );
    }

});

module.exports = Target;
