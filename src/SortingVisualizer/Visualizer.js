import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/bubblesort';

// stylesheet
import './SortingVisualizer.css';

// CONSTANTS
const PRIMARY_COLOR = '#dd85e7';
const ACTIVE_COLOR = '#FFA500';
const THIRD_COLOR = '#7CFC00';

// Random Number Genrator
const generateRandomNumber = (i, j) => {
	return Math.floor(i + Math.random() * (j - i));
};

const Visualizer = () => {
	// state of the array
	const [mainArray, setMainArray] = useState([]);
	const [arrayLength, setArrayLength] = useState(70);
	const [animationSpeed, setAnimationSpeed] = useState(10);
	const [able, setAble] = useState(true);

	//Render the Array Before DOM loades
	useEffect(() => {
		if (able) populateArray(arrayLength);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arrayLength]);

	// ABLE / DISABLE BUTTONS ETC.
	useEffect(() => {
		const items = document.getElementsByClassName('able');

		if (!able) {
			for (let i = 0; i < items.length; i++) {
				items[i].style.pointerEvents = 'none';
				items[i].disabled = true;
			}
		} else {
			for (let i = 0; i < items.length; i++) {
				items[i].style.pointerEvents = 'auto';
				items[i].disabled = false;
			}
		}
	}, [able]);

	const populateArray = size => {
		const tempArr = [];
		for (let i = 0; i < size; i++) {
			const item = {
				idx: i,
				val: generateRandomNumber(50, 400),
			};
			tempArr.push(item);
			if (document.getElementsByClassName('arrayBar')[i] != null) {
				document.getElementsByClassName('arrayBar')[
					i
				].style.backgroundColor = PRIMARY_COLOR;
			}
		}
		if (able) setMainArray(tempArr);
	};

	// BUBBLE SORT
	const bubbleSortAnimate = () => {
		const { animations, arr } = bubbleSort(mainArray);
		const arrayBars = document.getElementsByClassName('arrayBar');

		setAble(false);
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
			const sortedArray = [];
			for (let i = 0; i < arr.length; i++) {
				arrayBars[i].style.backgroundColor = 'red';

				sortedArray.push({
					idx: i,
					val: arr[i],
				});
			}
			setMainArray(sortedArray);
			setAble(true);
		}, (m + 1) * animationSpeed);
	};

	return (
		<div className='container'>
			<div className='header'>
				<h2>Sorting visualizer</h2>
			</div>
			<div className='visualizeContainer'>
				{mainArray.map(item => {
					return (
						<div
							className='arrayBar'
							style={{
								height: `${item.val}px`,
								backgroundColor: PRIMARY_COLOR,
							}}
							key={item.idx}
						></div>
					);
				})}
			</div>
			<div className='footer'>
				<button
					onClick={() => populateArray(arrayLength)}
					className='button able'
				>
					New Array
				</button>
				<button className='button able' onClick={() => bubbleSortAnimate()}>
					BubbleSort
				</button>
				<div className='slider-container'>
					<label>Length of Array</label>
					<input
						className='input-range able'
						type='range'
						value={arrayLength}
						onChange={e => setArrayLength(e.target.value)}
						min='7'
						max='100'
					/>
				</div>
				<div className='slider-container'>
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
		</div>
	);
};

export default Visualizer;
