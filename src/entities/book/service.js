import { Book } from './model.js';
import HandleError from '#config/error/error.js';

const createBook = async (data) => {
	const { title, author, publicationDate, genres } = data;
	if (!title || !author) throw new HandleError('Не все поля заполнены', 400);
	const book = await Book.build({
		title,
		author,
		publicationDate,
		genres
	})
		.save()
		.catch(() => {
			throw new HandleError('Не удалось создать книгу', 500);
		});

	return book;
};

const getBooks = async () => {
	const books = await Book.findAll().catch(() => {
		throw new HandleError('Не удалось получить книги', 500);
	});

	return books;
};

const getBookById = async (id) => {
	if (!id) throw new HandleError('Не выбрано книги', 400);
	const book = await Book.findOne({ where: { id } }).catch(() => {
		throw new HandleError('Книга не найдена', 404);
	});
	return book;
};

const updateBook = async (id, data) => {
	const { title, author, publicationDate, genres } = data;
	if (!id) throw new HandleError('Не выбрано книги', 400);
	await Book.update(
		{ title, author, publicationDate, genres },
		{ where: { id } }
	).catch(() => {
		throw new HandleError('Не удалось обновить книгу', 500);
	});

	return await getBookById(id);
};

const deleteBook = async (id) => {
	const book = await Book.destroy({ where: { id } })
		.then(() => true)
		.catch(() => {
			throw new HandleError('Не удалось удалить книгу', 500);
		});

	return book;
};

export default {
	createBook,
	getBooks,
	getBookById,
	updateBook,
	deleteBook
};
