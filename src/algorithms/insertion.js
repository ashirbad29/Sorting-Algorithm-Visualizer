import { swap } from './swap';
export const insertionSort = tempArr => {
	const animations = [];
	const arr = tempArr.map(item => item.val);

	for (let i = 1; i < arr.length; i++) {
		// add the comparing value
		animations.push({
			i: i,
			j: i - 1,
			swap: false,
		});

		let j = i;

		while (j > 0 && arr[j] < arr[j - 1]) {
			animations.push({
				i: j,
				j: j - 1,
				swap: true,
			});
			swap(j, j - 1, arr);
			j--;
		}
	}
	return { animations, arr };
};
