var edits = require("./text-edits.js").edits;
var any_char = require("./text-edits.js").any_char;
var bfs = require("./bfs.js");

function s(text, start, end, direction, h){
    var ret =  {
		text: text,
		start: start,
		end: end,
		direction: direction,
		h: h,
    }

    if(direction == undefined) delete ret.direction;
	if( h == undefined) delete ret.h;
    return ret;
}

function children_fn(element){
	var children = [];
	for(var i in edits){
		var new_element = edits[i](element);
		new_element.edge = edits[i];
		children.push(new_element);
	}
	return children;
}

function accept_generator(solution){
	return function(element){
		//		console.log(element.text);
		if(element.start != solution.start){
			return false;
		}
		if(element.end != solution.end){
			return false;
		}
		if(solution.start != solution.end){
			if(solution.direction != element.direction){
				return false;
			}
		}

		if(element.text.length == solution.text.length){
//			console.log(element.text);
		}

		var to_replace = ".+?[]()*$^"
		var t = element.text;
		for(var i in to_replace){
			t = t.split(to_replace[i]).join( "\\" + to_replace[i] );
		}
		t = t.replace("\n", "\\n");
		t = t.replace(new RegExp(any_char, "g"), ".");
		r = new RegExp("^" + t + "$", "g");
		return r.test(solution.text);
	}
}

//var acceptor = accept_generator(s("ala ma kota", 0, 11,"f"));
//console.log(acceptor(edits.select_all(s("ala ma kota", 0, 0))));

module.exports = function(root, solution){
	console.log(root, solution);
	console.log("Task: transform:\n\n");
	console.log(root.text);
	console.log("\n\ninto:\n\n");
	console.log(solution.text);
	console.log("\n\n");
	root.edge = null;
	var solution = bfs(
		root,
		children_fn,
		accept_generator(solution)
	);

	console.log("Solution:");
	var steps = [];
	var current = solution;
	while(current.parent != null && current.parent != current){
		current.edge = {desc: current.edge.desc, spec: current.edge.spec};
		steps.unshift(current);
		current = current.parent;
	}

	var ret = steps.map(function(s){return s.edge});
	console.log(ret);
	return ret;
	//console.log(steps.map(function(s){return {text: s.text, start: s.start, end:s.end, key: s.edge.desc, direction: s.direction}}));

//    return steps;
}
