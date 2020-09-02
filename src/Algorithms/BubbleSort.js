export const BubbleSort = arr => {
	const animations = [];

	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			animations.push([j, j + 1, 1]);
			animations.push([j, j + 1, 0]);

			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;

				animations.push([j, arr[j], -1]);
				animations.push([j + 1, arr[j + 1], -1]);
			}
		}
	}
	return animations;
};
