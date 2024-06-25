import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";
import imageRoute from "./routes/ImageRoute";
const MONGODB = 'mongodb://localhost:27017/mongo-golang';
mongoose
  .connect(MONGODB)
  .then(() => console.log("Connected to database!"));
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
app.use("/image", imageRoute);
app.use("/user", myUserRoute);
app.use("/myrestaurant", myRestaurantRoute);
app.use("/restaurant", restaurantRoute);
app.use("/order", orderRoute);
app.listen(7000, () => {
  console.log("server started on localhost:7000");
});