import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { BubbleSort } from '../Algorithms/BubbleSort';

// CONSTANTS
const PRIMARY_COLOR = '#dd85e7';
const ACTIVE_COLOR = '#EA425C';
const SORTED_COLOR = '#45CE30';
const ARRAY_LENGTH = 160;
const ANIMATION_SPEED_MS = 0.8;
const Visualizer = () => {
	// state of the array
	const [arr, setArr] = useState([]);

	// Random Number Genrator
	const generateRandomNumber = () => {
		return Math.floor(Math.random() * (400 - 10) + 10);
	};

	// Populate The Array With Random Numbers
	const populateArray = () => {
		const tempArr = [];
		for (let i = 0; i < ARRAY_LENGTH; i++) tempArr.push(generateRandomNumber());
		return tempArr;
	};

	// Render the Array Before DOM loades
	useEffect(() => {
		setArr(populateArray());
	}, []);

	/* Bubble Sort */
	const bubbleSort = () => {
		const animations = BubbleSort(arr);
		const arrayBars = document.getElementsByClassName('arrayBar');

		for (let i = 0; i < animations.length; i++) {
			const [first, second, decision] = animations[i];

			if (decision === 1) {
				setTimeout(() => {
					const firstStyle = arrayBars[first].style;
					firstStyle.backgroundColor = ACTIVE_COLOR;

					const secondStyle = arrayBars[second].style;
					secondStyle.backgroundColor = ACTIVE_COLOR;
				}, i * ANIMATION_SPEED_MS);
			} else if (decision === 0) {
				setTimeout(() => {
					const firstStyle = arrayBars[first].style;
					firstStyle.backgroundColor = PRIMARY_COLOR;

					const secondStyle = arrayBars[second].style;
					secondStyle.backgroundColor = PRIMARY_COLOR;
				}, i * ANIMATION_SPEED_MS);
			} else {
				setTimeout(() => {
					const firstStyle = arrayBars[first].style;
					firstStyle.height = `${second}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	};

	// IGNORE: utility function
	function arraysAreSorted(a, b) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}

	return (
		<>
			<div className="header">
				<h2 className="heading">Sorting visualizer</h2>
			</div>
			<div className="visualizeContainer">
				{arr.map((item, index) => {
					return (
						<div
							className="arrayBar"
							style={{
								height: `${item}px`,
								backgroundColor: PRIMARY_COLOR,
							}}
							key={index}
						></div>
					);
				})}
			</div>
			<div className="footer">
				<button onClick={() => setArr(populateArray())} className="button">
					New Array
				</button>
				<button className="button" onClick={() => bubbleSort()}>
					BubbleSort
				</button>
			</div>
		</>
	);
};

export default Visualizer;
