import colors from '../SortingVisualizer/colorCodes';
import { swap } from './swap';
export const insertionSort = (tempArr, speed) => {
	let count = 0;

	const arrayBars = document.getElementsByClassName('arrayBar');
	const arr = tempArr.map(item => item.val);

	for (let i = 1; i < arr.length; i++) {
		// color current comparing value
		setTimeout(() => {
			arrayBars[i].style.backgroundColor = colors.orange;
			arrayBars[i - 1].style.backgroundColor = colors.orange;
		}, count++ * speed);

		let j = i;
		while (j > 0 && arr[j] < arr[j - 1]) {
			let k = j; /* to avoid es line error */

			setTimeout(() => {
				if (k !== i)
					arrayBars[k].style.backgroundColor = colors.sortedElementColor;
				arrayBars[k - 1].style.backgroundColor = colors.sortedElementColor;

				let temp = arrayBars[k].style.height;
				arrayBars[k].style.height = arrayBars[k - 1].style.height;
				arrayBars[k - 1].style.height = temp;
			}, count++ * speed);

			swap(j, j - 1, arr);

			setTimeout(() => {
				if (k !== i) arrayBars[k].style.backgroundColor = colors.primaryColor;
				arrayBars[k - 1].style.backgroundColor = colors.primaryColor;
			}, count++ * speed);
			j--;
		}
		// set the color to normal color
		setTimeout(() => {
			arrayBars[i].style.backgroundColor = colors.primaryColor;
			arrayBars[i - 1].style.backgroundColor = colors.primaryColor;
		}, count * speed);
	}
	return { arr, count };
};
