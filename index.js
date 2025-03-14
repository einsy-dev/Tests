import crypto from 'crypto';

import fs from 'fs';

let files = fs.readdirSync('./task2');
let res = [];

files.forEach(file => {
	let hash = crypto.createHash('sha3-256');
	let buff = fs.readFileSync(`./task2/${file}`);
	res.push(hash.update(buff).digest("hex"));
})
res = res.sort().reverse().join('') + "edgard.butsch@gmail.com";
console.log(res)
let resHash = crypto.createHash('sha3-256');
console.log(resHash.update(res).digest('hex'));