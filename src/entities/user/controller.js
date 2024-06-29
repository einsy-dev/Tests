import { Router } from 'express';
import UserService from './service.js';
import authGuard from '#middleware/auth.guard.js';

const router = Router();

router.post('/', async (req, res, next) => {
	const body = req.body;
	const data = await UserService.createUser(body).catch((err) => next(err));

	res.send(data);
});

router.post('/login', async (req, res, next) => {
	const body = req.body;
	const data = await UserService.authUser(body).catch((err) => next(err));

	res.send(data);
});

router.get('/me', authGuard(), async (req, res, next) => {
	const { id } = req.user;
	const data = await UserService.getUserById(id).catch((err) => next(err));

	res.send(data);
});

router.put('/:id/role', authGuard(['admin']), async (req, res, next) => {
	const { id } = req.params;
	const { role } = req.body;
	const data = await UserService.changeRole(id, role).catch((err) => next(err));
	res.send(data);
});

export default router;
