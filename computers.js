function computers(number) {
	let result;
	const lastTwo = String(number).slice(-2);

	if (lastTwo.slice(-1) === "1" && lastTwo !== "11") {
		result = `компьютер`;
	} else if (
		(lastTwo.slice(-1) === "2" ||
			lastTwo.slice(-1) === "3" ||
			lastTwo.slice(-1) === "4") &&
		lastTwo !== "12" &&
		lastTwo !== "13" &&
		lastTwo !== "14"
	) {
		result = `компьютера`;
	} else {
		result = `компьютеров`;
	};
	return (number + " " + result);
};
console.log(
	computers(1),
	computers(11),
	computers(2),
	computers(3),
	computers(4),
	computers(12),
	computers(13),
	computers(14),
	computers(78),
);