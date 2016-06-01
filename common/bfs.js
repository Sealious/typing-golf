function bfs(root, children, accept){
	var iteration = 0;
	var queue = []
	queue.push(root);

	the_element = root;
	found = accept(root);
	
	while(!found){
		var element = queue.shift();
		var new_elements = children(element);
		for(var i in new_elements){
			the_element = new_elements[i];
			new_elements[i].parent = element;
			if(accept(new_elements[i])){
				found = true;
				break;
			}else{
				queue.push(new_elements[i]);
			}
		}
		iteration++;
		if(iteration % 100 == 0) console.log("iteration: ", iteration);
	}
	console.log("found!", the_element);
}

module.exports = bfs;
