import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGetImageById } from "@/api/ImageApi";
import LoadingButton from "@/components/LoadingButton";
const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();
  if (isLoading) {
    return <LoadingButton></LoadingButton>
  }
  if (!orders || orders.length === 0) {
    return "No orders found";
  }
  return (
    <div className="space-y-10">
      {orders.map((order) => {
        const { imageUrl: existingImage} = order.restaurant ? useGetImageById(order.restaurant.imageId) : {imageUrl: null};
        return (
          <div key={order._id} className="bg-gray-50 p-10 rounded-lg">
            <OrderStatusHeader order={order} />
            <div className="grid gap-10 md:grid-cols-2">
              <OrderStatusDetail order={order} />
              {existingImage && (
                <AspectRatio ratio={16 / 5}>
                  <img
                    src={existingImage}
                    alt="Restaurant Image"
                    className="rounded-md object-cover h-full w-full"
                  />
                </AspectRatio>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default OrderStatusPage;
