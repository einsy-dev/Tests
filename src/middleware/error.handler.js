const errorHandler = (err, req, res, next) => {
	if (!err) return next();
	res.status(err.status || 500).json({
		status: err.status || 500,
		message: err.message,
		path: req.path,
		method: req.method
	});
};

export default errorHandler;
