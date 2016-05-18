var start = 1;
var end = 35;

var options = [];
var counter = 0;
var current_length = 0;

function successor(element){
	// console.log('adding', element+1, element+2)
	return [element+1, element+2]
}

function search(){
	var a = successor(options[0])
	for (var i = 0; i < a.length; i++) {
		if (accept(a[i])) {
			console.log('found')
			return true
		}else{
			options.push(a[i])
		}
	}

	options.splice(0, 1);
	return false;

}

function accept(element) {
	// console.log("comapring", element, end)
	if (element === end) return true;
	else return false;
}


function bfs(){
	options.push(start);

	while (!search()) {
		counter += 1;
		if (counter % 90000) {
			console.log(counter)
		}
		// if (counter == 10) {
		// 	break;
		// }
		// console.log(counter)
	}

}

bfs()
