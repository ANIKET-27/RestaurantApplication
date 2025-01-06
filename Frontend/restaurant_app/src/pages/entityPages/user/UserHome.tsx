import React from 'react'
import NavBar from '../../navbar/NavBar'
import CenterBodyRoutes from '../../CenterBody/routes/CenterBodyRoutes'
import RightSidebar from '../../CenterBody/RightSidebar'

function UserHome() {
 
return (
  <div className='w-full h-full bg-color-cream flex flex-col'>
    <NavBar role='user'/>
    <div className=" h-full w-full bg-transparent flex flex-grow">
         <CenterBodyRoutes/>
        <RightSidebar/>
    </div>
      
  </div>
)
}

export default UserHome