const validatorRole = (req, res, next) => {
	const role = req.body.info_token.role;
	delete req.body["info_token"];
	if (role !== "ADMIN") {
		return res.sendStatus(403);
	}

	next();
};

export default validatorRole;
