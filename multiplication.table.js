function multiplicationTable(number) {
	const table = Object.create(null);
	for (let i = 1; i <= number; i++) {
		table[i] = {};
		for (let j = 1; j <= number; j++) {
			table[i][j] = i * j;
		};
	};
	console.table(table);
};

multiplicationTable(15);