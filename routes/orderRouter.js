const express = require('express');
const app = require('../app');
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const router = express.Router();
const { isUserAuthenticated, authorizedRoles } = require('../middlewares/auth');

router.route('/orders/me').get(isUserAuthenticated, myOrders);
router.route('/order/:id').get(isUserAuthenticated, getSingleOrder);
router.route('/order/new').post(isUserAuthenticated, newOrder);
router
  .route('/admin/orders')
  .get(isUserAuthenticated, authorizedRoles('admin'), allOrders);
router
  .route('/admin/order/:id')
  .put(isUserAuthenticated, authorizedRoles('admin'), updateOrder);
router
  .route('/admin/order/:id')
  .delete(isUserAuthenticated, authorizedRoles('admin'), deleteOrder);

module.exports = router;
