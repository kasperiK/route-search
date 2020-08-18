import React, { useEffect, useState } from "react";

const SearchResults = props => {
	const lines = props.data.linjastot;
	const roads = props.data.tiet;
	const shortestPath = props.shortestPath;

	const findCorrectLines = shortestPath => {
		const origPath = shortestPath.path;
		let path = Array.from(shortestPath.path);
		let linesAndStops = [];
		const stopsWithNoLine = [];
		let allLinesFound = false;
		console.log(lines);
		console.log(path);
		const stopsInSameLine = path => {
			for (let line in lines) {
				console.log(path);
				const stopsInSameLine = path.every(stop => lines[line].includes(stop));
				if (stopsInSameLine) {
					linesAndStops.push({'stops': path, line});
				}
			}
		};
		stopsInSameLine(path);
		while (!allLinesFound) {
			if (linesAndStops.length === 0) {
				stopsWithNoLine.push(path.pop());
				stopsInSameLine(path);
			}	else {
				stopsWithNoLine.sort((a, b) => origPath.indexOf(a) - origPath.indexOf(b));
				const stopsWithNoLineFiltered = stopsWithNoLine.filter(stop => {
					const stopWithLine = linesAndStops.some(line => {
						console.log(line.stops);
						console.log(stop);
						return line.stops.includes(stop)
					});
					if (!stopWithLine) return stop;
				});
				console.log(stopsWithNoLineFiltered);
				if (stopsWithNoLineFiltered.length === 0) {
					allLinesFound = true;
				}	else {
					console.log('pysäk');
					console.log(path);
					// PATHI EI TOIMI YLI KAHELLA LINJALLA
					path = [path[path.length - 1], ...stopsWithNoLineFiltered];
					console.log(path);
					stopsInSameLine(path);
					if (path.length > 4) path.pop();
				}
			}
		}
		console.log(linesAndStops);
	};

	findCorrectLines(shortestPath);

	return (
		<div className="SearchResults">Hakutulokset</div>
	);
};

export default SearchResults;
