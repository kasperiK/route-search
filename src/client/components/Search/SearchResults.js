import React, { useEffect, useState } from "react";
import SearchResultsList from './SearchResultsList';

const SearchResults = props => {
	const lines = props.data.linjastot;
	const roads = props.data.tiet;
	const shortestPath = props.shortestPath;
	const [linesAndStops, setLinesAndStops] = useState(null);
	const [linesStopsDistances, setLinesStopsDistances] = useState(null);

	const findCorrectLines = shortestPath => {
		let path = Array.from(shortestPath.path);
		let filteredLines = [];
		let linesAndStops = [];
		for (let line in lines) {
			const stopsInSameLine = path.filter(stop => lines[line].includes(stop));
			if (stopsInSameLine.length > 1)	filteredLines.push({line, 'stops': stopsInSameLine});
		}
		filteredLines.forEach(obj => {
			const stops = obj.stops;
			if (path.every(stop => stops.includes(stop))) linesAndStops.push(obj);
		});
		if (linesAndStops.length !== 0) {
			setLinesAndStops(linesAndStops);
		}	else {
			const getStopsInSameLine = pathParam => {
				let linesAndStopsArr = [];
				filteredLines.forEach(obj => {
					const stops = obj.stops;
					const line = obj.line;
					if (!linesAndStopsArr[line]) {
						linesAndStopsArr.push({line, "stops": []});
					}
					for (let i = 0; i < stops.length; i++) {
						const element = stops[i];
						if (pathParam.includes(element)) {
							linesAndStopsArr.forEach(item => {
								if (item.line === line) item.stops.push(element);
							})
						}
					}
				});
				linesAndStopsArr = linesAndStopsArr.filter(item => item.stops.length > 0);
				if (linesAndStopsArr.length > 1) {
					const getLongestLine = arr => arr.reduce((a, b) => {
						if (a && b) {
							return a.stops.length > b.stops.length ? a : b;
						}
					});
					let longestLineLength = getLongestLine(linesAndStopsArr);
					longestLineLength = longestLineLength.stops.length;
					const linesAndStopsFilteredByOrder = linesAndStopsArr.filter(obj => obj.stops.every((stop, i) => {
						if (pathParam[i] === stop) {
							return stop;
						}
					}));
					if (linesAndStopsFilteredByOrder.length > 1) {
						linesAndStopsArr = linesAndStopsFilteredByOrder.filter(item => {
							if (item.stops.length >= longestLineLength) {
								return item;
							}
						});
					}	else {
						linesAndStopsArr = linesAndStopsFilteredByOrder;
					}
					path = [linesAndStopsArr[0].stops[linesAndStopsArr[0].stops.length -1], ...pathParam.filter(item => !linesAndStopsArr[0].stops.includes(item))];
				}	else {
					linesAndStopsArr = linesAndStopsArr[0];
				}
				linesAndStops.push(...linesAndStopsArr);
			};
			while (path.length > 1) {
				getStopsInSameLine(path);
			}
			setLinesAndStops(linesAndStops);
		}
	};

	const setDistanceBetweenStops = linesAndStops => {
		const modifiedRoads = roads.map(road => {
			const modifiedObj = {'road': [road.mista, road.mihin], 'distance': road.kesto};
			return modifiedObj;
		});
		linesAndStops.forEach(obj => {
			const stops = obj.stops;
			stops.forEach((item, i) => {
				const currentStop = item;
				const nextStop = stops[i + 1];
				if (nextStop) {
					const path = [currentStop, nextStop];
					const pathDistance = modifiedRoads.filter(obj => path.every(stop => obj.road.includes(stop))).map(item => item.distance)[0];
					if (path.every(stop => obj.stops.includes(stop))) {
						let distance = obj.distance;
						if (distance) {
							obj.distance = distance + pathDistance;
						}	else {
							obj.distance = pathDistance;
						}
					}
				}
			});
		});
		setLinesStopsDistances(linesAndStops);
	};

	useEffect(() => {
		findCorrectLines(shortestPath);
	},[shortestPath]);

	useEffect(() => {
		if (linesAndStops) {
			setDistanceBetweenStops(linesAndStops);
		}
	},[linesAndStops]);

	return (
		<div className="SearchResults">
			<h2>Hakutulokset</h2>
			{linesStopsDistances && <SearchResultsList linesStopsDistances={linesStopsDistances} />}
		</div>
	);
};

export default SearchResults;