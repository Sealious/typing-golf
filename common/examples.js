var solver = require("./solver.js");

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

var examples = [
	{
		from: s("aaa", 3,3),
		to:   s("aaaaa", 5, 5)
	}
]



 for(var i in examples){
 	solver(examples[i].from, examples[i].to);
 }


//solver(examples[0].from, examples[0].to);
