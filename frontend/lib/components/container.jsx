var React = require('react');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router')
var Link = ReactRouter.Link;
var TypingGolf = require('../typing-golf-components.js');

var UserData = require("../sealious-mixins/user-data.jsx");

var Container = React.createClass({
	mixins: [UserData],
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
		var new_task_option = <div></div>;
		if(this.state.logged_in){
			new_task_option = <div className="nav-item">
				<Link className="link" to='new-task' activeClassName="active" title="create a new task">new task</Link>
			</div>
		}
        return (
            <div className="main-column">
                <div className="logo-item">
                    <a href="#/" title="go to home"><span className="logo animated flipInX">typing·golf</span></a>
                </div>
                <div className="nav">
                    <div className="nav-item">
                        <Link className="link" to='tasks' activeClassName="active" title="show a list of all available tasks">tasks</Link>
                    </div>
                    <div className="nav-item">
                        <Link className="link" to='ranking' activeClassName="active" title="view best scores so far">ranking</Link>
                    </div>
					{new_task_option}
                </div>
                <div className="main-view">
                	{this.props.children}
				</div>

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
