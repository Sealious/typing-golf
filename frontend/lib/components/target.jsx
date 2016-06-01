var React = require('react');
var PropTypes = React.PropTypes;

var Target = React.createClass({
    componentDidMount: function() {

    },
    selectText: function(text, selectionStart, selectionEnd) {
        var targetText;

        if (selectionStart !== selectionEnd) {
            var beforeSelection = 0;
            afterSelection = 0;
            selection = 0;

            // if (selectionStart !== 0) beforeSelection = selectionStart;
            // if (selectionEnd !== 0 || selectionEnd !== text.length) afterSelection = selectionEnd + 2;

            sub_1 = text.slice(0, selectionStart)
            sub_2 = text.slice(selectionStart, selectionEnd)
            sub_3 = text.slice(selectionEnd);
            console.log('sub_1', sub_1, 0, selectionStart);
            console.log('sub_2', sub_2, selectionStart+1, selectionEnd);
            console.log('sub_3', sub_3, selectionEnd+1);


        } else {
            sub_1 = text.slice(0, selectionStart)
            sub_2 = "|"
            sub_3 = text.slice(selectionEnd);
        }

        targetText = <p className="end-text">{sub_1}<span className="selection">{sub_2}</span>{sub_3}</p>;

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
