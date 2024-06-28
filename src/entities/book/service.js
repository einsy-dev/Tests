import { Book } from "./model.js";
const createBook = async (data) => {
	const { title, author, publicationDate, genres } = data;
	return await Book
		.build({ title, author, publicationDate, genres })
		.save()
		.catch((err) => err);
};

const getBooks = async () => {
	return await Book
		.findAll()
		.catch((err) => err);
};

const getBookById = async (id) => {
	return await Book
		.findOne({ where: { id } })
		.catch((err) => err);
};

const updateBook = async (id, data) => {
	const { title, author, publicationDate, genres } = data;
	return await Book
		.update({ title, author, publicationDate, genres }, { where: { id } })
		.catch((err) => err);
};

const deleteBook = async (id) => {
	return await Book
		.destroy({ where: { id } })
		.then(() => true)
		.catch((err) => err);
};

export default { createBook, getBooks, getBookById, updateBook, deleteBook };