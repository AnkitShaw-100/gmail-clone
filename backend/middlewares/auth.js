import jwt from "jsonwebtoken";

function auth(req, res, next) {
  // Accept 'Authorization: Bearer <token>' or 'authorization' header
  const authHeader = req.header("Authorization") || req.header("authorization");
  const token = authHeader ? authHeader.split(" ").pop() : null;

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

export default auth;
