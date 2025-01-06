import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  DRIVER_ACCEPT_ORDER,
  DRIVER_AVAILABLE_JOB,
  DRIVER_COMPLETED,
  DRIVER_ONGOING,
} from "../../data/api/driver/order";
import { OrderDTO } from "../../data/api/modals/order";


export const acceptJob = createAsyncThunk<string, number>(
  "delivery/acceptJob",
  async (orderId: number) => {
    try {
      const response = await axios.post(DRIVER_ACCEPT_ORDER + "/" + orderId, null, {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      });
      
      // Return a success message when the API call is successful
      return response.data;
    } catch (e: any) {
      // If the request fails, throw the error to pass it to the rejected action
      throw new Error(e.response?.data?.message || "Failed to accept the job");
    }
  }
);


export const pastDelivery = createAsyncThunk<OrderDTO[]>(
  "delivery/pastDelivery",
  async () => {
    try {
      const response = await axios(DRIVER_COMPLETED, {
        timeout: 5000,
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
    return [];
  }
);



export const getAvailableJobs = createAsyncThunk<OrderDTO[]>(
  "jobs/getAvailableJobs",
  async () => {
    try {
      const response = await axios(DRIVER_AVAILABLE_JOB, {
        timeout: 5000,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      });

   

      return response.data;
    } catch (e) {
      console.log(e);
    }
    return [];
  }
);

export const currentJob = createAsyncThunk<OrderDTO[]>(
  "jobs/currentJob",
  async () => {
    try {
      const response = await axios(DRIVER_ONGOING, {
        timeout: 5000,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
    return [];
  }
);

interface DeliverySliceProp {
  pastDelivery: OrderDTO[];
  currentJob: OrderDTO[];
  availableJob: OrderDTO[];
  loading: boolean;
  error: string | null;
}

const InitialState: DeliverySliceProp = {
  pastDelivery: [],
  currentJob: [],
  availableJob: [],
  loading: false,
  error: "",
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pastDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        pastDelivery.fulfilled,
        (state, action: PayloadAction<OrderDTO[]>) => {
          state.loading = false;
          state.pastDelivery = action.payload;
          //console.log("From Order Slice " + action.payload)
        }
      )
      .addCase(pastDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user orders";
      })
      .addCase(getAvailableJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAvailableJobs.fulfilled,
        (state, action: PayloadAction<OrderDTO[]>) => {
          state.loading = false;
          state.availableJob = action.payload;
        }
      )
      .addCase(getAvailableJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch available jobs";
      })
      .addCase(currentJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        currentJob.fulfilled,
        (state, action: PayloadAction<OrderDTO[]>) => {
          state.loading = false;
          state.currentJob = action.payload;
        }
      )
      .addCase(currentJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch current job";
      })
      .addCase(acceptJob.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(acceptJob.fulfilled, (state, action : PayloadAction<string>) => {
        state.loading = false;
        console.log(action.payload)
        alert(action.payload);
      })
      .addCase(acceptJob.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.error.message || "Failed to accept job";
        state.error = errorMessage;
        alert(errorMessage); // Show the error in an alert
      });
  },
});

export default deliverySlice.reducer
