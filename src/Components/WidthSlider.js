import React from 'react';
import { Slider } from '@material-ui/core';

export const MyWidthSlider = ({ setArrayWidth }) => {
	return (
		<div
			style={{
				backgroundColor: '#444',
			}}
		>
			<p style={{ backgroundColor: '#444', color: '#fff' }}>Bar Width</p>
			<Slider
				style={{
					width: '100px',
					backgroundColor: '#444',
				}}
				defaultValue={4}
				aria-labelledby="slider"
				valueLabelDisplay="auto"
				min={4}
				max={30}
				onChange={(e, val) => setArrayWidth(val)}
			/>
		</div>
	);
};

export default MyWidthSlider;
