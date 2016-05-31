var assert = require("assert")

var edits = {}

// var chars = "1234567890-=qwertyuiop[]\asdfghjkl;'zxcvbnm,./~`!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?"

function splice(str, index, count, add) {
    return str.slice(0, index) + (add || "") + str.slice(index + count);
}

var any_char = "𝛆";

edits.insert_char = function(state) {
    var new_text = splice(state.text, state.start, state.end - state.start, any_char);
    return {
        text: new_text,
        start: state.start + 1,
        end: state.start + 1
    }
}

edits.delete = function(state) {
    if (state.start != state.end) {
        var new_text = splice(state.text, state.start, Math.abs(state.end - state.start), "");
        return {
            text: new_text,
            start: state.start,
            end: state.start
        }
    } else {
        var new_text = splice(state.text, state.start, 1, "");
        return {
            text: new_text,
            start: state.start,
            end: state.end
        }
    }
}

edits.end = function(state) {
    return {
        text: state.text,
        start: state.text.length,
        end: state.text.length
    }
}

edits.home = function(state) {
    return {
        text: state.text,
        start: 0,
        end: 0
    }
}

edits.ctrl_shift_end = function(state) {
    if (state.direction == "f") {
        return {
            text: state.text,
            start: state.start,
            end: state.text.length,
            direction: "f"
        }
    } else {
        return {
            text: state.text,
            start: state.end,
            end: state.text.length,
            direction: "f"
        }
    }
}

edits.ctrl_shift_home = function(state) {
    if (state.direction == "f") {
        return {
            text: state.text,
            start: 0,
            end: state.start,
            direction: "b"
        }
    } else {
        return {
            text: state.text,
            start: 0,
            end: state.end,
            direction: "b"
        }
    }
}

edits.backspace = function(state) {
    if (state.end == state.start) {
        if (state.start == 0) return state;
        return {
            text: splice(state.text, state.start - 1, 1, ""),
            start: state.start - 1,
            end: state.start - 1
        }
    } else {
        new_text = splice(state.text, state.start, state.end - state.start, "");
        return {
            text: new_text,
            start: state.start,
            end: state.start
        }
    }
}

edits.next_word = function(state) {
    if (state.start == state.end) {
        var right_half = state.text.slice(state.end, Infinity);
		var shift = 0;
		var pre_match = right_half.match("^(\\W+)\\w");
		if(pre_match != null) shift = pre_match[1].length
		right_half = right_half.slice(shift);
        var match_result = right_half.match(/\W/);
        if (match_result == null) {
            return {
                text: state.text,
                start: state.text.length,
                end: state.text.length
            }
        }
        var new_index = state.start + match_result.index + shift
        if (new_index == -1) {
            return {
                text: state.text,
                start: state.text.length,
                start: state.text.length
            }
        } else {
            return {
                text: state.text,
                start: new_index,
                end: new_index
            }
        }
    } else {
        return {
            text: state.text,
            start: state.end,
            end: state.end
        }
    }
}

edits.prev_word = function(state) {
    if (state.start == state.end) {
        var left_half = state.text.slice(0, state.start);
		var m = left_half.replace(/\w+\W*$/g, "");
		var new_index = m.length;
        return {
            text: state.text,
            start: new_index,
            end: new_index
        }
    } else {
        return {
            text: state.text,
            start: state.start,
            end: state.start
        }
    }
}


edits.select_prev_word = function(state) {
    var prev = edits.prev_word(state);
	if(state.direction == "f"){
		return {
			text: state.text,
			start: prev.start,
			end: state.start,
			direction: "b"
		}
	}else{
		if(state.start != state.end){
			prev = edits.prev_word(prev);
		}
		return {
			text: state.text,
			start: prev.start,
			end: state.end,
			direction: "b"
		}
	}
}

edits.select_next_word = function(state){
	var next = edits.next_word(state);
	if(state.direction == "f"){
		if(state.start != state.end){
			//when you have 1 or more characters selected, ctrl+right only move the pointer to the end of the selection, not to the end of the word boundary
			next = edits.next_word(next);
		}
		return {
			text: state.text,
			start: state.start,
			end: next.start,
			direction: "f"
		}
	}else{
		return {
			text: state.text,
			start: state.end,
			end: next.start,
			direction: "f"
		}
	}
}

edits.delete_prev_word = function(state) {
	if(state.start == state.end){
		state = edits.select_prev_word(state);
	}
	return edits.backspace(state);
}

edits.delete_next_word = function(state){
	if(state.start == state.end){
		state = edits.select_next_word(state);
	}
	return edits["delete"](state);
}

edits.shift_home = function(state){
	var moving_index = "start";
	if(state.direction == "f"){
		moving_index = "end";
	}
	var left_half = state.text.slice(0, state[moving_index]);
	var m = left_half.replace(/\n.*$/, "");
	var new_index = m.length + 1;
	if(m.length == left_half.length) new_index = 0;
	if(moving_index == "start"){
		return {
			text: state.text,
			start: Math.min(new_index, state.end),
			end: Math.max(new_index, state.end),
			direction: new_index < state.end? "b" : state.direction || "b"
		}
	}else{
		return {
			text: state.text,
			start: Math.min(new_index, state.start),
			end: Math.max(new_index, state.start),
			direction: new_index < state.start? "b" : state.direction || "b"
		}
	}
}

