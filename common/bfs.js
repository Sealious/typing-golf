function bfs(root, children, hash_fn, accept){
	var iteration = 0;
	var queue = []
	queue.push(root);

	visited = new Set();

	the_element = root;
	visited.add(hash_fn(the_element));
	found = accept(root);
	
	while(!found){
		var element = queue.shift();
		var new_elements = children(element);
		for(var i in new_elements){
			the_element = new_elements[i];
			var hash = hash_fn(the_element);
			//console.log(hash);
			if(!visited.has(hash)){
				visited.add(hash);
				the_element.parent = element;
				if(accept(the_element)){
					found = true;
					break;
				}else{
					queue.push(the_element);
				}
			}
		}
		iteration++;
		if(iteration % 10000 == 0) console.log("iteration: ", iteration);
	}
	return the_element;
}

module.exports = bfs;
