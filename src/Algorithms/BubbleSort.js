export const bubbleSort = arr => {
	const animations = [];

	for (let i = 0; i < arr.length - 1; i++) {
		let swapped = false;
		for (let j = 0; j < arr.length - i - 1; j++) {
			let swap = false;
			if (arr[j] > arr[j + 1]) {
				swapped = true;
				swap = true;

				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
			animations.push({
				i: j,
				j: j + 1,
				swap: swap,
			});
		}

		if (swapped === false) break;
	}

	return animations;
};
