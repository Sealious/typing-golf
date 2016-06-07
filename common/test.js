var assert = require("assert");
var e = require("deep-equal");

var text_edits = require("./text-edits.js");

var edits = text_edits.edits;

console.log(Object.keys(edits).length, "edits!")

var any_char = text_edits.any_char;
var get_h_offset = text_edits.get_h_offset;
var get_v_offset = text_edits.get_v_offset;
var hv2i = text_edits.hv2i;


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

de = assert.deepEqual;

de(
	edits.insert_char(s("a", 1, 1)),
	s("a" + any_char, 2, 2)
);

de(
	edits.insert_char(s("bac", "1", "1")),
	s("b" + any_char + "ac", 2, 2)
);

de(
	edits.insert_char(s("bac", 1, 1)),
	s("b" + any_char + "ac", 2, 2)
);

de(
    edits.insert_char(s("ala ma kota", 11, 11)),
    s("ala ma kota" + any_char, 12, 12)
)

de(
    edits.insert_char(s("ala ma kota", 0, 0)),
    s(any_char + "ala ma kota", 1, 1)
)

de(
    edits.insert_char(s("ala ma kota", 0,0)),
    s(any_char + "ala ma kota", 1, 1)
)

de(
	edits.delete(s(any_char + "ala ma kota", 1, 1)),
	s(any_char + "la ma kota", 1, 1));

de(
    edits.insert_char(s("ala ma kota", 0, 11)),
    s(any_char, 1, 1)
)

de(
    edits.insert_char(s("ala ma kota", 1, 11)),
    s("a" + any_char, 2, 2)
)

de(
	edits.insert_char(s("ala ma kota", 1, 1)),
	s("a" + any_char + "la ma kota", 2, 2)
);

de(
    edits.delete(s("ala ma kota", 0, 0)),
    s("la ma kota", 0, 0)
)

de(
    edits.delete(s("ala ma kota", 11, 11)),
    s("ala ma kota", 11, 11)
)

de(
    edits.delete(s("ala ma kota", 10, 10)),
    s("ala ma kot",10, 10) 
)

de(
    edits.delete(s("ala ma kota", 0, 3)),
    s(" ma kota", 0 ,0)
)

de(
  edits.end(s("ala ma kota", 0, 0)),
  s("ala ma kota", 11, 11)
)

de(
  edits.end(s("ala ma kota", 0, 5)),
  s("ala ma kota", 11, 11)
)

de(edits.home(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 0)
)

de(edits.home(s("ala ma kota", 5, 7)),
   s("ala ma kota", 0, 0)
)

de(edits.ctrl_shift_end(s("ala ma kota", 3, 6, "f")),
   s("ala ma kota", 3, 11, "f"))

de(edits.ctrl_shift_end(s("ala ma kota", 3, 6, "b")),
   s("ala ma kota", 6, 11, "f"))

de(edits.ctrl_shift_end(s("ala ma kota", 3, 3)),
   s("ala ma kota", 3, 11, "f"))

de(edits.ctrl_shift_home(s("ala ma kota", 3, 6, "f")),
   s("ala ma kota", 0, 3, "b"))

de(edits.ctrl_shift_home(s("ala ma kota", 3, 6, "b")),
   s("ala ma kota", 0, 6, "b"))

de(edits.ctrl_shift_home(s("ala ma kota", 3, 3)),
   s("ala ma kota", 0, 3, "b"))

de(edits.ctrl_shift_home(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 0, "b"))

de(edits.backspace(s("ala ma kota", 11, 11)),
   s("ala ma kot", 10, 10))

de(edits.backspace(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 0))

de(edits.backspace(s("ala ma kota", 0, 3)),
   s(" ma kota", 0, 0))

de(edits.backspace(s("ala ma kota", 3, 11)),
   s("ala", 3, 3)) 

de(edits.next_word(s("ala ma kota", 0, 0)),
   s("ala ma kota", 3, 3))

