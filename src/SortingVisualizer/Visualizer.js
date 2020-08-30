import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

const Visualizer = () => {
	// state of the array
	const [arr, setArr] = useState([]);

	// generate random numberes
	const generateRandomNumber = () => {
		return Math.floor(Math.random() * (500 - 10) + 10);
	};

	const populateArray = () => {
		const tempArr = [];
		for (let i = 0; i < 160; i++) tempArr.push(generateRandomNumber());
		return tempArr;
	};

	// before the app renders we have to populate the array
	useEffect(() => {
		setArr(populateArray());
	}, []);

	return (
		<>
			<div className="visualizeContainer">
				{arr.map((item, index) => {
					return (
						<div
							className="arrayBar"
							style={{
								height: `${item}px`,
							}}
							key={index}
						></div>
					);
				})}
			</div>
			<button onClick={() => setArr(populateArray())} className="button">
				New Array
			</button>
		</>
	);
};

export default Visualizer;
