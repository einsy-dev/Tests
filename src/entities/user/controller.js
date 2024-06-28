import { Router } from "express";
import UserService from './service.js';
import authGuard from "#middleware/auth.guard.js";

const router = Router();

router.post("/", async (req, res) => {
	const body = req.body;
	const data = await UserService.createUser(body);
	res.send(data);
});

router.post("/login", async (req, res) => {
	const body = req.body;
	const data = await UserService.authUser(body);
	res.send(data);
});

router.get("/me", authGuard(), async (req, res) => {
	const { id } = req.user;
	const data = await UserService.getUserById(id);
	res.send(data);
});

router.put("/:id/role", authGuard(['admin']), async (req, res) => {
	const { id } = req.params;
	const { role } = req.body;
	const data = await UserService.changeRole(id, role);
	res.send(data);
})

export default router