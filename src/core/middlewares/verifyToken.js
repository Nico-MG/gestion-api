import cookie from "cookie";
import jwt from "jsonwebtoken";
import "dotenv/config";

function verifyToken(req, res, next) {
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = req.headers.authorization;

  if (!token || token === "Bearer null") {
    return res.status(403).json({ message: "No tienes acceso a esta información" });
  }

  try {
    const key = token.split(" ")[1];
    const payload = jwt.verify(key, SECRET_KEY);
    //req.body["info_token"] = payload;
    next();
  } catch (error){

   if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'La sesión expiró' });
    }
     return res.status(401).json({ message: 'No tienes acceso a esta información' });
  }

  }


export default verifyToken;
