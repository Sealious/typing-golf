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

var object = new Sealious.FieldType({
	name: "object"
});

var Task = new Sealious.ResourceType({
	name: "task",
	fields: [
		{name: "json", type: "text", required: true}
	]
});

var Rank = new Sealious.ResourceType({
	name: "rank",
	fields: [
		{name: "user", type: "text", required: true},
		{name: "highscore", type: "int", required: true}
	]
});

Sealious.start();
