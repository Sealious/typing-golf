var React = require('react');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router')
var Link = ReactRouter.Link;

var Container = React.createClass({

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
            </div>
        );
    }

});

module.exports = Container;
