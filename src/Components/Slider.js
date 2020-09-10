import React from 'react';
import { Slider } from '@material-ui/core';

const Myslider = ({ label, setArrayLength }) => {
	return (
		<div
			style={{
				backgroundColor: '#444',
			}}
		>
			<p style={{ backgroundColor: '#444', color: '#fff' }}>Array Length</p>
			<Slider
				style={{
					width: '100px',
					backgroundColor: '#444',
				}}
				defaultValue={160}
				aria-labelledby="slider"
				valueLabelDisplay="auto"
				min={4}
				max={170}
				step={20}
				onChange={(e, val) => setArrayLength(val)}
			/>
		</div>
	);
};

export default Myslider;
