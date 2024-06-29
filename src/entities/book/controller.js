import { Router } from 'express';
import BookService from './service.js';
import authGuard from '#middleware/auth.guard.js';

const router = Router();

router.post('/', authGuard(['admin']), async (req, res) => {
	const body = req.body;
	const data = await BookService.createBook(body);
	res.send(data);
});

router.get('/', async (req, res) => {
	const data = await BookService.getBooks();
	res.send(data);
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const data = await BookService.getBookById(id);
	res.send(data);
});

router.put('/:id', authGuard(['admin']), async (req, res) => {
	const id = req.params.id;
	const body = req.body;
	const data = await BookService.updateBook(id, body);
	res.send(data);
});

router.delete('/:id', authGuard(['admin']), async (req, res) => {
	const id = req.params.id;
	const data = await BookService.deleteBook(id);
	res.send(data);
});

export default router;
