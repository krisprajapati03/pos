// middlewares/role.middleware.js

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. One of these roles required: ${roles.join(", ")}.`
      });
    }
    next();
  };
};
