export function requireAdmin(req, _res, next) {
  if (req.user?.role !== "admin" && req.user?.role !== "college_admin") {
    const error = new Error("Admin access required.");
    error.status = 403;
    throw error;
  }

  next();
}

