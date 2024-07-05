import node from "node:http";
import pg from "pg";
import dbConfig from "./src/db/index.js";
import { createTableIfNotExists, addDataToTable } from "./src/db/query.js";

const { Client } = pg;

const client = new Client(dbConfig);
const data = [];

const { createServer } = node;
const server = createServer(async (req, res) => {
	const table = req.url.split("/")[1] || "edgard";

	try {
		await client.query(createTableIfNotExists(table));
	} catch (error) {
		res.statusCode = 500;
		res.setHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify({ loc: "createTableIfNotExists", error: error.message }),
		);
		return;
	}
	try {
		let tempData;
		let page = 0;
		if (!data.length) {
			do {
				tempData = await fetch(
					"https://rickandmortyapi.com/api/character?page=" + ++page,
				).then((res) => res.json());
				data.push(tempData.results);
			} while (tempData.info.next !== null);
		}
	} catch (error) {
		res.statusCode = 500;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ loc: "dataFetching", error: error.message }));
		return;
	}
	try {
		await data.map((item) =>
			item.map((el) => {
				const { query, values } = addDataToTable(table, el);
				client.query(query, values);
			}),
		);
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ message: "Information successfully added" }));
		return;
	} catch (error) {
		res.statusCode = 500;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ loc: "addDataToTable", error: error.message }));
		return;
	}
});

try {
	client.connect();
	server.listen(3000, () => {
		console.log("Server is running on port 3000");
	});
} catch (error) {
	console.log(error);
}
