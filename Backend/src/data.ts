import mongoose from "mongoose";
import { UserType, RestaurantType, OrderType, ImageType, MenuItemType, CartItemType  } from "./type";
import Restaurant from "./models/restaurant";
import User from "./models/user";
import Image from "./models/Image";
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateRandomPhoneNumber = (): number => {
  const digits = Math.floor(Math.random() * 9000000000) + 1000000000;
  return digits;
};
const imageUrls: string[] = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
  "10.jpeg",
];
const generateImageData = (): ImageType[] => {
  const imageData: ImageType[] = [];
  for (let i = 0; i < 10; i++) {
    const image: ImageType = { _id: new mongoose.Types.ObjectId ,image: imageUrls[i] };
    imageData.push(image);
  }
  return imageData;
};
const generateUsers = async (): Promise<UserType[]> => {
  const users: UserType[] = [];
  const countries: string[] = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "India",
    "South Africa",
  ];
  const userTypes: string[] = ["ADMIN", "USER"];
  const imageIds: mongoose.Types.ObjectId[] = (await Image.find()).map(({ _id }) => _id);
  for (let i = 0; i < 20; i++) {
    const user: UserType = {
      _id: new mongoose.Types.ObjectId,
      imageId: imageIds[getRandomInt(0, imageIds.length - 1)],
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: `password${i + 1}`,
      country: countries[getRandomInt(0, countries.length - 1)],
      phone: generateRandomPhoneNumber(),
      longitude: getRandomInt(-180, 180),
      latitude: getRandomInt(-90, 90),
      userType: userTypes[getRandomInt(0, userTypes.length - 1)],
    };
    users.push(user);
  }
  return users;
};

const generateMenuItems = (): MenuItemType[] => {
  const menuItems: MenuItemType[] = [];
  const descriptions: string[] = [
    "Delicious Burger",
    "Exquisite Pasta",
    "Tasty Pizza",
    "Refreshing Salad",
    "Savory Sushi",
    "Gourmet Steak",
    "Hearty Soup",
    "Healthy Wrap",
    "Authentic Ramen",
    "Decadent Dessert",
  ];

  for (let i = 0; i < 5; i++) {
    const menuItem: MenuItemType = {
      name: descriptions[i],
      price: Math.floor(Math.random() * 50) + 10, // Random price between 10 and 59
    };
    menuItems.push(menuItem);
  }
  return menuItems;
};

const cuisineList =[
  "American",
  "BBQ",
  "Breakfast",
  "Burgers",
  "Cafe",
  "Chinese",
  "Desserts",
  "French",
  "Greek",
  "Healthy",
  "Indian",
  "Italian",
  "Japanese",
  "Mexican",
  "Noodles",
  "Organic",
  "Pasta",
  "Pizza",
  "Salads",
  "Seafood",
  "Spanish",
  "Steak",
  "Sushi",
  "Tacos",
  "Tapas",
  "Vegan",
];
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington"
]

const generateRestaurants = async (): Promise<RestaurantType[]> => {
  const restaurants: RestaurantType[] = [];
  const countries: string[] = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "India",
    "South Africa",
  ];
  const userIds: mongoose.Types.ObjectId[] = (await User.find()).map(({ _id }) => _id);
  const imageIds: mongoose.Types.ObjectId[] = (await Image.find()).map(({ _id }) => _id);

  for (let i = 0; i < 200; i++) {
    const menuItems: MenuItemType[] = generateMenuItems();
    const restaurant: RestaurantType = {
      _id: new mongoose.Types.ObjectId,
      user: userIds[getRandomInt(0, userIds.length - 1)],
      restaurantName: `Restaurant ${i + 1}`,
      city: cities[getRandomInt(0, cities.length - 1)],
      country: countries[getRandomInt(0, countries.length - 1)],
      deliveryPrice: Math.floor(Math.random() * 10) + 5, // Random delivery price between 5 and 14
      estimatedDeliveryTime: Math.floor(Math.random() * 60) + 30, // Random delivery time between 30 and 89 minutes
      cuisines: [cuisineList[getRandomInt(0,cuisineList.length -1)],cuisineList[getRandomInt(0,cuisineList.length -1)],cuisineList[getRandomInt(0,cuisineList.length -1)]], // Replace with actual cuisines if needed
      menuItems: menuItems,
      imageId: imageIds[getRandomInt(0, imageIds.length - 1)], // Replace with actual image ID if needed
      lastUpdated: new Date(),
    };
    restaurants.push(restaurant);
  }
  return restaurants;
};

const generateOrders = async (): Promise<OrderType[]> => {
  const orders: OrderType[] = [];
  const cartItemsData: CartItemType[] = [
    { menuItemId: new mongoose.Types.ObjectId(), quantity: 2, name: "Burger" },
    { menuItemId: new mongoose.Types.ObjectId(), quantity: 1, name: "Pizza" },
    { menuItemId: new mongoose.Types.ObjectId(), quantity: 3, name: "Salad" },
  ];
  const userIds: mongoose.Types.ObjectId[] = (await User.find()).map(({ _id }) => _id);
  const restaurantIds: mongoose.Types.ObjectId[] = (await Restaurant.find()).map(({ _id }) => _id);

  for (let i = 0; i < 20; i++) {
    const order: OrderType = {
      _id: new mongoose.Types.ObjectId,
      restaurant: restaurantIds[getRandomInt(0, restaurantIds.length - 1)],
      user: userIds[getRandomInt(0, userIds.length - 1)],
      deliveryDetails: {
        email: `user${i + 1}@example.com`,
        name: `User ${i + 1}`,
        longitude: Math.random() * 360 - 180,
        latitude: Math.random() * 180 - 90,
      },
      cartItems: cartItemsData,
      totalAmount: Math.floor(Math.random() * 1000) + 100,
      status: "placed",
      createdAt: new Date(),
    };
    orders.push(order);
  }
  return orders;
};

export { generateImageData, generateOrders, generateRestaurants, generateUsers };
