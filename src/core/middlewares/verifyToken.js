import cookie from "cookie";
import jwt from "jsonwebtoken";
import "dotenv/config";

function verifyToken(req, res, next) {
	const SECRET_KEY = process.env.SECRET_KEY;
        const token = req.headers.authorization;

    
	if (!token) {
		return res
			.status(403)
			.json({ message: token });
	}

	try {

	        const key = token.split(" ")[1];
	        const payload = jwt.verify(key, SECRET_KEY);
		//req.body["info_token"] = payload;
		next();
	} catch {
		return res
			.status(403)
			.json({ message: token });
	}
}

export default verifyToken;
