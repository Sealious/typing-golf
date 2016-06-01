var React = require('react');
var PropTypes = React.PropTypes;

var Target = React.createClass({
    componentDidMount: function() {

    },
    selectText: function(text, selectionStart, selectionEnd) {
        var beforeSelection = 0;
            afterSelection = 0;
            selection = 0;

        if (selectionStart !== 0) beforeSelection = selectionStart;
        if (selectionEnd !== 0 || selectionEnd !== text.length) afterSelection = selectionEnd + 1;


        substring_1 = text.substr(0, beforeSelection)
        substring_2 = text.substr(selectionStart, selectionEnd)
        substring_3 = text.substr(afterSelection, text.length);
        console.log('substring_1', substring_1);
        console.log('substring_2', substring_2);
        console.log('substring_3', substring_3);

        // var targetText = []

        var targetText = <p className="end-text">{substring_1}<span className="selection">{substring_2}</span>{substring_3}</p>;

        return targetText;
    },

    render: function() {
        // <p className="end-text">
        //     {this.props.targetText}
        // </p>
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
