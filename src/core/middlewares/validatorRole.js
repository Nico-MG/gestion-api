const validatorRole = (req, res, next) => {
	const role = req.headers.data-token.role;
	delete req.headers['data-token'];
	if (role !== 'ADMIN') {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	next();
};

export default validatorRole;
