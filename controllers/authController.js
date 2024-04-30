const User = require("../models/user");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// register /api/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const result = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: result.public_id, url: result.secure_url },
  });
  sendToken(user, 201, res);
});

// Login /api/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checks if email entered by the user
  if (!email || !password)
    return next(new errorHandler("Please enter an email or password", 400));

  //finding user in the database
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new errorHandler("Invalid email or password", 401));
  //checks if password is correct
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new errorHandler("Invalid email or password", 401));

  sendToken(user, 200, res);
});

//forget password, api/password/forget
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new errorHandler("User not found with this email", 404));
  //get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  //create reset password URL
  const resetURL = `${process.env.FONT_END_URL}/password/reset/${resetToken}`;
  const message = `Your password reset token is the following \n\n${resetURL}\n\nif you have not requested this email, please ignore it`;
  try {
    sendEmail({
      email: user.email,
      subject: "Eshop password recovery",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: `email sent to ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password, api/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user)
    return next(
      new errorHandler(
        "Password reset password token is Invalid or has been expired",
        400
      )
    );
  if (req.body.password !== req.body.confirmPassword)
    return next(new errorHandler("Passwords does not match", 400));
  // setUp a new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// get currently logged in user /api/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

// update user passwod /api/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //check previous user password
  const isMatch = await user.comparePassword(req.body.oldPassword);
  if (!isMatch) return next(new errorHandler("old password is incorrect", 400));
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// update user profile /api/me/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  //TODO update avatar
  const { name, email, avatar } = req.body;
  let newUserData = { name, email };
  if (avatar) {
    const foundUser = await User.findById(req.user.id);
    const image_id = foundUser.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);
    const result = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: result.public_id,
      url: result.url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true });
});

// Logout /api/login
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "Logged out" });
});

//Admin routes
// get all users /api/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});

// get a specific user /api/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new errorHandler("User not found with this id", 404));
  res.status(200).json({ success: true, user });
});

// update user profile /api/admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const { name, email, role } = req.body;

  await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ success: true });
});

// delete  a specific user /api/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new errorHandler("User not found with this id", 404));
  //delete avatar
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();
  res.status(200).json({ success: true });
});
