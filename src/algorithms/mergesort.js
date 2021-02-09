import colors from '../SortingVisualizer/colorCodes';

let count = 0;

export const mergeSortAnimation = (tempArr, animationSpeed) => {
	const arr = tempArr.map(item => item.val);
	count = 0;
	const sortedArray = mergesort(arr, 0, arr.length - 1, animationSpeed);
	return { sortedArray, count };
};

const mergesort = (arr, low, high, animationSpeed) => {
	if (low > high) {
		return [];
	}

	if (low === high) {
		let aux = [];
		aux.push(arr[low]);
		return aux;
	}

	let mid = Math.floor((high + low) / 2);

	// recursively divide the array until its sorted
	// in the end it will only have a single item and sorted :)

	const right = mergesort(arr, low, mid, animationSpeed);
	const left = mergesort(arr, mid + 1, high, animationSpeed);

	const aux = [];
	let k = low;
	const arrayBars = document.getElementsByClassName('arrayBar');

	let li = 0,
		ri = 0; // for left and right array respectively
	while (li < left.length && ri < right.length) {
		let counter = count;
		let barIdx = k;

		if (left[li] < right[ri]) {
			aux.push(left[li]);
			let i = li;
			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.cyan;
				arrayBars[barIdx].style.height = `${left[i]}px`;
			}, counter * animationSpeed);

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.pivotActiveColor;
			}, (counter + 1) * animationSpeed);

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.primaryColor;
			}, (counter + 1.5) * animationSpeed);
			li++;
		} else {
			aux.push(right[ri]);
			let i = ri;

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.cyan;
				arrayBars[barIdx].style.height = `${right[i]}px`;
			}, counter * animationSpeed);

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.pivotActiveColor;
			}, (counter + 1) * animationSpeed);

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.primaryColor;
			}, (counter + 1.5) * animationSpeed);
			ri++;
		}
		k++;
		count++;
	}

	// left exhausted
	if (li === left.length) {
		while (ri < right.length) {
			aux.push(right[ri]);
			let barIdx = k;
			let i = ri;
			let counter = count;

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.cyan;
				arrayBars[barIdx].style.height = `${right[i]}px`;
			}, counter * animationSpeed);

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.pivotActiveColor;
			}, (counter + 1) * animationSpeed);

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.primaryColor;
			}, (counter + 1.5) * animationSpeed);
			ri++;
			count++;
			k++;
		}
	} else if (ri === right.length) {
		while (li < left.length) {
			aux.push(left[li]);
			let barIdx = k;
			let i = li;
			let counter = count;

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.cyan;
				arrayBars[barIdx].style.height = `${left[i]}px`;
			}, counter * animationSpeed);

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.pivotActiveColor;
			}, (counter + 1) * animationSpeed);

			setTimeout(() => {
				arrayBars[barIdx].style.backgroundColor = colors.primaryColor;
			}, (counter + 1.5) * animationSpeed);
			li++;
			k++;
			count++;
		}
	}
	return aux;
};
