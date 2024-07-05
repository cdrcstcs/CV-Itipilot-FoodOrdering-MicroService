import express from "express";
import OrderController from "../controllers/OrderController";
import { extractUserIdMiddleware } from "../middleware/Middleware";
const router = express.Router();
router.get("/", 
    // extractUserIdMiddleware, 
    OrderController.getMyOrders);
router.post("/", 
    // extractUserIdMiddleware, 
    OrderController.createOrder);
export default router;
