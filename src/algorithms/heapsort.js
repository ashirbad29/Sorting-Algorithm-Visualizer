import { swap } from './swap';
import colors from '../SortingVisualizer/colorCodes';

let count = 0;

const arrayBars = document.getElementsByClassName('arrayBar');

export const heapsort = (tempArr, speed) => {
	count = 0;
	const arr = tempArr.map(item => item.val);
	sort(arr, arr.length, speed);
	return { arr, count };
};

const setColor = (speed, color, i, j) => {
	if (i) {
		setTimeout(() => {
			arrayBars[i].style.backgroundColor = color;
		}, count * speed);
	}

	if (j) {
		setTimeout(() => {
			arrayBars[j].style.backgroundColor = color;
		}, count * speed);
	}
	count++;
};
const swapHeights = (speed, color, i, j) => {
	setTimeout(() => {
		arrayBars[i].style.backgroundColor = color;
		arrayBars[j].style.backgroundColor = color;

		let temp = arrayBars[i].style.height;
		arrayBars[i].style.height = arrayBars[j].style.height;
		arrayBars[j].style.height = temp;
	}, count * speed);

	count++;
};
// heapify
const heapify = (arr, i, n, speed) => {
	let largest = i;
	let leftChild = i * 2 + 1;
	let rightChild = i * 2 + 2;

	if (leftChild < n && arr[leftChild] > arr[largest]) largest = leftChild;

	if (rightChild < n && arr[rightChild] > arr[largest]) largest = rightChild;

	if (largest !== i) {
		swap(i, largest, arr);

		// color
		swapHeights(speed, colors.pivotActiveColor, i, largest);
		setColor(speed, colors.primaryColor, i, largest);
		heapify(arr, largest, n, speed);
	}
};

// sort
const sort = (arr, n, speed) => {
	// arrange the array
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapify(arr, i, n, speed);
	}

	count += 3;
	// one by one extract the element from heap
	// and put them at back
	for (let i = n - 1; i >= 0; i--) {
		swap(i, 0, arr);
		swapHeights(speed, colors.orange, i, 0);
		count += 2;

		setColor(speed, colors.sortedElementColor, i);
		heapify(arr, 0, i, speed);
	}
};
