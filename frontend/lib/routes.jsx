var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var DefaultRoute = ReactRouter.DefaultRoute;
var TypingGolf = require('./typing-golf-components.js');
var hashHistory = ReactRouter.hashHistory;

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={TypingGolf.Container}>
			<Route path="new-task" component={TypingGolf.NewTask}/>
		</Route>
  	</Router>,
	document.getElementById('app')
);
