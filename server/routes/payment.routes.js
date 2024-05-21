import express from "express";

import { isAuthendicatedUser } from "../middlewares/auth.js";
import { stripeCheckoutSession } from "../controllers/payment.controllers.js";
const router = express.Router();

router.route("/payment/checkout_session").post(isAuthendicatedUser, stripeCheckoutSession)

export default router;
