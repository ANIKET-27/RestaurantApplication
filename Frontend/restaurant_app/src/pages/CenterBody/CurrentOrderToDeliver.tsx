import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { OrderDTO } from '../../data/api/modals/order'
import { USER_ONGOING } from '../../data/api/user/order'
import { AppDispatch } from '../../state/store'
import { fetchUserOrders } from '../../state/user/orderSlice'
import OrderTable from './OrderTable'
import { currentJob } from '../../state/driver/deliverySlice'


function CurrentOrderToDeliver() {
  const order : OrderDTO[] = useSelector((state : any ) => state.delivery.currentJob)
 const loading = useSelector((state : any) => state.delivery.loading)

const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    dispatch(currentJob())
  },[])

  return (
    <div className='flex flex-1 justify-center '>
        {
        loading ? <div>
          <Loading/>
        </div>
        :
       <OrderTable listOfOrder={order}></OrderTable> 
        
      }

    </div>
  )
}

export default CurrentOrderToDeliver