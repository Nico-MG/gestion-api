import cookie from "cookie";
import jwt from "jsonwebtoken";
import "dotenv/config";

function verifyToken(req, res, next) {
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = req.headers.authorization;

  if (!token || token === "Bearer null") {
    return res.status(403).json({ message: "Token no encontrado" });
  }

  try {
    const key = token.split(" ")[1];
    const payload = jwt.verify(key, SECRET_KEY);
    //req.body["info_token"] = payload;
    next();
  } catch {
    return res.status(403).json({ message: "Token inválido" });
  }
}

export default verifyToken;
