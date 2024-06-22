import cookie from "cookie";
import jwt from "jsonwebtoken";
import "dotenv/config";

function verifyToken(req, res, next) {
	const SECRET_KEY = process.env.SECRET_KEY;
	const token = req.headers.cookie;

	if (!token) {
		return res.sendStatus(403);
	}

	try {
		const key = token.split("=")[1];
		const payload = jwt.verify(key, SECRET_KEY);
		req.body["info_token"] = payload;
		next();
	} catch {
		return res.sendStatus(403);
	}
}

export default verifyToken;
