var rest = require("qwest");
var merge = require("merge");
var deep_equal = require("deep-equal");
var clone = require("clone");

var Promise = require("bluebird");

var default_pagination = {
	page: 1,
	items: 12
}

module.exports = {
	getInitialState: function() {
	    return {
	        resources: [],
	        last_loaded: -Infinity,
	        last_query: {},
	        pagination: clone(default_pagination),
	    };
	},
	getDefaultProps() {
	    return {
	        paginate: false,
	        filter: {},
	        format: {},
	        search: "",
			transformEntry: function(x){return x},
	    };
	},
	generateQuery: function(props){

		var query = {};

		if(props.paginate){
			query.pagination = this.state.pagination;
		}
		
		if(props.search){
			query.search = props.search;
		}

		if(props.filter){
			query.filter = props.filter;
			for(var i in query.filter){
				if(query.filter[i]=="undefined" || query.filter[i]===null){
					delete query.filter
				}
			}
		}

		if(props.sort){
			query.sort = props.sort;
		}

		if(props.format){
			query.format = props.format;
		}
		return query;
	},
	reloadNeeded: function(query){
		return !deep_equal(query, this.state.last_query);
	},
	paginationResetNeeded: function(query){
		if(deep_equal(query.pagination, default_pagination)){
			return false;
		}
		for(var attr in query){
			if(attr != "pagination"){
				if(!deep_equal(query[attr], this.state.last_query[attr])){
					return true;
				}
			}
		}
		return false;
	},
	resetPagination: function(cb){
		this.setState({
			pagination: clone(default_pagination)
		}, cb)
	},
	fetch: function(query){
		var self = this;
		self.setState({
			loading: true
		})
//		console.log(self.props.url);
		return rest.get(self.props.url, query)
		.then(function(xml, response){
			try{
			var resources = response.map(self.props.transformEntry);
			self.setState({
				loading: false,
				resources: resources,
				last_query: clone(query)
			})
			}catch(e){console.log(e)}
		})			

	},
	refresh: function(force){
		var self = this;

		var query = this.generateQuery(this.props);

		if(self.paginationResetNeeded(query)){
			console.log("pagination reset needed!");
			self.resetPagination(function(){
				console.log("pagination has been reset!");
				self.fetch(query);
			})
			return;
		}
		if(force || self.reloadNeeded(query)){
			return self.fetch(query);
		}else{
			return Promise.resolve();
		}
	},
	componentDidMount: function(){
		this.refresh();
	},
	componentWillReceiveProps: function(next_props) {
		var self = this;
		setTimeout(function(){
			self.refresh();			
		}, 0)
	},
	delete: function(resource){
		var self = this;
		rest.delete(self.props.url + "/" + resource.id)
		.then(function(){
			self.refresh();
		})
	}
}
