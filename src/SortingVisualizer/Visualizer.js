import React, { useState, useEffect } from 'react';
import bubbleSort from '../algorithms/bubblesort';

// stylesheet
import './SortingVisualizer.css';

// CONSTANTS
const PRIMARY_COLOR = '#dd85e7';
const ACTIVE_COLOR = '#EA425C';
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
	}, [arrayLength]);

	/* Bubble Sort */
	const bubbleSortAnimate = () => {
		const animations = bubbleSort(arr);
		const arrayBars = document.getElementsByClassName('arrayBar');

		for (let i = 0; i < animations.length; i++) {
			const [first, second, decision] = animations[i];

			switch (decision) {
				case 1:
					setTimeout(() => {
						const firstStyle = arrayBars[first].style;
						firstStyle.backgroundColor = ACTIVE_COLOR;

						const secondStyle = arrayBars[second].style;
						secondStyle.backgroundColor = ACTIVE_COLOR;
					}, i * animationSpeed);
					break;
				case 0:
					setTimeout(() => {
						const firstStyle = arrayBars[first].style;
						firstStyle.backgroundColor = PRIMARY_COLOR;

						const secondStyle = arrayBars[second].style;
						secondStyle.backgroundColor = PRIMARY_COLOR;
					}, i * animationSpeed);
					break;
				case 2:
					setTimeout(() => {
						const firstStyle = arrayBars[first].style;
						firstStyle.height = `${second}px`;
					}, i * animationSpeed);
					break;
				default:
				// no defualt
			}
		}
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
