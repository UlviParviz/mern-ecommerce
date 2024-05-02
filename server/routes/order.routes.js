import express from "express";
import { authorizeRoles, isAuthendicatedUser } from "../middlewares/auth.js";
import { allOrders, deleteOrder, getOrderDetails, myOrders, newOrder, updateOrder } from "../controllers/order.controllers.js";
const router = express.Router();

router.route("/orders/new").post(isAuthendicatedUser, newOrder);
router.route("/orders/:id").get(isAuthendicatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthendicatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthendicatedUser, authorizeRoles("admin"), allOrders);

router
  .route("/admin/orders/:id")
  .put(isAuthendicatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthendicatedUser, authorizeRoles("admin"), deleteOrder);




export default router;
