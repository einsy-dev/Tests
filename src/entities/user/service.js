import HandleError from '../../config/error/error.js';
import { User } from './model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createUser = async (data) => {
	const { username, password, email } = data;
	if (!username || !password || !email) throw new HandleError('Не все поля заполнены', 400);
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.build({
		username,
		password: hashedPassword,
		email
	}).save().catch(() => null);
	if (!user) throw new HandleError('Не удалось создать пользователя', 500);
	return user;
};

const authUser = async (data) => {
	const { username, password } = data;
	if (!username || !password) throw new HandleError('Не все поля заполнены', 400);
	
	const user = await User.findOne({ where: { username } }).catch(() => null);
	if (!user) throw new HandleError('Пользователь не найден', 404);

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) throw new HandleError('Неверный пароль', 401);

	return jwt.sign(
		{
			id: user.id,
			username: user.username,
			role: user.role
		},
		process.env.JWT_SECRET,
		{ expiresIn: '1h' }
	);
};

const getUserById = async (id) => {
	const user = await User.findOne({ where: { id } });
	if (!user) throw new HandleError('Пользователь не найден', 404);
	return user;
};

const changeRole = async (id, role) => {
	return await User.update({ role }, { where: { id } });
};

export default {
	createUser,
	authUser,
	getUserById,
	changeRole
};
