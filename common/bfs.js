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
			the_element.parent = element;
			if(accept(the_element)){
				found = true;
				break;
			}else{
				queue.push(the_element);
			}
		}
		iteration++;
		if(iteration % 10000 == 0) console.log("iteration: ", iteration);
	}
	return the_element;
}

module.exports = bfs;
