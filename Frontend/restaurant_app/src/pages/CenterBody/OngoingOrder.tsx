import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { OrderDTO } from '../../data/api/modals/order'
import { AppDispatch } from '../../state/store'
import OrderTable from './OrderTable'
import { fetchUserOrders } from '../../state/user/orderSlice'
import { USER_ONGOING } from '../../data/api/user/order'


function OngoingOrder() {
  const order : OrderDTO[] = useSelector((state : any ) => state.orders.userOrders)
 const loading = useSelector((state : any) => state.delivery.loading)

const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    dispatch(fetchUserOrders(USER_ONGOING))
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

export default OngoingOrder