export const requireRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user.userId || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "You do not have access permission." });
    }
    next();
  };
};
