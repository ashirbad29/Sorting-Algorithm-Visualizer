import { swap } from './swap';

export const selectionSort = (tempArr, speed) => {
	const arr = tempArr.map(item => item.val);
	const arrayBars = document.getElementsByClassName('arrayBar');

	let count = 0;
	for (let i = 0; i < arr.length; i++) {
		// initially minidx is set to i
		let minIdx = i;

		// change the color of the minIdx to red to identify
		setTimeout(() => {
			arrayBars[minIdx].style.backgroundColor = 'red';
		}, count * speed);
		count++;

		// traverse for the next smallest item
		for (let j = i + 1; j < arr.length; j++) {
			// current item color to orange
			setTimeout(() => {
				arrayBars[j].style.backgroundColor = 'orange';
			}, (count + 2) * speed);

			let oldMinIdx;
			if (arr[j] < arr[minIdx]) {
				oldMinIdx = minIdx;
				minIdx = j;

				// change the old minIdx to default color
				setTimeout(() => {
					arrayBars[oldMinIdx].style.backgroundColor = '#dd85e7';
				}, (count + 3) * speed);
			}
			// changing the current item to default color
			setTimeout(() => {
				arrayBars[j].style.backgroundColor = '#dd85e7';
			}, (count + 3) * speed);
			count++;
		}

		swap(i, minIdx, arr);

		// swap the heights and color the sorted item green
		setTimeout(() => {
			let temp = arrayBars[i].style.height;
			arrayBars[i].style.height = arrayBars[minIdx].style.height;
			arrayBars[minIdx].style.height = temp;
			arrayBars[i].style.backgroundColor = 'green';
		}, (count + 3) * speed);
		count++;
	}
	return { arr, count };
};
