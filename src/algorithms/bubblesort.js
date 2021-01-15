export const bubbleSort = (tempArr, speed) => {
	const CURR_ITEM = 'cyan';
	const ACTIVE_COLOR = '#ff2400';
	const PRIMARY_COLOR = '#dd85e7';
	const SORTED_COLOR = '#4cbb17';

	const arr = tempArr.map(item => item.val);
	let count = 0;

	const arrayBars = document.getElementsByClassName('arrayBar');

	for (let i = 0; i < arr.length - 1; i++) {
		let swapped = false;
		for (let j = 0; j < arr.length - i - 1; j++) {
			// colors it up to active
			setTimeout(() => {
				arrayBars[j].style.backgroundColor = CURR_ITEM;
				arrayBars[j + 1].style.backgroundColor = CURR_ITEM;
			}, count++ * speed);

			if (arr[j] > arr[j + 1]) {
				// swap the heights
				setTimeout(() => {
					arrayBars[j].style.backgroundColor = ACTIVE_COLOR;
					arrayBars[j + 1].style.backgroundColor = ACTIVE_COLOR;

					let temp = arrayBars[j].style.height;
					arrayBars[j].style.height = arrayBars[j + 1].style.height;
					arrayBars[j + 1].style.height = temp;
				}, count++ * speed);

				count += 1;
				swapped = true;

				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
			// color back to normal
			setTimeout(() => {
				arrayBars[j].style.backgroundColor = PRIMARY_COLOR;
				arrayBars[j + 1].style.backgroundColor = PRIMARY_COLOR;
			}, count++ * speed);
		}
		setTimeout(() => {
			arrayBars[arr.length - i - 1].style.backgroundColor = SORTED_COLOR;
			if (swapped === false) {
				for (let x = 0; x < i; x++) {
					arrayBars[x].style.backgroundColor = SORTED_COLOR;
				}
			}
		}, count * speed);
		if (swapped === false) break;
	}

	return { arr, count };
};
