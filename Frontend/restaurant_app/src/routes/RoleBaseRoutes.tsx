import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import UserHome from '../pages/entityPages/user/UserHome'
import DriverHome from '../pages/entityPages/driver/DriverHome'
import LoginPage from  '../pages/signUp/LoginPage.tsx'
import OrderView from '../pages/CenterBody/OrderView.tsx'


function RoleBaseRoutes() {
  return (
    <div className=' w-full h-full p-4 bg-color-cream'>
      <Routes>
        <Route path="/*" element={<Home/>}></Route>
        <Route path="/user/*" element={<UserHome/>}></Route>
        <Route path="/driver/*" element={<DriverHome/>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path={"/OrderView"} element={<OrderView/>}></Route>
    </Routes>
    </div>
  )
}

export default RoleBaseRoutes