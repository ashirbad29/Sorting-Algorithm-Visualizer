import { swap } from './swap';

export const bubbleSort = array => {
	const animations = [];
	let isSorted = false;
	let counter = 0;
	while (!isSorted) {
		isSorted = true;
		for (let i = 0; i < array.length - 1 - counter; i++) {
			animations.push([i, i + 1, 1]);
			animations.push([i, i + 1, 0]);

			if (array[i] > array[i + 1]) {
				swap(i, i + 1, array);
				isSorted = false;
				animations.push([i, array[i], -1]);
				animations.push([i + 1, array[i + 1], -1]);
			}
		}
		counter++;
	}
	return animations;
};

/* 
 1 -> set the bar color to active color
 0 -> reset the bar colors to primary
 2 -> size changing decision 
*/
