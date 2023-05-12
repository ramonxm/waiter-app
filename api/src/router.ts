import { Router } from "express";
import path from "node:path";
import multer from "multer";

import { createCategories } from "./app/useCases/categories/createCategories";
import { listCategories } from "./app/useCases/categories/listCategories";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProducts } from "./app/useCases/products/createProducts";
import { listProductsByCategories } from "./app/useCases/categories/listProductsByCategories";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";

const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(_req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export const router = Router();

router.get("/categories", listCategories);

router.post("/categories", createCategories);

router.get("/products", listProducts);

router.post("/products", upload.single("image"), createProducts);

router.get("/categories/:categoryId/products", listProductsByCategories);

router.get("/orders", listOrders);

router.post("/orders", createOrder);

router.patch("/orders/:orderId", changeOrderStatus);

router.delete("/orders/:orderId", cancelOrder);