de(edits.next_word(s("ala ma kota", 11, 11)),
   s("ala ma kota", 11, 11))

de(edits.next_word(s("ala ma kota", 9, 9)),
   s("ala ma kota", 11, 11))

de(edits.next_word(s("", 0, 0)),
   s("", 0, 0))

de(edits.next_word(s("ala ma kota", 3, 3)),
   s("ala ma kota", 6, 6))

de(edits.next_word(s("ala ma kota", 0, 1, "f")),
   s("ala ma kota", 1, 1))

de(edits.prev_word(s("ala ma kota", 0 ,0)),
   s("ala ma kota", 0, 0))

de(edits.prev_word(s("", 0, 0)),
   s("", 0, 0))

de(edits.prev_word(s("ala ma kota", 3, 3)),
   s("ala ma kota", 0, 0))

de(edits.prev_word(s("ala ma kota", 4, 4)),
   s("ala ma kota", 0, 0))

de(edits.prev_word(s("ala ma kota", 0, 4, "f")),
   s("ala ma kota", 0, 0))

de(edits.prev_word(s("ala ma kota", 0, 4, "b")),
   s("ala ma kota", 0, 0))

de(edits.prev_word(s("ala ma kota", 1, 1, "b")),
   s("ala ma kota", 0, 0));

de(edits.select_prev_word(s("ala ma kota", 3, 3)),
   s("ala ma kota", 0, 3, "b"));

de(edits.select_prev_word(s("ala ma kota", 1, 2, "f")),
   s("ala ma kota", 1, 1, "b"))

de(edits.select_prev_word(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 0, "b"));

de(edits.select_prev_word(s("ala ma kota", 4, 4)),
   s("ala ma kota", 0, 4, "b"))

de(edits.select_prev_word(s("ala ma kota", 1, 2, "f")),
   s("ala ma kota", 1, 1, "b"))

de(edits.select_prev_word(s("ala ma kota", 1, 2, "b")),
   s("ala ma kota", 0, 2, "b"))

de(edits.select_prev_word(s("ala ma kota", 11, 11)),
   s("ala ma kota", 7, 11, "b"));

de(edits.select_next_word(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 3, "f"))

de(edits.select_next_word(s("ala ma kota", 0, 1, "f")),
   s("ala ma kota", 0, 3, "f"))

de(edits.select_next_word(s("ala ma kota", 3, 3)),
   s("ala ma kota", 3, 6, "f"))

de(edits.select_next_word(s("ala ma kota", 11, 11)),
   s("ala ma kota", 11, 11, "f"))

de(edits.select_next_word(s("ala ma kota", 8, 9, "f")),
   s("ala ma kota", 8, 11, "f"))

de(edits.select_next_word(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 3, "f"))

de(edits.select_next_word(s("ala ma kota", 0, 3, "b")),
   s("ala ma kota", 3, 3, "f"))

de(edits.select_next_word(s("ala ma kota", 3, 3, "f")),
   s("ala ma kota", 3, 6, "f"))

de(edits.delete_prev_word(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 0, "b"));

de(edits.delete_prev_word(s("ala ma kota", 1, 1)),
   s("la ma kota", 0, 0));

de(edits.delete_prev_word(s("ala ma kota", 8, 10, "f")),
   s("ala ma ka", 8, 8))

de(edits.delete_prev_word(s("ala ma kota", 11, 11)),
   s("ala ma ", 7, 7))

de(edits.delete_prev_word(s("ala ma kota", 9, 11)),
   s("ala ma ko", 9, 9));

de(edits.delete_next_word(s("ala ma kota", 0, 0)),
   s(" ma kota", 0, 0));

de(edits.delete_next_word(s("ala ma kota", 11, 11)),
   s("ala ma kota", 11, 11));

de(edits.delete_next_word(s("ala ma kota", 10, 10)),
   s("ala ma kot", 10, 10));

de(edits.delete_next_word(s("ala ma kota", 6, 6)),
   s("ala ma", 6, 6));

