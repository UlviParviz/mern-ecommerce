import express from "express";
import {
  canUserReview,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getProductReviews,
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
  uploadProductImages,
} from "../controllers/product.controller.js";
import { authorizeRoles, isAuthendicatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(getSingleProduct);

router
  .route("/admin/products")
  .post(isAuthendicatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/admin/products/:id/upload_images")
  .put(isAuthendicatedUser, authorizeRoles("admin"), uploadProductImages);

router
  .route("/admin/products")
  .get(isAuthendicatedUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/products/:id")
  .put(isAuthendicatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/products/:id")
  .delete(isAuthendicatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/reviews")
  .get(isAuthendicatedUser, getProductReviews)
  .put(isAuthendicatedUser, createProductReview);

router
  .route("/admin/reviews")
  .delete(isAuthendicatedUser, authorizeRoles("admin"), deleteReview);

router.route("/can_review").get(isAuthendicatedUser, canUserReview);

export default router;
