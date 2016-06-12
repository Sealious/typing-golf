var React = require("react");

var type_collection = require("./resource-type-collection.mixin.jsx");

var ResourceSelect = React.createClass({
	mixins: [type_collection],
	getInitialState: function() {
	    return {
	          value: this.props.value
	    };
	},
	getDefaultProps() {
	    return {
	        displayAttr: "id",
	        noValueOptionName: "--",
	        allowNoValue: false
	    };
	},
	getValue: function(){
		console.log("getValue!", this.refs.select.value);
		if(this.refs.select.value == "undefined"){
			return undefined;
		}else{
			return this.refs.select.value;			
		}
	},
	handleChange: function(e){
		this.props.onChange && this.props.onChange(e)
	},
	render: function(){
		var self = this;
		var options = this.state.resources.map(function(resource){
			return <option value={self.props.valueAttr? resource.body[self.props.valueAttr] : resource.id} key={resource.id}>
				{resource[self.props.displayAttr] || resource.body[self.props.displayAttr]}
			</option>
		})

		if(this.props.allowNoValue){
			options.unshift(
				<option value="undefined" key="empty">
					{this.props.noValueOptionName}
				</option>
			)
		}

		console.log("self.props.disabled", self.props.disabled);
		return (
			<label>
				{self.props.label}
				<select ref="select" onChange={this.handleChange} value={this.props.value} disabled={self.props.disabled || false}>
					{options}
				</select>
			</label>
		)
	}
})

module.exports = ResourceSelect;
