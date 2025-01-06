



export interface PlaceOrderDto {
    cart: { [key: number]: number}; // Change the Map to an object
    deliveryInstructions: string;
    user_id: number | null;
    latitude?: number;
  longitude?:  number;
  }