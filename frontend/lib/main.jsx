var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Example = require('./components/app.jsx');
var hashHistory = ReactRouter.hashHistory;

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Example.Container}>
			<IndexRoute component={Example.App}/>
		</Route>
  	</Router>,
	document.getElementById('app')
);

// ReactDOM.render(
// 	<Router history={hashHistory}>
// 		<Route path="/" component={Example.Container}>
// 			<IndexRoute component={Example.NewSession}/>
// 			<Route path=":slug" componentst={Example.TimerContainer}/>
// 		</Route>
//   	</Router>,
// 	document.getElementById('app')
// );
