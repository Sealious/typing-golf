var assert = require("assert");
var e = require("deep-equal");

var text_edits = require("./text-edits.js");

var edits = text_edits.edits;
var any_char = text_edits.any_char;


function s(text, start, end, direction){
    var ret =  {
	text: text,
	start: start,
	end: end,
	direction: direction
    }

    if(direction == undefined) delete ret.direction;
    return ret;
}

assert.deepEqual(
    edits.insert_char(s("ala ma kota", 11, 11)),
    s("ala ma kota" + any_char, 12, 12)
)

assert.deepEqual(
    edits.insert_char(s("ala ma kota", 0, 0)),
    s(any_char + "ala ma kota", 1, 1)
)

assert.deepEqual(
    edits.insert_char(s("ala ma kota", 1, 1)),
    s("a" + any_char + "la ma kota", 2, 2)
)

assert.deepEqual(
    edits.insert_char(s("ala ma kota", 0, 11)),
    s(any_char, 1, 1)
)

assert.deepEqual(
    edits.insert_char(s("ala ma kota", 1, 11)),
    s("a" + any_char, 2, 2)
)

assert.deepEqual(
    edits.delete(s("ala ma kota", 0, 0)),
    s("la ma kota", 0, 0)
)

assert.deepEqual(
    edits.delete(s("ala ma kota", 11, 11)),
    s("ala ma kota", 11, 11)
)

assert.deepEqual(
    edits.delete(s("ala ma kota", 10, 10)),
    s("ala ma kot",10, 10) 
)

assert.deepEqual(
    edits.delete(s("ala ma kota", 0, 3)),
    s(" ma kota", 0 ,0)
)

console.log("Passed all tests! :)")
