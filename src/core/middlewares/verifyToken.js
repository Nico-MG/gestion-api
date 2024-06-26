import cookie from "cookie";
import jwt from "jsonwebtoken";
import "dotenv/config";

function verifyToken(req, res, next) {
	const SECRET_KEY = process.env.SECRET_KEY;
	const token = req.headers.cookie;

	if (!token) {
		return res
			.status(403)
			.json({ message: "No tienes accesos a esta información" });
	}

	try {
		const key = token.split("=")[1];
		const payload = jwt.verify(key, SECRET_KEY);
		//req.body["info_token"] = payload;
		next();
	} catch {
		return res
			.status(403)
			.json({ message: "No tienes acceso a esta información" });
	}
}

export default verifyToken;
