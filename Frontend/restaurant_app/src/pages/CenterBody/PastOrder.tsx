import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { OrderDTO } from '../../data/api/modals/order'
import { USER_COMPLETED, USER_ONGOING } from '../../data/api/user/order'
import { AppDispatch } from '../../state/store'
import { fetchUserOrders } from '../../state/user/orderSlice'
import OrderTable from './OrderTable'

function PastOrder() {

 const order : OrderDTO[] = useSelector((state : any ) => state.orders.userOrders)
 const loading = useSelector((state : any) => state.orders.loading)

const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    dispatch(fetchUserOrders(USER_COMPLETED))
  },[])

 

  return (
    <div className='flex flex-1 justify-center h-screen'>
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

export default PastOrder


