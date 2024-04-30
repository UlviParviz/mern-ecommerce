import express from "express";
import { deleteProduct, getProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.route("/products").get(getProducts)
router.route("/products/:id").get(getSingleProduct)

router.route("/admin/products").post(newProduct)
router.route("/admin/products/:id").put(updateProduct)
router.route("/admin/products/:id").delete(deleteProduct)



export default router