import { swap } from './swap';
export const insertionSort = tempArr => {
	const arr = tempArr.map(item => item.val);

	for (let i = 1; i < arr.length; i++) {
		let j = i;
		while (j > 0 && arr[j] < arr[j - 1]) {
			swap(j, j - 1, arr);
			j--;
		}
	}
	return arr;
};
