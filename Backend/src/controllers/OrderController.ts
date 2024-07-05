import { Response } from "express";
import Order from "../models/order";
import { AuthenticatedRequest } from "../interface/request";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import User from "../models/user";
const getMyOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: (await User.findOne())?._id })
      .populate("restaurant")
      .populate("user");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
interface CreateOrderRequest {
  restaurantId: mongoose.Types.ObjectId;
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  cartItems: {
    menuItemId: mongoose.Types.ObjectId;
    quantity: number;
    name: string;
  }[];
}
const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      restaurantId,
      deliveryDetails,
      cartItems,
    }: CreateOrderRequest = req.body;
    if (!mongoose.isValidObjectId(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurantId" });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    let totalAmount = 0;
    for (const cartItem of cartItems) {
      const menuItem = restaurant.menuItems.find(
        item => item._id.equals(cartItem.menuItemId)
      );
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item not found: ${cartItem.menuItemId}` });
      }
      totalAmount += menuItem.price * cartItem.quantity;
    }
    const newOrder = new Order({
      restaurant: restaurantId,
      user: (await User.findOne())?._id,
      deliveryDetails,
      cartItems,
      totalAmount,
      status: "placed",
      createdAt: new Date(),
    });
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default {getMyOrders, createOrder};
