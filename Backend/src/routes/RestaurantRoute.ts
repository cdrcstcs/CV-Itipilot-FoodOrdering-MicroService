import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";
import { extractUserIdMiddleware } from "../middleware/Middleware";
const router = express.Router();
router.get("/:restaurantId",param("restaurantId").isString().trim().notEmpty().withMessage("RestaurantId paramenter must be a valid string"), extractUserIdMiddleware, RestaurantController.getRestaurant);
router.get("/search/:city",param("city").isString().trim().notEmpty().withMessage("City paramenter must be a valid string"), extractUserIdMiddleware, RestaurantController.searchRestaurant);
export default router;