de(edits.delete_next_word(s("ala ma kota", 3, 3)),
   s("ala kota", 3, 3));

de(edits.delete_next_word(s("ala ma kota", 9, 11)),
   s("ala ma ko", 9, 9));

de(edits.shift_home(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 0, "b"));

de(edits.shift_home(s("ala ma kota", 3, 3)),
   s("ala ma kota", 0, 3, "b"));

de(edits.shift_home(s("ala\nma\nkota", 5, 5)),
   s("ala\nma\nkota", 4, 5, "b"));

de(edits.shift_home(s("ala\nma\nkota", 4, 5, "b")),
   s("ala\nma\nkota", 4, 5, "b"));

de(edits.shift_home(s("ala\nma\nkota\ni\npsa", 5, 17, "b")),
   s("ala\nma\nkota\ni\npsa", 4, 17, "b"))

de(edits.shift_home(s("ala\nma\nkota\ni\npsa", 5, 6, "f")),
   s("ala\nma\nkota\ni\npsa", 4, 5, "b"))

de(edits.shift_home(s("ala\nma\nkota\ni\npsa", 5, 17, "f")),
   s("ala\nma\nkota\ni\npsa", 5, 14, "f"))

de(edits.shift_end(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 11, "f"));

de(edits.shift_end(s("ala ma kota", 11, 11)),
   s("ala ma kota", 11, 11, "f"));

de(edits.shift_end(s("ala\nma\nkota", 5, 5)),
   s("ala\nma\nkota", 5, 6, "f"));

de(edits.shift_end(s("ala\nma\nkota", 4, 5, "b")),
   s("ala\nma\nkota", 5, 6, "f"));

de(edits.shift_end(s("ala\nma\nkota\ni\npsa", 5, 16, "b")),
   s("ala\nma\nkota\ni\npsa", 6, 16, "b"))

de(edits.shift_end(s("ala\nma\nkota\ni\npsa", 5, 16, "f")),
   s("ala\nma\nkota\ni\npsa", 5, 17, "f"))

de(edits.shift_end(s("ala\nma\nkota\ni\npsa", 5, 17, "f")),
   s("ala\nma\nkota\ni\npsa", 5, 17, "f"))

de(edits.shift_end(s("ala\nma\nkota\ni\npsa", 5, 6, "f")),
   s("ala\nma\nkota\ni\npsa", 5, 6, "f"))

de(edits.select_all(s("ala ma kota", 3, 5)),
   s("ala ma kota", 0, 11, "f"))

de(edits.select_left(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 0, "b"));

de(edits.select_left(s("ala ma kota", 1, 1)),
   s("ala ma kota", 0, 1, "b"))

de(edits.select_left(s("ala ma kota", 0, 1, "b")),
   s("ala ma kota", 0, 1, "b"))

de(edits.select_left(s("ala ma kota", 0, 11, "b")),
   s("ala ma kota", 0, 11, "b"))

de(edits.select_left(s("ala ma kota", 0, 11, "f")),
   s("ala ma kota", 0, 10, "f"))

de(edits.select_left(s("ala ma kota", 3, 5, "f")),
   s("ala ma kota", 3, 4, "f"))

de(edits.select_left(s("ala ma kota", 3, 4, "f")),
   s("ala ma kota", 3, 3, "f")),

de(edits.select_left(s("ala ma kota", 3, 3, "f")),
   s("ala ma kota", 2, 3, "b"));

de(edits.select_left(s("ala ma kota", 3, 3, "b")),
   s("ala ma kota", 2, 3, "b"));

de(edits.select_right(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 1, "f")),

de(edits.select_right(s("ala ma kota", 0, 1, "f")),
   s("ala ma kota", 0, 2, "f"));

de(edits.select_right(s("ala ma kota", 11, 11)),
   s("ala ma kota", 11, 11, "f"))

