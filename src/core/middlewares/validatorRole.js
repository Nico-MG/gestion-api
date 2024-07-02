const validatorRole = (req, res, next) => {
	const role = req.body.info_token.role;
	req.body.info_token = undefined;
	if (role !== "ADMIN") {
		return res.sendStatus(403);
	}

	next();
};

export default validatorRole;
