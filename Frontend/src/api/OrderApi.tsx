import { Order } from "@/types";
import { CreateOrderType } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { getCookie } from "@/usertoken";
export const useGetMyOrders = () => {
  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const response = await fetch(`http://localhost:7000/order`, {
      headers: {
        Authorization: `Bearer ${getCookie('usertoken')}`,
      },
    }
  );
    if (!response.ok) {
      throw new Error("Failed to get orders");
    }
    return response.json();
  };
  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest
  );
  return { orders, isLoading };
};
export const useCreateOrder = () => {
  const createOrderRequest = async (newOrder: CreateOrderType): Promise<CreateOrderType> => {
    const response = await fetch(`http://localhost:7000/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie('usertoken')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });
    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    return response.json();
  };
  const { mutate: createOrder, isError, error } = useMutation(
    createOrderRequest,
    {
      onSuccess: () => {
        toast.success("Order created successfully");
      },
      onError: (err: Error) => {
        toast.error(`Failed to create order: ${err.message}`);
      },
    }
  );
  return { createOrder, isError, error };
};
