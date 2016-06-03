var React = require('react');
var PropTypes = React.PropTypes;
var edits = require('../../../common/text-edits.js').edits;

var Cheatsheet = React.createClass({
    loadCheatsheet: function() {
        var shortcuts = [];

        for (var key in edits) {
            var current_shortcut = [];
            var keys = edits[key].desc.split('+');
            if (key !== 'insert_char') {
                if (keys.length > 1) {
                    for (var i = 0; i < keys.length; i++) {
                        current_shortcut.push(<kbd key={i} className="key">{keys[i]}</kbd>)
                        if (keys.length - i > 1) current_shortcut.push(' + ')
                    }
                } else current_shortcut = <kbd className="key">{keys[0]}</kbd>
                shortcuts.push(
                    <tr key={key}>
                        <td>{current_shortcut}</td>
                        <td>{edits[key].spec}</td>
                    </tr>
                )
            }
        }
        return shortcuts;
    },
    render: function() {
        return (
            <div>
                {(this.props.showCheatsheet === true)
                    ? <div id="overlay">
                        <div>
                            <div className="shortcuts">
                                <div className="cancel" onClick={this.props.coverCheatsheet}>
                                    x
                                </div>
                                <div className="content">
                                    <p className="descripiton">Shortcuts</p>
                                <table>
                                    <tbody>
                                        {this.loadCheatsheet()}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }
});

module.exports = Cheatsheet;
