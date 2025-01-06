import React from 'react';
import { OrderDTO } from '../../data/api/modals/order';
import { formatDate } from '../../utils/date';
import { useSelector } from 'react-redux';
import { orderStatusMap } from '../../data/orderStatus';
import { OrderStatus } from '../../data/api/modals/order';
import { dividerClasses } from '@mui/material';
import { useNavigate } from 'react-router';


interface OrderItemViewProp {
  listOfOrder: OrderDTO[];
}

const OrderTable: React.FC<OrderItemViewProp> = ({ listOfOrder }) => {

  const currentUser = useSelector((state : any) => state.auth.userRole)
  const isAdminOrDriver = currentUser === "Driver" || currentUser === "Admin";
  const navigate = useNavigate();


  if (listOfOrder.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-green-700 text-xl font-semibold">No orders found</p>
      </div>
    );
  }



  const handleRowClick = (order: OrderDTO) => {
    navigate(`/OrderView`, { state: { order } });
  };

  return (
    <div className="">
      <table className="bg-color-lightGreen w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Serial No.</th>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Order Status</th>
            <th className="px-4 py-2 border">Order Date</th>
            <th className="px-4 py-2 border">Order Value</th>
            {isAdminOrDriver && <th className="px-4 py-2 border">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {listOfOrder.map((order: OrderDTO, index: number) => (
            <tr
              key={order.orderId}
              className="text-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(order)}
            >
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">#{order.orderId}</td>
              <td className="px-4 py-2 border">{renderOrderStatus(order.orderStatus)}</td>
              <td className="px-4 py-2 border">{formatDate(order.orderDate)}</td>
              <td className="px-4 py-2 border">${order.totalAmount}</td>
              {isAdminOrDriver && <th className="px-4 py-2 border">{renderActionButton(order.orderStatus,currentUser)}</th>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export const renderActionButton = (status: number , user: string): JSX.Element => {
    const orderStatus = orderStatusMap.get(status);

    if(!orderStatus) return(<div/>);
  
    if(user === "Driver"){
        if(status < 2 ){
            return renderInstruction(orderStatus.instruction);
        }
        else return renderAction(orderStatus.nextStatusForButton);
    }
    else if (user === "Admine") {
        if(status > 2 ){
            return renderInstruction(orderStatus.instruction);
        }
        else return renderAction(orderStatus.nextStatusForButton);
    }
    else return <></>
  };

  const renderInstruction = (status: string) : JSX.Element => {
    if (!status) return (<div/>);
    return (
      <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded">{status}</span> // Style for instructions
    );
  };
  
  // Function to render action button (next step in the order)
  const renderAction = (actionText: string) : JSX.Element  => {
    return (
      <button
        className="bg-color-darkGreen text-color-cream px-4 py-2 rounded-md hover:bg-green-800 transition duration-300"
        onClick={() => console.log("Clicked")}
      >
        {actionText}
      </button>
    );
  };

export const renderOrderStatus = (status: number): JSX.Element => {
    const orderStatus = orderStatusMap.get(status);
    
    if (!orderStatus) {
      // Fallback for unknown status
      return (
        <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded">
          Unknown Status
        </span>
      );
    }
  
    const { statusOfTheOrder, bgColor, textColor } = orderStatus;
  
    return (
      <span className={`${bgColor} ${textColor} py-1 px-2 rounded`}>
        {statusOfTheOrder}
      </span>
    );
  };


export default OrderTable;
