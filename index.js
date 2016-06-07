var path = require("path");
var Sealious = require("sealious");
var solver = require("./common/solver.js");

Sealious.init();

var www_server = Sealious.ChipManager.get_chip("channel", "www_server");

www_server.static_route(path.resolve(module.filename, "../frontend/public"), "")


www_server.route({
	path: "/api/v1/count_steps",
	method: "POST",
	handler: function(context, request){
		return solver(request.payload.from, request.payload.to);
	}
});

Sealious.start();
