export const mergeSortAnimation = tempArr => {
	const animations = [];
	const arr = tempArr.map(item => item.val);
	const auxiliaryArray = arr.slice();
	mergeSort(arr, 0, arr.length - 1, auxiliaryArray, animations);
	return animations;
};

function mergeSort(arr, start, end, auxiliaryArray, animations) {
	if (start >= end) return;
	const middle = (start + end) / 2;

	mergeSort(arr, start, middle, auxiliaryArray, animations);
	mergeSort(arr, middle + 1, end, auxiliaryArray, animations);
	merge(arr, start, middle, end, auxiliaryArray, animations);
}

function merge(arr, start, middle, end, auxiliaryArray, animations) {
	// do some work
}
