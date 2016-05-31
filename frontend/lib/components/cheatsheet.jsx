var React = require('react');
var PropTypes = React.PropTypes;

var Cheatsheet = React.createClass({
    componentDidMount: function() {
        console.log('this.props.showCheatsheet', this.props.showCheatsheet);
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
                                        <tr>
                                            <td>
                                                <kbd className="key">BACKSPACE</kbd>
                                            </td>
                                            <td>
                                                Deletes one character to the left of caret.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">DELETE</kbd>
                                            </td>
                                            <td>
                                                Deletes one character to the right of caret.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">HOME</kbd>
                                            </td>
                                            <td>
                                                Moves to beginning of the line.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">END</kbd>
                                            </td>
                                            <td>
                                                Moves to end of the line.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">SHIFT</kbd> + <kbd className="key">HOME</kbd>
                                            </td>
                                            <td>
                                                Selects all characters from caret position to beginning of the line.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">SHIFT</kbd> + <kbd className="key">END</kbd>
                                            </td>
                                            <td>
                                                Selects characters from caret position to end of the line.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">CTRL</kbd> + <kbd className="key">BACKSPACE</kbd>
                                            </td>
                                            <td>
                                                Deletes one word or punctuation mark to the left of caret.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">CTRL</kbd> + <kbd className="key">DELETE</kbd>
                                            </td>
                                            <td>
                                                Deletes one word or punctuation mark to the right of caret.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">CTRL</kbd> + <kbd className="key">←</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">CTRL</kbd> + <kbd className="key">→</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves to
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">CTRL</kbd> + <kbd className="key">A</kbd>
                                            </td>
                                            <td>
                                                Selects all content.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">SHIFT</kbd> + <kbd className="key">↑</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves t
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">SHIFT</kbd> + <kbd className="key">↓</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">SHIFT</kbd> + <kbd className="key">→</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves t
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">SHIFT</kbd> + <kbd className="key">←</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">SHIFT</kbd> + <kbd className="key">CTRL</kbd> + <kbd className="key">→</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves t
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">SHIFT</kbd> + <kbd className="key">CTRL</kbd> + <kbd className="key">←</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">CTRL</kbd> + <kbd className="key">HOME</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">CTRL</kbd> + <kbd className="key">END</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">CTRL</kbd> + <kbd className="key">SHIFT</kbd> + <kbd className="key">HOME</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <kbd className="key">CTRL</kbd> + <kbd className="key">SHIFT</kbd> + <kbd className="key">END</kbd>
                                            </td>
                                            <td>
                                                Depending on the caret position moves
                                            </td>
                                        </tr>
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
