import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

const SearchForm = props => {
	const stops = props.data.pysakit;
	const [stopFrom, setStopFrom] = useState(null);
	const [stopTo, setStopTo] = useState(null);
	const stopsAreChosen = () => {
		return !stopFrom || !stopTo;
	};
	return (
		<div className="Search">
			<div className="Search__Boxes">
				<Autocomplete
					id="combo-box-from"
					className="Search__Box"
					options={stops}
					getOptionLabel={(option) => option}
					style={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Mistä" variant="outlined" />}
					noOptionsText={'Ei pysäkkiä'}
					onChange={(event, newValue) => {
						setStopFrom(newValue);
					}}
				/>
				<Autocomplete
					id="combo-box-to"
					className="Search__Box"
					options={stops}
					getOptionLabel={(option) => option}
					style={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Minne" variant="outlined" />}
					noOptionsText={'Ei pysäkkiä'}
					onChange={(event, newValue) => {
						setStopTo(newValue);
					}}
				/>
			</div>
			<div>
				<Button
				variant="contained"
				color="primary"
				className="Search__Button"
				disabled={stopsAreChosen()}
				onClick={() => {
					props.makeSearch(stopFrom, stopTo);
				}}
				>
				Hae
				</Button>
			</div>
		</div>
	)
};

export default SearchForm;