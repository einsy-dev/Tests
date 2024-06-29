import Error from "../config/error/error.js";

const authGuard = (role = []) => {
	if (!Array.isArray(role)) throw new Error('Role must be an array', 500);
	role.unshift('user');

	return (req, res, next) => {
		if (!req.user) throw new Error('Требуется авторизация', 401);

		if (role.includes(req.user.role)) {
			return next();
		}

		throw new Error('Не достаточно прав', 403);
	}
}

export default authGuard