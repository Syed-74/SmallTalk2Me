// middleware/auth.js
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token" });

  const decoded = jwt.verify(token, "secret");
  req.user = decoded;

  next();
};