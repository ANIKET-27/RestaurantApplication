
import { OrderStatus } from "./api/modals/order"


export const orderStatusMap: Map<number, OrderStatus> = new Map([
  [
    -1,
    {
      statusOfTheOrder: "Order Cancelled",
      nextStatusForButton: "N/A",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      instruction : "Already Cancled"
    },
  ],
  [
    0,
    {
      statusOfTheOrder: "Order Not Yet Confirmed",
      nextStatusForButton: "Confirm the Order Now",
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
      instruction : "Waiting to get confirmation"
    },
  ],
  [
    1,
    {
      statusOfTheOrder: "Preparing",
      nextStatusForButton: "Ready To PickUp",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      instruction : "Waiting for the preparation"
    },
  ],
  [
    2,
    {
      statusOfTheOrder: "Ready To Pickup",
      nextStatusForButton: "Pickup Order for delivery",
      bgColor: "bg-violet-100",
      textColor: "text-violet-700",
      instruction : "Waiting for the rider to pickup."
    },
  ],
  [
    3,
    {
      statusOfTheOrder: "On The Way",
      nextStatusForButton: "Complete The Order",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      instruction : "Waiting for rider to deliver."
    },
  ],
  [
    4,
    {
      statusOfTheOrder: "Order Completed",
      nextStatusForButton: "N/A",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    },
  ],
]);