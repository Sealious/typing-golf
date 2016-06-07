var React = require('react');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router')
var Link = ReactRouter.Link;
var TypingGolf = require('../typing-golf-components.js');

var Container = React.createClass({
    getInitialState: function() {
        return {
            showCheatsheet: false
        };
    },
    coverCheatsheet: function() {
        var new_value = (this.state.showCheatsheet == true) ? false : true;
        this.setState({ showCheatsheet : new_value });
    },

    render: function() {
        return (
            <div>
                <div className="logo-item">
                    <div className="logo animated flipInX">typing…·golf</div>
                </div>
                <div className="nav">
                    <div className="nav-item">
                        <Link className="link" to='tasks'>tasks</Link>
                    </div>
                    <div className="nav-item">
                        <Link className="link" to='ranking'>ranking</Link>
                    </div>
                    <div className="nav-item">
                        <Link className="link" to='new-task'>new task</Link>
                    </div>
                </div>
                
                {this.props.children}

                <TypingGolf.Cheatsheet
                    showCheatsheet={this.state.showCheatsheet}
                    coverCheatsheet={this.coverCheatsheet}/>
                <div
                    className="cheatsheet-box"
                    onClick={this.coverCheatsheet}>?</div>
            </div>
        );
    }

});

module.exports = Container;
