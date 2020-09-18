import React, { useEffect, useState } from "react";
import SearchResultsListItem from './SearchResultsListItem';

const SearchResultsList = ({linesStopsDistances}) => {
	console.log(linesStopsDistances);
	return (
	<div>
	LIST
		{
			linesStopsDistances.map((item, i) => (
				<SearchResultsListItem
					key={i}
					line={item.line}
					stops={item.stops}
					distance={item.distance}
				/>
			))
		}
	</div>
	);
};

export default SearchResultsList;