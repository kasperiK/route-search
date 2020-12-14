import React, { useEffect, useState } from "react";
import SearchResultsListItem from './SearchResultsListItem';

const SearchResultsList = ({linesStopsDistances}) => {
	const uniqueLines = [];
	linesStopsDistances.forEach(item => {
		const sameStop = uniqueLines.find(line => item.stops.every(stop => line.stops.includes(stop)));
		if (sameStop) {
			sameStop.lines = [sameStop.line, item.line];
			return;
		}
		uniqueLines.push(item);
	});
	let wholeDistance = 0;
	uniqueLines.forEach(item => {
		wholeDistance += item.distance;
		if (item.distance === 1) wholeDistance += 1;
	});
	console.log(uniqueLines);
	return (
	<div>
		<h2>Nopein reitti (kokonaisaika {wholeDistance}):</h2>
		<div className="SearchResults__Lines">
		{	uniqueLines.length ?
			uniqueLines.map((item, i) => (
				<SearchResultsListItem
					key={i}
					line={item.line}
					lines={item.lines}
					stops={item.stops}
					wholeDistance={wholeDistance}
					distance={item.distance}
				/>
			))
			:
			<h3>Ei reittejä valitsemillesi pysäkeille</h3>
		}
		</div>
	</div>
	);
};

export default SearchResultsList;