import jwt from 'jsonwebtoken';
import Error from "../config/error/error.js";

const jwtDecode = (req, res, next) => {
	if (!req.headers.authorization) {
		req.user = null;
		next();
		return;
	}
	const token = req.headers.authorization.split(' ')[1];
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			throw new Error('Требуется авторизация', 401);
		}
		req.user = decoded;
		next();
	});
};

export default jwtDecode