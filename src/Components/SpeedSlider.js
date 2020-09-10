import React from 'react';
import { Slider } from '@material-ui/core';

export const MySpeedSlider = ({ setAnimationSpeed }) => {
	const mark = [
		{
			value: 0.3,
			label: 'faster',
		},
		{
			value: 200,
			label: 'slower',
		},
	];

	return (
		<div
			style={{
				backgroundColor: '#444',
			}}
		>
			<p style={{ backgroundColor: '#444', color: '#fff' }}>Animation Speed</p>
			<Slider
				style={{
					width: '100px',
					backgroundColor: '#444',
				}}
				defaultValue={0.5}
				aria-labelledby="slider"
				valueLabelDisplay="off"
				min={0.3}
				max={200}
				marks={mark}
				onChange={(e, val) => setAnimationSpeed(val)}
			/>
		</div>
	);
};

export default MySpeedSlider;
