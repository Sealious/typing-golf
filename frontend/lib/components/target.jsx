var React = require('react');
var PropTypes = React.PropTypes;
var TypingGolf = require('./app.jsx');
TypingGolf.Step = require('./solution-step.jsx');

var Target = React.createClass({
    componentDidMount: function() {

    },
    selectText: function(text, start, end) {
        var targetText;
		var sub_1 = text.slice(0, start);
		var sub_2 = "﻿";
		var sub_3 = text.slice(end);

        if (start !== end) {
            sub_2 = text.slice(start, end)
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
                    {this.selectText(this.props.target.text, this.props.target.start, this.props.target.end)}
                    {(this.props.solution !== undefined && this.props.solution.length !== 0)

                    ? <div>
                        <p className="end-text-details">
                            in {this.props.solution.length} steps
                        </p>
                            {this.props.solution.map(function(step){
                                return <TypingGolf.SolutionStep
                                            step={step.edge.desc}/>;
                            })}
                    </div>
                    : <p className="end-text-details">Searching solution...</p>
                    }
                </div>
            </div>

        );
    }

});

module.exports = Target;
