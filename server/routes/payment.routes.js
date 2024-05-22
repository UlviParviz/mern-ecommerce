import express from "express";

import { isAuthendicatedUser } from "../middlewares/auth.js";
import { stripeCheckoutSession, stripeWebhook } from "../controllers/payment.controllers.js";
const router = express.Router();

router.route("/payment/checkout_session").post(isAuthendicatedUser, stripeCheckoutSession)
router.route("/payment/webhook").post(stripeWebhook)


export default router;
