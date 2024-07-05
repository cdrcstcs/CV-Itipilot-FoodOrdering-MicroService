import mongoose from "mongoose";

interface UserType {
  _id: mongoose.Types.ObjectId;
  imageId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  country: string;
  phone: number;
  longitude: number;
  latitude: number;
  userType: string;
}

interface RestaurantType {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItemType[];
  imageId: mongoose.Types.ObjectId;
  lastUpdated: Date;
}

interface MenuItemType {
  name: string;
  price: number;
}

interface ImageType {
  _id: mongoose.Types.ObjectId;
  image: string;
}

interface OrderType {
  _id: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  deliveryDetails: {
    email: string;
    name: string;
    longitude?: number;
    latitude?: number;
  };
  cartItems: CartItemType[];
  totalAmount: number;
  status: "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";
  createdAt: Date;
}

interface CartItemType {
  menuItemId: mongoose.Types.ObjectId;
  quantity: number;
  name: string;
}

export {UserType, RestaurantType, ImageType, OrderType, MenuItemType, CartItemType};