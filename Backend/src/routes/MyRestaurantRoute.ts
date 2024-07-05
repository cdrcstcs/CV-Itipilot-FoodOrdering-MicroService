import express from "express";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { extractUserIdMiddleware } from "../middleware/Middleware";
import multer from "multer";
const upload = multer();

const router = express.Router();
router.get("/order", 
    // extractUserIdMiddleware, 
    MyRestaurantController.getMyRestaurantOrders);
router.patch("/order/:orderId/status", 
    // extractUserIdMiddleware, 
    MyRestaurantController.updateOrderStatus);
router.get("/", 
    // extractUserIdMiddleware, 
    MyRestaurantController.getMyRestaurant);
router.post("/", upload.none(), validateMyRestaurantRequest, 
    // extractUserIdMiddleware, 
    MyRestaurantController.createMyRestaurant);
router.put("/", upload.none(), 
    // extractUserIdMiddleware, 
    validateMyRestaurantRequest, MyRestaurantController.updateMyRestaurant);
export default router;
