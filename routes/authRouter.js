const express = require('express');
const app = require('../app');
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require('../controllers/authController');
const { isUserAuthenticated, authorizedRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isUserAuthenticated, getUserProfile);
router.route('/password/update').put(isUserAuthenticated, updatePassword);
router.route('/me/update').put(isUserAuthenticated, updateProfile);

router
  .route('/admin/users')
  .get(isUserAuthenticated, authorizedRoles('admin'), allUsers);

router
  .route('/admin/user/:id')
  .get(isUserAuthenticated, authorizedRoles('admin'), getUserDetails);

router
  .route('/admin/user/:id')
  .put(isUserAuthenticated, authorizedRoles('admin'), updateUser);
router
  .route('/admin/user/:id')
  .delete(isUserAuthenticated, authorizedRoles('admin'), deleteUser);

router.route('/logout').get(logoutUser);

module.exports = router;
