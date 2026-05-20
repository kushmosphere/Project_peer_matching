import jwt from "jsonwebtoken";

export function requireAuth(req, _res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    const error = new Error("Authentication required.");
    error.status = 401;
    throw error;
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    const error = new Error("Invalid or expired session.");
    error.status = 401;
    throw error;
  }
}

