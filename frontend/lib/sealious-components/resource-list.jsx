var React = require("react");
var rest = require("qwest");
var merge = require("merge");

var type_collection = require("./resource-type-collection.mixin.jsx");

var Pagination = require("./resource-list-pagination.jsx");

var ResourceList = React.createClass({
	mixins: [type_collection],
	getDefaultProps() {
	    return {
			containerComponent: "ul",
			className: "",
	    };
    },
	getInitialState: function() {
		return {
			page: 1,
		};
	},
	wrap: function(method, resource){
		return method.bind(this, resource);
	},
	nextPage: function(){
		this.setState({
			pagination: merge(this.state.pagination, {page: this.state.pagination.page + 1})
		});
		this.refresh();
	},
	prevPage: function(){
		this.setState({
			pagination: merge(this.state.pagination, {page: this.state.pagination.page - 1})
		});
		this.refresh();
	},
	render: function(){
		var self = this;
		var list_elements = this.state.resources.map(function(resource){
			return React.createElement(self.props.listElementClass, {
				resource: resource, 
				key: resource.id,
				onDelete: self.wrap(self.delete, resource),
				afterChange: self.refresh
			});
		});

		var pagination = <Pagination
			hasPrev={this.state.pagination.page!=1} 
			hasNext={this.state.resources.length == 12}
			onPrev={this.prevPage}
			onNext={this.nextPage}
		/>

		if(this.state.loading){
			return <div>wczytywanie...</div>
		} else if (list_elements.length){




			return (
				<div className={this.props.className}>
					{pagination}
					{React.createElement(this.props.containerComponent, {className: "resource-list"}, list_elements)}
					{pagination}
				</div>
				)			
		}else if(self.props.emptyClass){
			return <div>
				{pagination}
				{React.createElement(self.props.emptyClass)}
			</div>
		}else{
			return <div>
				{pagination}
			</div>
		}
	}
})

module.exports = ResourceList;
