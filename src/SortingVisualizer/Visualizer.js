import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/bubblesort';

// stylesheet
import './SortingVisualizer.css';

// CONSTANTS
const PRIMARY_COLOR = '#dd85e7';
const ACTIVE_COLOR = 'green';
const THIRD_COLOR = 'cyan';
// const SORTED_COLOR = '#45CE30';
// const ANIMATION_SPEED_MS = 0.5;

// Random Number Genrator
const generateRandomNumber = () => {
	return Math.floor(Math.random() * (400 - 10) + 10);
};

const Visualizer = () => {
	// state of the array
	const [arr, setArr] = useState([]);
	const [arrayLength, setArrayLength] = useState(70);
	const [animationSpeed, setAnimationSpeed] = useState(10);
	const [sortAlgo, setSortAlgo] = useState('bubbleSort');

	// Populate The Array With Random Numbers
	const populateArray = () => {
		const tempArr = [];
		for (let i = 0; i < arrayLength; i++) tempArr.push(generateRandomNumber());
		return tempArr;
	};

	//Render the Array Before DOM loades
	useEffect(() => {
		setArr(populateArray());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arrayLength, sortAlgo]);

	// BUBBLE SORT

	const bubbleSortAnimate = () => {
		const animations = bubbleSort(arr);
		const arrayBars = document.getElementsByClassName('arrayBar');

		let m = 0;
		for (let k = 0; k < animations.length; k++) {
			let i = animations[k].i;
			let j = animations[k].j;

			setTimeout(() => {
				arrayBars[i].style.backgroundColor = ACTIVE_COLOR;
				arrayBars[j].style.backgroundColor = ACTIVE_COLOR;
			}, m * animationSpeed);

			if (animations[k].swap) {
				setTimeout(() => {
					arrayBars[i].style.backgroundColor = THIRD_COLOR;
					arrayBars[j].style.backgroundColor = THIRD_COLOR;

					// swap the heights
					let temp = arrayBars[i].style.height;
					arrayBars[i].style.height = arrayBars[j].style.height;
					arrayBars[j].style.height = temp;
				}, (m + 1) * animationSpeed);
				m++;
			}

			setTimeout(() => {
				arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
				arrayBars[j].style.backgroundColor = PRIMARY_COLOR;
			}, (m + 1) * animationSpeed);
			m++;
		}

		setTimeout(() => {
			for (let i = 0; i < arrayLength; i++) {
				arrayBars[i].style.backgroundColor = 'red';
			}
		}, (m + 1) * animationSpeed);
	};

	// IGNORE: utility function
	// function arraysAreSorted(a, b) {
	// 	if (a.length !== b.length) return false;
	// 	for (let i = 0; i < a.length; i++) {
	// 		if (a[i] !== b[i]) return false;
	// 	}
	// 	return true;
	// }

	return (
		<div className='container'>
			<div className='header'>
				<h2>Sorting visualizer</h2>
			</div>
			<div className='visualizeContainer'>
				{arr.map((item, index) => {
					return (
						<div
							className='arrayBar'
							style={{
								height: `${item}px`,
								backgroundColor: PRIMARY_COLOR,
							}}
							key={index}
						></div>
					);
				})}
			</div>
			<div className='footer'>
				<button onClick={() => setArr(populateArray())} className='button'>
					New Array
				</button>
				<button className='button' onClick={() => bubbleSortAnimate()}>
					BubbleSort
				</button>
				{/* FIX THIS */}
				{/* <Myslider label={'array length'} setArrayLength={setArrayLength} /> */}
				<label>Length of Array</label>
				<input
					className='input-range able'
					type='range'
					value={arrayLength}
					onChange={e => setArrayLength(e.target.value)}
					min='5'
					max='100'
				/>
				{/* <MySpeedSlider setAnimationSpeed={setAnimationSpeed} /> */}
				<label>Speed</label>
				<input
					className='input-range able'
					type='range'
					value={500 - animationSpeed}
					onChange={e => setAnimationSpeed(500 - e.target.value)}
					min='350'
					max='499'
				/>
			</div>
		</div>
	);
};

export default Visualizer;
