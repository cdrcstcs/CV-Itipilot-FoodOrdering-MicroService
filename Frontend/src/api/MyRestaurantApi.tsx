import { Order, Restaurant } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { getCookie } from "@/usertoken";
export const useGetMyRestaurant = () => {
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const response = await fetch(`http://localhost:7000/myres`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie('usertoken')}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };
  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );
  return { restaurant, isLoading };
};
export const useCreateMyRestaurant = () => {
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    console.log(...restaurantFormData);
    const response = await fetch(`http://localhost:7000/myres`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie('usertoken')}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  };
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant created!");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }
  return { createRestaurant, isLoading };
};
export const useUpdateMyRestaurant = () => {
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const response = await fetch(`http://localhost:7000/myres`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getCookie('usertoken')}`,
      },
      body: restaurantFormData,
    });
    if (!response) {
      throw new Error("Failed to update restaurant");
    }
    return response.json();
  };
  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant Updated");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }
  return { updateRestaurant, isLoading };
};
export const useGetMyRestaurantOrders = () => {
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const response = await fetch(`http://localhost:7000/myres/order`, {
      headers: {
        Authorization: `Bearer ${getCookie('usertoken')}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return response.json();
  };
  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );
  return { orders, isLoading };
};
type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};
export const useUpdateMyRestaurantOrder = () => {
  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const response = await fetch(
      `http://localhost:7000/myres/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getCookie('usertoken')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update status");
    }
    return response.json();
  };
  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);
  if (isSuccess) {
    toast.success("Order updated");
  }
  if (isError) {
    toast.error("Unable to update order");
    reset();
  }
  return { updateRestaurantStatus, isLoading };
};