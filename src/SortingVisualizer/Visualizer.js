import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { BubbleSort } from '../Algorithms/BubbleSort';

// CONSTANTS
const PRIMARY_COLOR = '#25CCF7';
const ACTIVE_COLOR = '#EA425C';
const SORTED_COLOR = '#45CE30';
const ARRAY_LENGTH = 160;

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
		arrayBars[0].style.backgroundColor = ACTIVE_COLOR;
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
			<button onClick={() => setArr(populateArray())} className="button">
				New Array
			</button>
			<button className="button" onClick={() => bubbleSort()}>
				BubbleSort
			</button>
		</>
	);
};

export default Visualizer;
