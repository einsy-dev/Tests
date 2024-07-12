function commonDivisors(array) {
	let result = [],
		limit = Math.min(...array);

	for (let i = 2; i <= limit; i++) {
		let count = 0;
		for (let j = 0; j < array.length; j++) {
			if (array[j] % i === 0) {
				count++
			};
		};
		count === 3 && result.push(i);
	};

	return result;
};
console.log(
	commonDivisors([9, 18, 81]),
	commonDivisors([42, 12, 18])
);
