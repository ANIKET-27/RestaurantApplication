import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem, CartState } from "../../data/api/modals/cartModal";
import { PlaceOrderDto } from "../../data/api/modals/request/order";
import { PLACEORDERAPI } from "../../data/api/user/order";
import { RootState } from "./combineSllice";


export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const orderData = await orderListWithCoordinates(state);

    const response = await axios.post(PLACEORDERAPI, orderData, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });

    return response.data;
  }
);

async function orderListWithCoordinates(state: RootState): Promise<PlaceOrderDto> {
  const map: { [key: number]: number } = {};

  state.cart.cartList.forEach(item => {
    map[item.dish.dish_id] = item.quantity;
  });

  const coordinates = await getCurrentCoordinates();

  if (!coordinates) {
    throw new Error("Latitude and Longitude are required to place the order.");
  }

  const data: PlaceOrderDto = {
    cart: map,
    deliveryInstructions: "Make It Work This Time",
    user_id: 23, // Example user ID, replace with dynamic value
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  };

  return data;
}

function getCurrentCoordinates(): Promise<{ latitude: number; longitude: number } | undefined> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser. Please enable location access.");
      resolve(undefined);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location access denied. Order cannot be placed without location.");
        } else {
          alert("Error fetching location. Please try again.");
        }
        console.error("Location error: ", error.message);
        // resolve(undefined);
      }
    );
  });
}

// function orderList(state: RootState): PlaceOrderDto {
//   const map: { [key: number]: number } = {};

//   state.cart.cartList.forEach(item => {
//     map[item.dish.dish_id] = item.quantity;
//   });

//   const data: PlaceOrderDto = {
//     cart: map,
//     deliveryInstructions: "Make It Work This Time",
//     user_id: 23// Assuming there's a user ID in the state
    
//   };

//   return data;
// }

// Initial state for the cart
const initialState: CartState = {
  cartList: [],
  total: 0,
  loading: false,
  error: null,

};


// Cart slice definition
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDishToCart(state, { payload }: PayloadAction<CartItem>) {
      state.total += payload.dish.price * payload.quantity;
      state.cartList.push(payload);
    },
    removeCartItem(state, { payload }: PayloadAction<number>) {
      const removedItem = state.cartList.splice(payload, 1)[0];
      state.total -= removedItem.dish.price * removedItem.quantity;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList=[]
        console.log("Order Placed Successfully");
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An Error Occurred";
      });
  }
});

export const { addDishToCart, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
