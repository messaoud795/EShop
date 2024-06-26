const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//checks if user is authenticated or not

exports.isUserAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resources", 401));
  }
  const decoded = jwt.verify(token, process.env.jwtSecretKey);

  req.user = await User.findById(decoded.id);
  next();
});

//Handling user roles
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new ErrorHandler(
          `role ${req.user.role} is not allowed to access this resources`,
          403
        )
      );
    next();
  };
};
