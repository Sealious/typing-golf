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
		children.push(edits[i](element));
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


bfs(
	s("ala ma kota", 11, 11),
	children_fn,
	accept_generator(s("ala ma kota12345", 0, 0, "f"))
);
