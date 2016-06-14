var rest = require("qwest");


var Promise = require("bluebird");

var Session = new function(){
	var cached_user_data;

	this.is_logged_in = function(){
		return rest.get("/api/v1/users/me")
	}

	this.get_user_data = function(){
		try{
			if(cached_user_data){
				return Promise.resolve(cached_user_data)
			}else{
				return rest.get("/api/v1/users/me")
				.then(function(xml, data){
					cached_user_data = data;
					return data;
				}).catch(function(e){
					console.log(e);
				})
			}			
		}catch(e){
			console.error(e);
		}
		
	}

	this.is_admin = function(){
		return rest.get("/api/v1/users/me")
		.then(function(xml, user_data){
			if(user_data.body.role === "admin"){
				return true;
			}else{
				return false;
			}
		})
	}

	this.attempt_log_in = function(username, password){
		var payload = {
			username: username,
			password: password
		}
		return rest.post("/api/v1/sessions", payload)
		.then(function(status, xml, response){
			return response;
		}).catch(function(status,xml, response){
			console.log("!");
			return Promise.reject(response);
		})
	}

	this.log_out = function(){
		return rest.delete("/api/v1/sessions/current")
	}
}

module.exports = Session;
