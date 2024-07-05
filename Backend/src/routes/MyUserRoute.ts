import express from "express";
import MyUserController from "../controllers/MyUserController";
import { extractUserIdMiddleware } from "../middleware/Middleware";
const router = express.Router();
router.get("/", 
    // extractUserIdMiddleware, 
    MyUserController.getCurrentUser);
export default router;
