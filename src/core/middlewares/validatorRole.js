const validatorRole = (req, res, next) => {
	const role = req.headers["data-token"].role;
	req.headers["data-token"] = null;

	if (role !== "ADMIN") {
		return res
			.status(401)
			.json({ message: "No tienes acceso a esta información" });
	}

	next();
};

export default validatorRole;
