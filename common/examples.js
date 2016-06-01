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
		from: s("ala ma kota", 7,7),
		to:   s("ala ma psa", 10, 10)
	},
	{
		from: s("ala ma kota", 0, 0),
		to:   s("ela ma kota", 1, 1)
	},
	{
		from: s("ala ma kota", 11, 11),
		to:   s("ela ma kota", 11, 11)
	},
	{
		from: s("ala\nma\nkota\ni\npsa", 5, 5),
		to:   s("ala\nm", 5, 5)
	},
	{
		from: s("Jakub Orlik", 5, 5),
		to:   s("Jan Orlik", 3, 3)
	}
]



 for(var i in examples){						    
 	solver(examples[i].from, examples[i].to);
 }


//solver(examples[0].from, examples[0].to);

