var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var DefaultRoute = ReactRouter.DefaultRoute;
var TypingGolf = require('./components/app.jsx');
var hashHistory = ReactRouter.hashHistory;

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={TypingGolf.Container}>
			<IndexRoute component={TypingGolf.App}/>
			<Route name="task" path="task" component={TypingGolf.TaskView}/>
		</Route>
  	</Router>,
	document.getElementById('app')
);
