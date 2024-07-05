import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { useCreateOrder } from "@/api/OrderApi"; // Assuming this is where you define useCreateOrder
import { useGetMyUser } from "@/api/MyUserApi";
import LoadingButton from "@/components/LoadingButton";
import { useGetImageById } from "@/api/ImageApi";
import { useNavigate } from "react-router-dom";
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
const DetailPage = () => {
  const navigate = useNavigate();
  // const { currentUser, isLoading: isUserLoading } = useGetMyUser();
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  
  const { imageUrl: existingImage} = useGetImageById(restaurant? restaurant.imageId : "");
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const { createOrder, isError, error } = useCreateOrder(); // Hook to create order
  // if (isUserLoading) {
  //   return <LoadingButton></LoadingButton>;
  // }
  // if (!currentUser) {
  //   return <LoadingButton></LoadingButton>;
  // }
  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
          );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  const onCheckout = async () => {
    if (!restaurant) {
      return;
    }
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: "name",
        email: "email",
        longtitude: 4,
        latitude: 5,
      },
    };
    try {
      const createdOrder = createOrder(checkoutData);
      console.log("Order created successfully:", createdOrder);
      navigate('/order-status');
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };
  if (isLoading || !restaurant) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col gap-10">
      {existingImage?<AspectRatio ratio={16 / 5}>
        <img
          src={`http://localhost:7000/${existingImage}`}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>: null}
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
              />
              {isError && <p>Error: {error?.message}</p>}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
