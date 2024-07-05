import fs from "fs";

const dbConfig = {
	user: "candidate",
	password: "62I8anq3cFq5GYh2u4Lh",
	host: "rc1b-r21uoagjy1t7k77h.mdb.yandexcloud.net",
	port: 6432,
	database: "db1",
	ssl: {
		rejectUnauthorized: true,
		ca: fs.readFileSync("/home/runner/.postgresql/root.crt").toString(),
	},
};

export default dbConfig;
