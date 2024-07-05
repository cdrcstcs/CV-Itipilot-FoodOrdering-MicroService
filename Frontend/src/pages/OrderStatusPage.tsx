import React from 'react';
import { useGetMyOrders } from '@/api/OrderApi';
import OrderStatusDetail from '@/components/OrderStatusDetail';
import OrderStatusHeader from '@/components/OrderStatusHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useGetImageById } from '@/api/ImageApi';
import LoadingButton from '@/components/LoadingButton';
import { Order } from '@/types';

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <LoadingButton />;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders found</div>;
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <OrderStatusItem key={order._id} order={order} />
      ))}
    </div>
  );
};

type OrderStatusItemProps = {
  order: Order;
};

const OrderStatusItem: React.FC<OrderStatusItemProps> = ({ order }) => {
  const { imageUrl: existingImage } = useGetImageById(order.restaurant.imageId);

  return (
    <div className="bg-gray-50 p-10 rounded-lg">
      <OrderStatusHeader order={order} />
      <div className="grid gap-10 md:grid-cols-2">
        <OrderStatusDetail order={order} />
        {existingImage && (
          <AspectRatio ratio={16 / 5}>
            <img
              src={`http://localhost:7000/${existingImage}`}
              alt="Restaurant Image"
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
      </div>
    </div>
  );
};

export default OrderStatusPage;
