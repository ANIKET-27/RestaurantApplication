
import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'

import cartReduce from './user/cartSlice'
import rootReducer from './user/combineSllice'
import orderReducer from './user/orderSlice'
import deliveryReducer from './driver/deliverySlice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        cart : cartReduce,
        orders : orderReducer,
        delivery : deliveryReducer,
        rootReducer : rootReducer
    }
})

export type AppDispatch = typeof store.dispatch
export default store