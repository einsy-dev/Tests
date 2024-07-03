const array = [
	[1665, 0],
	[947, 90],
	[557, 0],
	[1300, 90],
	[2225, 180],
	[2239, 270],
];

let result = [[0, 0]];

function main() { // переберает массив и вычисляет координаты
	let coordinates = [0, 0];
	for (let el of array) {
		coordinates = findCoordinate(el[0], el[1], coordinates[0], coordinates[1]);
		result.push(coordinates);
	}
}
main();

(function (round) { // переводит координаты из мм в сантиметры
	for (let el of result) {
		el[0] = Math.abs(Math.round(el[0] / round));
		el[1] = Math.abs(Math.round(el[1] / round));
	}
})(10);

console.log(result.toString()); // logging result to console

function findCoordinate(l, ang, x, y) { // рассчитывает координаты
	let newX = x + l * Math.sin(ang * Math.PI / 180);
	let newY = y + l * Math.cos(ang * Math.PI / 180);
	return [newX, newY];
}