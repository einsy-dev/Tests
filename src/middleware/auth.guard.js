const authGuard = (role = ['user']) => {
	if (!Array.isArray(role)) throw new Error('role must be an array');
	return (req, res, next) => {
		if (req.user && role.includes(req.user.role)) {
			next();
			return;
		}
		res.sendStatus(403);
	}
}

export default authGuard