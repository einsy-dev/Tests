import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './src/config/db/index.js';
import { BookRouter } from './src/entities/book/index.js';
import { UserRouter } from './src/entities/user/index.js';
import jwtDecode from './src/middleware/jwt.decode.js';
import errorHandler from './src/middleware/error.handler.js';

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use(jwtDecode);

app.use('/api/books', BookRouter);
app.use('/api/users', UserRouter);

app.use(errorHandler);

try {
	await sequelize.sync({ alter: true, logging: false });
	await app.listen(3000, () => console.log('Listening on port 3000'));
} catch (err) {
	console.log(err['original']);
}