de(edits.select_right(s("ala ma kota", 10, 11, "f")),
   s("ala ma kota", 10, 11, "f"));

de(edits.select_right(s("ala ma kota", 10, 11, "b")),
   s("ala ma kota", 11, 11, "b"));

de(edits.select_right(s("ala ma kota", 10, 10)),
   s("ala ma kota", 10, 11, "f"))
   
de(edits.control_home(s("ala ma kota", 3, 3)),
   s("ala ma kota", 0, 0));

de(edits.control_end(s("ala ma kota", 3, 3)),
   s("ala ma kota", 11, 11));

assert.equal(
	get_h_offset(s("ala\nma\nkota", 5, 5)),
	1);

assert.equal(
	get_h_offset(s("ala\nma\nkota", 10, 11, "f")),
	4);

assert.equal(
	get_h_offset(s("ala\nma\nkota", 10, 11, "b")),
	3);

assert.equal(
	get_v_offset(s("ala ma kota", 2, 2)),
	0);

assert.equal(
	get_v_offset(s("ala\nma\nkota", 2, 2)),
	0);

assert.equal(
	get_v_offset(s("ala\nma\nkota", 5, 5)),
	1);

assert.equal(
	get_v_offset(s("ala\nma\nkota", 5, 11, "f")),
	2);

assert.equal(
	get_v_offset(s("ala\nma\nkota", 5, 11, "b")),
	1);

assert.equal(
	get_v_offset(s("ala\n\nma", 4, 6, "b")),
	1);

assert.equal(
	hv2i(s("ala ma kota", 5, 5), 0, 5),
	5);

assert.equal(
	hv2i(s("ala ma kota", 3, 4, "f"), 0, 3),
	3)

assert.equal(
	hv2i(s("ala ma kota", 3, 4, "b"), 0, 0),
	0);

assert.equal(
	hv2i(s("ala\nma\nkota", 1, 1, "f"), 1, 1),
	5)

assert.equal(
	hv2i(s("ala\nma\nkota", 1, 1, "f"), 2, 4),
	11)

assert.equal(
	hv2i(s("ala\nma\nkota", 1, 1, "f"), 2, 20),
	11)

de(edits.shift_up(s("ala\nma\nkota", 2, 2)),
   s("ala\nma\nkota", 0, 2, "b"));

de(edits.shift_up(s("ala\nma\nkota", 5, 5)),
   s("ala\nma\nkota", 1, 5, "b", 1));

de(edits.shift_up(s("ala\nma\nkota", 1, 5, "b")),
   s("ala\nma\nkota", 0, 5, "b"));

de(edits.shift_up(s("ala\nma\nkota", 5, 6, "f")),
   s("ala\nma\nkota", 2, 5, "b", 2));

de(edits.shift_up(s("ala\n\nma", 6, 6)),
   s("ala\n\nma", 4, 6, "b", 1));

de(edits.shift_up(s("ala\n\nma", 4, 6, "b", 1)),
   s("ala\n\nma", 1, 6, "b", 1));

de(edits.shift_down(s("ala ma kota", 0, 0)),
   s("ala ma kota", 0, 11, "f"));

de(edits.shift_down(s("ala ma kota", 0, 1, "f")),
   s("ala ma kota", 0, 11, "f"));

de(edits.shift_down(s("ala ma kota", 0, 1, "b")),
   s("ala ma kota", 1, 11, "f"))

de(edits.shift_down(s("ala\n\nma", 1, 1)),
   s("ala\n\nma", 1, 4, "f", 1))

de(edits.shift_down(s("ala\n\nma", 1, 4, "f", 1)),
   s("ala\n\nma", 1, 6, "f", 1));

de(edits.shift_down(s("ala\n\nma", 1, 6, "f", 1)),
   s("ala\n\nma", 1, 7, "f"));

de(edits.shift_end(s("ala\nma\nkota", 1, 5, "b")),
   s("ala\nma\nkota", 3, 5, "b"));


console.log("Passed all tests! :)")
