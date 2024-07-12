function primeNumbers(start, end) {
	const result = [];
	for (let i = start; i <= end; i++) {
		let count = 0;
		for (let j = 1; j <= i; j++) {
			if (i % j === 0) {
				count++;
			};
		};
		if (count === 2) {
			result.push(i);
		};
	};
	console.log(result);
	return result;
}
primeNumbers(11, 20);
primeNumbers(100, 130);
