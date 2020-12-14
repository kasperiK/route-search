import React, { useEffect, useState } from "react";

const SearchResultsListItem = ({line, lines, stops, distance, wholeDistance}) => {
	const setWidth = (100 / wholeDistance) * (distance === 1 ? distance + 1 : distance);
	const lineWidth = {
		width: `${setWidth}%`,
	};
	const setLine = (line, stops, distance) => {
		return (
			<div>
				<div className="SearchResults__LineStops">
					<h4>Pysäkit: {stops.join(', ')}</h4>
					<h4>Linjan aika: {distance}</h4>
				</div>
				<div className={"SearchResults__Line " + line}></div>
			</div>
		);
	}
	const setLines = (lines, stops, distance) => {
		return lines.map((line, i) => {
			return (
			<div className="SearchResults__LineMultiple" key={i}>
				<div className="SearchResults__LineStops">
					<h4>Pysäkit: {stops.join(', ')}</h4>
					<h4>Linjan aika: {distance}</h4>
				</div>
				<div className={"SearchResults__Line " + line}></div>
			</div>
			);
		})
	}
	return (
		<div className="SearchResults__Item" style={lineWidth}>
			{lines ? setLines(lines, stops, distance) : setLine(line, stops, distance)}
		</div>
	);
};

export default SearchResultsListItem;