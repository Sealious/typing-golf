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
                } else current_shortcut = [<kbd className="key">{keys[0]}</kbd>]
                shortcuts.push({keys: current_shortcut, description: edits[key].spec});
            }
        }
		shortcuts = shortcuts.sort(function(a, b){
			return a.keys.length > b.keys.length;
		});
        return shortcuts;
    },
    render: function() {

		var shortcuts = this.loadCheatsheet().map(function(shortcut, index){
			return <tr key={index}>
				 <td>{shortcut.keys}</td>
				 <td>{shortcut.description}</td>
			</tr>
		});		
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
                                    <h2 className="descripiton">Shortcuts</h2>
                                <table>
                                    <tbody>
                                        {shortcuts}
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
