const errorHandler = (err, req, res, next) => {
	console.log('err1');
	if (!err) return next();
	console.log('err2');
	res.status(err.status || 500).json({ status: err.status || 500, message: err.message, path: req.path, method: req.method });
}

export default errorHandler