edits.shift_end = function(state){
	var moving_index = "start";
	if(state.direction == "f"){
		moving_index = "end";
	}
	var right_half = state.text.slice(state[moving_index], Infinity);
	var m = right_half.indexOf("\n");
	var new_index;
	if(m == -1){
		new_index = state.text.length;
	}else{
		new_index = state[moving_index] + m;
	}
	if(moving_index == "start"){
		return {
			text: state.text,
			start: Math.min(state.end, new_index),
			end: Math.max(state.end, new_index),
			direction: new_index > state.start ? "f" : state.direction || "f"
		}
	}else{
		return {
			text: state.text,
			start: Math.min(state.start, new_index),
			end: Math.max(state.start, new_index),
			direction: new_index < state.start ? "b" : state.direction || "f"
		}
	}
}

edits.select_all = function(state){
	return {
		text: state.text,
		start: 0,
		end: state.text.length,
		direction: "f",
	}
}

edits.select_left = function(state){
	if(state.direction == "f"){
		var new_end = Math.max(state.end - 1, 0);
		return {
			text: state.text,
			start: Math.min(new_end, state.start),
			end: Math.max(new_end, state.start),
			direction: new_end < state.start ? "b" : "f"
		}
	}else{
		return {
			text: state.text,
			start: Math.max(state.start -1 , 0),
			end: state.end,
			direction: "b"
		}
	}
}

edits.select_right = function(state){
	if(state.direction == "b"){
		var new_start = Math.min(state.text.length, state.start + 1);
		return {
			text: state.text,
			start: Math.min(new_start, state.end),
			end: Math.max(new_start, state.end),
			direction: new_start > state.end ? "f" : "b"
		}
	}else{
		return {
			text: state.text,
			start: state.start,
			end: Math.min(state.text.length, state.end + 1),
			direction: "f",
		}
	}
}

edits.control_home = function(state){
	return {
		text: state.text,
		start: 0,
		end: 0
	}
}

edits.control_end = function(state){
	return {
		text: state.text,
		start: state.text.length,
		end: state.text.length
	}
}

function get_h_offset(state){
	var moving_index = "end";
	if(state.direction == "b"){
		moving_index = "start";
	}
	var left_half = state.text.slice(0, state[moving_index])
	if(left_half.lastIndexOf("\n") == "-1"){
		return state[moving_index];
	}
	var ret = left_half.slice(left_half.lastIndexOf("\n"), Infinity).length - 1;
	return ret;
}

function get_v_offset(state){
	var moving_index = "end";
	if(state.direction == "b"){
		moving_index = "start";
	}
	var lines = state.text.split("\n");
	var current_index = 0;
	var the_line = 0;
	for(var i in lines){
		var new_index = parseInt(current_index) + lines[i].length + 1;
		if(new_index > state[moving_index]){
			the_line = i;
			break;
		}
		current_index = new_index;
	}
	return the_line;
}

function hv2i(state, v, h){
	assert(!isNaN(h));
	var lines = state.text.split("\n");
	var ret = lines
		.slice(0, v)
		.map(function(a){
			return a.length + 1;
		})
		.reduce(function(a,b){
			return a + b;
		}, 0) + Math.min(h, lines[v].length);
	return ret;
}

edits.shift_up = function(state){
	var h_offset;
	if(state.h == undefined){
		h_offset = get_h_offset(state);
	}else{
		h_offset = state.h;
	}
	var v_offset = get_v_offset(state);
	var lines = state.text.split("\n");
	if(v_offset == 0){
		return edits.shift_home(state);
	}

	var direction;
	var new_offset = hv2i(state, v_offset-1, h_offset);
	if(state.direction== "f"){
		var start = Math.min(new_offset, state.start);
		var end = Math.max(new_offset, state.start);
		if(new_offset<state.start){
			direction = "b";
		}else{
			direction = "f";
		}
	}else{
		var start = Math.min(new_offset, state.end);
		var end = Math.max(new_offset, state.end);
		if(new_offset > state.end){
			direction = "f";
		}else{
			direction = "b";
		}
	}
	
	return {
		text: state.text,
		start:start,
		end: end,
		direction: direction,
		h: h_offset
	}
}

edits.shift_down = function(state){
	var h_offset;
	if(state.h == undefined){
		h_offset = get_h_offset(state);
	}else{
		h_offset = state.h;
	}
	var v_offset = get_v_offset(state);
	var lines = state.text.split("\n");
	if(v_offset == lines.length-1){
		return edits.shift_end(state);
	}

	var direction;
	var new_offset = hv2i(state, parseInt(v_offset)+1, h_offset);
	if(state.direction== "f"){
		var start = Math.min(new_offset, state.start);
		var end = Math.max(new_offset, state.start);
		if(new_offset<state.start){
			direction = "b";
		}else{
			direction = "f";
		}
	}else{
		var start = Math.min(new_offset, state.end);
		var end = Math.max(new_offset, state.end);
		if(new_offset > state.end){
			direction = "f";
		}else{
			direction = "b";
		}
	}
	
	return {
		text: state.text,
		start:start,
		end: end,
		direction: direction,
		h: h_offset
	}
}


module.exports = {
    edits: edits,
    any_char: any_char,
	get_h_offset: get_h_offset,
	get_v_offset: get_v_offset,
	hv2i: hv2i
};
