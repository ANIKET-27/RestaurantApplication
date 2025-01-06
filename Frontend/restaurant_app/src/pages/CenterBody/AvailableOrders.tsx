import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OrderDTO } from '../../data/api/modals/order';
import { AppDispatch } from '../../state/store';
import { acceptJob, getAvailableJobs } from '../../state/driver/deliverySlice';

function AvailableOrders() {
  const orders = useSelector((state: any) => state.delivery.availableJob as OrderDTO[]);
  const loading = useSelector((state: any) => state.delivery.loading);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <AvailableOrdersList listOfOrder={orders} dispatch={dispatch} loading={loading}/>
  );
}

const AvailableOrdersList: React.FC<{ listOfOrder: OrderDTO[], dispatch: AppDispatch, loading: boolean }> = ({ listOfOrder, dispatch, loading }) => {

  const handleAccept = (orderId: number) => {
    console.log(`Accepted order with ID: ${orderId}`);

    dispatch(acceptJob(orderId)).then(() => {
      dispatch(getAvailableJobs());
    });
  };

  return (
    <div className="bg-cream p-6 rounded-lg max-w-xl mx-auto shadow-lg">
      {/* Conditionally render loading spinner or the order list */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="space-y-4">
          {listOfOrder.map((order) => (
            <li
              key={order.orderId}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="text-green-800">
                <p className="font-bold">Order ID: {order.orderId}</p>
                <p>Distance: {order.latitude} km</p>
                <p>Rupees: ₹{order.totalAmount}</p>
              </div>

              <button
                className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800 transition"
                onClick={() => handleAccept(order.orderId)}
                disabled={loading}
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default AvailableOrders;
