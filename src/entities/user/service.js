import { User } from "./model.js";
import jwt from 'jsonwebtoken';
const createUser = async (data) => {
	const { username, password, email } = data;
	return await User
		.build({ username, password, email })
		.save()
		.catch((err) => err);
};

const authUser = async (data) => {
	const { username, password } = data;
	const user = await User
		.findOne({ where: { username, password } })
		.catch((err) => err);
	if (!user) return null
	return jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const getUserById = async (id) => {
	return await User
		.findOne({ where: { id } })
		.catch((err) => err);
};

const changeRole = async (id, role) => {
	return await User
		.update({ role }, { where: { id } })
		.catch((err) => err);
};


export default { createUser, authUser, getUserById, changeRole };