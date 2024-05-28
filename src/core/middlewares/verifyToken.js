import cookie from "cookie";
import jwt from "jsonwebtoken";
import "dotenv/config";

function verifyToken(req, res, next) {
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = req.headers.cookie;


    if(!token){
	res.send("invalid token");
    }
    try{
	const key = token.split('=')[1]; // 
	const payload = jwt.verify(key, SECRET_KEY);
	next();

    } catch {
	res.status(403).send("access denied");
    }
	
    }

export default verifyToken;
