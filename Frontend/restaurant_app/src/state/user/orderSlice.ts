

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { OrderDTO } from '../../data/api/modals/order';


interface OrderState {
  userOrders: OrderDTO[];
  loading: boolean;
  error: string | null;
}


// Async thunk for fetching user orders
export const fetchUserOrders = createAsyncThunk<OrderDTO[], string>(
  'orders/ongoingOrder', async(apiEndpoint) => {
    try{
    const response  = await axios(apiEndpoint ,{
       timeout:5000,
       method : 'Get',
       headers : {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
       }
    })  

    console.log(response.data)

  return response.data

}
   catch(e){
      console.log(e)
   }

  } 
);


const initialState: OrderState = {
  userOrders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<OrderDTO[]>) => {
        state.loading = false;
        state.userOrders = action.payload;
        //console.log("From Order Slice " + action.payload)
      })

      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user orders';
      });
  },
});



export default orderSlice.reducer;