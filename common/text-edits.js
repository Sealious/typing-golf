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
	    end: state.start +1
    }
}

edits.delete = function(state){
    if(state.start != state.end){
	var new_text = splice(state.text, state.start, Math.abs(state.end-state.start), "");
	return {
	    text: new_text,
	    start: state.start,
	    end: state.start
	}
    }else{
	var new_text = splice(state.text, state.start, 1, "");
	return {
	    text: new_text,
	    start: state.start,
	    end: state.end
	}
    }
}

edits.end = function(state){
    return {
	text: state.text,
	start: state.text.length-1,
	end: state.text.length-1
    }
}

edits.home = function(state){
    return {
	text: state.text,
	start: 0,
	end: 0
    }
}

edits.shift_end = function(state){
    if(state.direction == "f"){
	return {
	    text: state.text,
	    start: state.start,
	    end: state.text.length-1,
	    direction: "f"
	}
    }else{
	return {
	    text: state.text,
	    start: state.end,
	    end: state.text.length-1,
	    direction: "f"
	}
    }
}

edits.shift_home = function(state){
    if(state.direction == "f"){
	return {
	    text: state.text,
	    start: 0,
	    end: state.start,
	    direction: "b"
	}
    }else{
	return {
	    text: state.text,
	    start: 0,
	    end: state.start,
	    direction: "b"
	}
    }
}

edits.backspace = function(state){
    if(state.end == state.start){
	return {
	    text: splice(state.text, state.start-1, 1, ""),
	    start: state.start-1,
	    end: state.start-1
	}
    }else{
	new_text = splice(state.text, state.start, state.end - state.start, "");
	return {
	    text: new_text,
	    start: state.start,
	    end: state.start
	}
    }
}

edits.next_word = function(state){
    if( state.start == state.end ){
	var right_half = state.text.slice(state.end, Infinity);
	var new_index = state.start + right_half.match(/\W/).index;
	if(new_index == -1 ){
	    return {
		text: state.text,
		start: state.text.length,
		start: state.text.length
	    }
	}else{
	    return {
		text: state.text,
		start: new_index,
		end: new_index
	    }
	}
    }else{
	return {
	    text: state.text,
	    start: state.end,
	    end: state.end
	}
    }
}

edits.prev_word = function(state){
    if( state.start == state.end ){
	var left_half = state.text.slice(0, text_start);
	var r = /\W/g;
	last_index = -1;
	match = null;
	do{
	    match = r.exec(left_half);
	    last_index = r.lastIndex;
	}while(match != null);
	new_index = last_index + 1;
	if(new_index == -1 ){
	    return {
		text: state.text,
		start: state.text.length,
		start: state.text.length
	    }
	}else{
	    return {
		text: state.text,
		start: new_index,
		end: new_index
	    }
	}
    }else{
	return {
	    text: state.text,
	    start: state.end,
	    end: state.end
	}
    }
}



module.exports = {edits: edits, any_char: any_char};
