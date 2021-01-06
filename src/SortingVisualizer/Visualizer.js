import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/bubblesort';
import { mergeSortAnimation } from '../algorithms/mergesort';
import { insertionSort } from '../algorithms/insertion';
import { selectionSort } from '../algorithms/selectionsort';
// stylesheet
import './SortingVisualizer.css';

// CONSTANTS
const PRIMARY_COLOR = '#dd85e7';
const ACTIVE_COLOR = '#FFA500';
const THIRD_COLOR = '#7CFC00';
const SORTED_COLOR = '#00587a';

// Random Number Genrator
const generateRandomNumber = (i, j) => {
	return Math.floor(i + Math.random() * (j - i));
};

const Visualizer = () => {
	// state of the array
	const [mainArray, setMainArray] = useState([]);
	const [arrayLength, setArrayLength] = useState(70);
	const [animationSpeed, setAnimationSpeed] = useState(10);
	const [algo, setAlgo] = useState('mergesort');
	const [able, setAble] = useState(true);

	//Render the Array Before DOM loades
	useEffect(() => {
		if (able) populateArray(arrayLength);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arrayLength, algo]);

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
				val: generateRandomNumber(25, 500),
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
				arrayBars[i].style.backgroundColor = SORTED_COLOR;

				sortedArray.push({
					idx: i,
					val: arr[i],
				});
			}
			setMainArray(sortedArray);
			setAble(true);
		}, (m + 1) * animationSpeed);
	};

	// MERGE SORT
	const mergeSort = () => {
		setAble(false);
		const { sortedArray, count } = mergeSortAnimation(
			mainArray,
			animationSpeed
		);

		const newArray = sortedArray.map((val, idx) => ({ val, idx }));

		setTimeout(() => {
			setMainArray(newArray);
			const arrayBars = document.getElementsByClassName('arrayBar');

			for (let i = 0; i < arrayLength; i++) {
				arrayBars[i].style.backgroundColor = SORTED_COLOR;
			}
			setAble(true);
		}, (count + 5) * animationSpeed);
	};

	// INSERTION SORT
	const insertionSortAnimate = () => {
		const { animations, arr } = insertionSort(mainArray);
		const arrayBars = document.getElementsByClassName('arrayBar');

		setAble(false);
		let m = 0;
		for (let k = 0; k < animations.length; k++) {
			let i = animations[k].i;
			let j = animations[k].j;

			if (!animations[k].swap) {
				setTimeout(() => {
					arrayBars[i].style.backgroundColor = ACTIVE_COLOR;
					arrayBars[j].style.backgroundColor = ACTIVE_COLOR;
				}, m * animationSpeed);
			}
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
				arrayBars[i].style.backgroundColor = SORTED_COLOR;

				sortedArray.push({
					idx: i,
					val: arr[i],
				});
			}
			setMainArray(sortedArray);
			setAble(true);
		}, (m + 1) * animationSpeed);
	};

	const selectionSortAnimate = () => {
		setAble(false);
		const { arr, count } = selectionSort(mainArray, animationSpeed);
		const newArray = arr.map((val, idx) => ({ val, idx }));

		setTimeout(() => {
			setMainArray(newArray);
			const arrayBars = document.getElementsByClassName('arrayBar');

			for (let i = 0; i < arrayLength; i++) {
				arrayBars[i].style.backgroundColor = SORTED_COLOR;
			}
			setAble(true);
		}, (count + 2) * animationSpeed);
	};

	const startSorting = algo => {
		switch (algo) {
			case 'bubblesort':
				bubbleSortAnimate();
				break;

			case 'mergesort':
				mergeSort();
				break;

			case 'selectionsort':
				selectionSortAnimate();
				break;

			case 'insertionsort':
				insertionSortAnimate();
				break;
			default:
				mergeSort();
				break;
		}
	};

	return (
		<div className='container'>
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
						>
							{arrayLength < 29 && able && <span>{item.val}</span>}
						</div>
					);
				})}
			</div>
			<div className='sidebar'>
				<div className='select-box able'>
					<label htmlFor='algo'>select algorithm</label>
					<select
						name='algo'
						id='select'
						value={algo}
						onChange={e => setAlgo(e.target.value)}
					>
						<option value='bubblesort'>bubble sort</option>
						<option value='mergesort'>merge sort</option>
						<option value='insertionsort'>insertion sort</option>
						<option value='selectionsort'>selection sort</option>
					</select>
				</div>
				<button className='button able' onClick={() => startSorting(algo)}>
					Sort
				</button>

				<button
					onClick={() => populateArray(arrayLength)}
					className='new-arr-btn button able'
				>
					Reset
				</button>

				<div className='slider-container'>
					<label>Length of Array</label>
					<input
						className='input-range able'
						type='range'
						value={arrayLength}
						onChange={e => setArrayLength(e.target.value)}
						min='7'
						max='150'
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
