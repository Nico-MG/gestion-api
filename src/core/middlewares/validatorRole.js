const validatorRole = (req, res, next) => {
	const role = req.body.info_token.role;
	delete req.body["info_token"];
	if (role !== "ADMIN") {
		return res.status(403).json({ message: "No autorizado" });
	}

	next();
};

export default validatorRole;
