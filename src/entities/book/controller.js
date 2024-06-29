import { Router } from 'express';
import BookService from './service.js';
import authGuard from '#middleware/auth.guard.js';

const router = Router();

router.post('/', authGuard(['admin']), async (req, res, next) => {
	const body = req.body;
	const data = await BookService.createBook(body).catch((err) => next(err));
	res.send(data);
});

router.get('/', async (req, res, next) => {
	const data = await BookService.getBooks().catch((err) => next(err));
	res.send(data);
});

router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	const data = await BookService.getBookById(id).catch((err) => next(err));
	res.send(data);
});

router.put('/:id', authGuard(['admin']), async (req, res, next) => {
	const id = req.params.id;
	const body = req.body;
	const data = await BookService.updateBook(id, body).catch((err) => next(err));
	res.send(data);
});

router.delete('/:id', authGuard(['admin']), async (req, res, next) => {
	const id = req.params.id;
	const data = await BookService.deleteBook(id).catch((err) => next(err));
	res.send(data);
});

export default router;
