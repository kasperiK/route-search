const shortestDistNode = (distances, visited) => {
	let shortest = null;
	for (let node in distances) {
		let currentIsShortest = shortest === null || distances[node] < distances[shortest];
		if (currentIsShortest && !visited.includes(node)) {
			shortest = node;
		}
	} return shortest;
};

const findShortestPath = (adjList, startNode, endNode) => {
	let distances = {};
	distances[endNode] = 'Infinity';
	distances = Object.assign(distances, adjList[startNode]);
	const parents = {endNode: null};
	for (let child in adjList[startNode]) {
		parents[child] = startNode;
	}
	const visited = [];
	let node = shortestDistNode(distances, visited);
	while (node) {
		const distance = distances[node];
		const children = adjList[node];
		for (let child in children) {
			if (String(child) === String(startNode)) {
				continue;
			}	else {
				const newDistance = distance + children[child];
				if (!distances[child] || distances[child] > newDistance) {
					distances[child] = newDistance;
					parents[child] = node;
				}
			}
		}
		visited.push(node);
		node = shortestDistNode(distances, visited);
	}
	const shortestPath = [endNode];
	let parent = parents[endNode];
	while (parent) {
		shortestPath.push(parent);
		parent = parents[parent];
	}
	shortestPath.reverse();
	const resultsObj = {
		distance: distances[endNode],
		path: shortestPath
	};
	return resultsObj;
};

export default findShortestPath;