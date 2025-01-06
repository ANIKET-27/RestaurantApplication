import React, { useEffect } from 'react'
import CenterBodyRoutes from '../../CenterBody/routes/CenterBodyRoutes'

import NavBar from '../../navbar/NavBar'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../state/store'
import { currentJob, getAvailableJobs, pastDelivery } from '../../../state/driver/deliverySlice'

function DriverHome() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAvailableJobs())
    dispatch(currentJob());
    dispatch(pastDelivery())  
  },[])

  return (
    <div className='h-screen w-screen  bg-color-cream '>
      <NavBar role='driver'/>
      <div className=" h-full w-full bg-transparent flex">
        <div className="flex-1">
         <CenterBodyRoutes/>
         </div>
        </div>
        
    </div>
  )
}

export default DriverHome