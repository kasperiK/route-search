import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import "./App.css";
import SearchForm from './components/Search/SearchForm';
import SearchResults from './components/Search/SearchResults';
import findShortestPath from './Utils';

const App = () => {
	const [data, setData] = useState(null);
	const [adjList, setadjList] = useState();
	const [shortestPath, setShortestPath] = useState(null);

	const makeSearch = (stopFrom, stopTo) => {
		const isShortestPath = findShortestPath(adjList, stopFrom, stopTo);
		setShortestPath(isShortestPath);
	};

	const createAdjList = data => {
		let graph = {};
		const addLines = (from, to, weight) => {
			graph[from] = Object.assign(graph[from], {[to]: weight})
		};
		data.pysakit.forEach(stop => {
			graph[stop] = {}
		});
		data.tiet.forEach(tie => {
			const from = tie.mista;
			const to = tie.mihin;
			const weight = tie.kesto;
			addLines(from, to, weight);
			addLines(to, from, weight);
		});
		setadjList(graph);
	};

	useEffect(() => {
		async function getData() {
			const response = await fetch('/api');
			const data = await response.json();
			return data;
		}
		getData().then(res => {
			setData(res);
			createAdjList(res);
		});
	},[]);

	return (
	<div className="RouteContainer">
		<div className="RouteHeader">
			<h1>Löydä nopein reitti valitsemiesi pysäkkien välillä</h1>
		</div>
		{ data && <SearchForm data={data} makeSearch={makeSearch}  />}
		{ shortestPath && <SearchResults data={data} shortestPath={shortestPath} />}
	</div>
	);
};

export default App;