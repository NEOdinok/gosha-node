import { Router } from "express";

import {
  product_create_example,
  product_get_by_id,
  render_products_page,
} from "../controllers/productController.js";

import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/add-product", product_create_example);
router.get("/products/:id", requireAuth, product_get_by_id);
router.get("/products", requireAuth, render_products_page);

export default router;
