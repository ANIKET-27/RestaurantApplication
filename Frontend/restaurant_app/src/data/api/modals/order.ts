

export interface OrderDTO {
    orderId: number;
    orderDate: string;
    orderStatus: number;
    totalAmount: number;
    latitude: number;
    longitude: number;
    deliveryInstructions: string;
    transactionId: string | null;
    customerName: string;
    driverName: string | null;
    driverId: number | null;
    userId: number;
    driverPhNo: string | null;
    customerPhNo: string;
    orderItems: OrderDtoDish[]
  }

  
  
  export interface OrderDtoDish {
    // Assuming the Dish object has these properties, update as necessary
    dishId: number;
    name: string;
    description: string;
    price: number;
    category: string;
    url: string;
    quantity : number

  }


  export interface OrderStatus {
    statusOfTheOrder : string;
    nextStatusForButton : string;
    bgColor: string;
    textColor: string;
    instruction : string;
  }


  
