import jwt from 'jsonwebtoken';
const jwtDecode = (req, res, next) => {
	if (!req.headers.authorization) {
		req.user = null;
		next();
		return;
	}
	const token = req.headers.authorization.split(' ')[1];
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: 'Invalid token' });
		}
		req.user = decoded;
		next();
	});
};

export default jwtDecode