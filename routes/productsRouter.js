const express = require("express");
const app = require("../app");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  newProductReview,
  getProductReviews,
  deleteProductReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isUserAuthenticated, authorizedRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router.route("/review").put(isUserAuthenticated, newProductReview);
router.route("/reviews").get(isUserAuthenticated, getProductReviews);
router.route("/review").delete(isUserAuthenticated, deleteProductReview);

router
  .route("/product/new")
  .post(isUserAuthenticated, authorizedRoles("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isUserAuthenticated, authorizedRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isUserAuthenticated, authorizedRoles("admin"), deleteProduct);

router
  .route("/admin/products")
  .get(isUserAuthenticated, authorizedRoles("admin"), getAdminProducts);

module.exports = router;
