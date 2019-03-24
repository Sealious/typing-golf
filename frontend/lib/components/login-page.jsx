const React = require("react");
const url = "http://localhost:4444/api/v1";
const testUser = {
	username: "admin",
	password: "sealcode1",
};

var LoginPage = React.createClass({
	getInitialState: function() {
		return {
			username: "",
			password: "",
		};
	},

	dispatchFormData: function(state) {
		const formData = new FormData();
		for (var name in state) {
			formData.append(name, state[name]);
		}
		return formData;
	},

	login: function(e) {
		e.preventDefault();

		fetch(`${url}/sessions`, {
			method: "POST",
			body: this.dispatchFormData(this.state),
		})
			.then(res => res.json())
			.then(response => console.log("Success:", JSON.stringify(response)))
			.catch(error => console.error("Error:", error));
	},

	createTestUser: function() {
		fetch(`${url}/users`, {
			method: "POST",
			body: this.dispatchFormData(testUser),
		})
			.then(res => res.json())
			.then(response => console.log("Success:", JSON.stringify(response)))
			.catch(error => console.error("Error:", error));
	},

	handleInputChange(event) {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value,
		});
	},

	render: function() {
		return (
			<div className="login-container">
				<button onClick={this.createTestUser}>Create test user</button>
				<br />
				<input
					type="text"
					name="username"
					placeholder="login"
					onChange={this.handleInputChange}
					value={this.state.username}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					onChange={this.handleInputChange}
					value={this.state.password}
				/>
				<button onClick={this.login}>Sign in</button>
			</div>
		);
	},
});

module.exports = LoginPage;
