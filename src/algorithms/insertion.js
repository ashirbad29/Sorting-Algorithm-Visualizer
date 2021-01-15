import { swap } from './swap';
export const insertionSort = (tempArr, speed) => {
	const PRIMARY_COLOR = '#dd85e7';
	const ACTIVE_COLOR = '#FFA500';
	const THIRD_COLOR = '#7CFC00';

	let count = 0;

	const arrayBars = document.getElementsByClassName('arrayBar');
	const arr = tempArr.map(item => item.val);

	for (let i = 1; i < arr.length; i++) {
		// color current comparing value
		setTimeout(() => {
			arrayBars[i].style.backgroundColor = ACTIVE_COLOR;
			arrayBars[i - 1].style.backgroundColor = ACTIVE_COLOR;
		}, count++ * speed);

		let j = i;
		while (j > 0 && arr[j] < arr[j - 1]) {
			let k = j; /* to avoid es line error */

			setTimeout(() => {
				if (k !== i) arrayBars[k].style.backgroundColor = THIRD_COLOR;
				arrayBars[k - 1].style.backgroundColor = THIRD_COLOR;

				let temp = arrayBars[k].style.height;
				arrayBars[k].style.height = arrayBars[k - 1].style.height;
				arrayBars[k - 1].style.height = temp;
			}, count++ * speed);

			swap(j, j - 1, arr);

			setTimeout(() => {
				if (k !== i) arrayBars[k].style.backgroundColor = PRIMARY_COLOR;
				arrayBars[k - 1].style.backgroundColor = PRIMARY_COLOR;
			}, count++ * speed);
			j--;
		}
		// set the color to normal color
		setTimeout(() => {
			arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
			arrayBars[i - 1].style.backgroundColor = PRIMARY_COLOR;
		}, count * speed);
	}
	return { arr, count };
};
