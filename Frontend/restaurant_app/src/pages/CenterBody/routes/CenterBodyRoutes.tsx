import React from 'react';
import { Route, Routes} from "react-router-dom";
import Menu from '../Menu';
import AboutUs from '../AboutUs';
import Landing from '../Landing';
import OngoingOrder from '../OngoingOrder';
import PastOrder from '../PastOrder';
import AvailableOrders from '../AvailableOrders';
import CurrentOrderToDeliver from '../CurrentOrderToDeliver';
import PastDeliveries from '../PastDeliveries';



const CenterBodyRoutes: React.FC = () => {

  return (
  //  <div className='flex-1'>
     <Routes>
    <Route path={"/"} element={<Landing/>}/>
      <Route path={"/Home"} element={<Landing/>} />
      <Route path={"/Past Deliveries"} element={<PastDeliveries/>}/>
      <Route path="/Menu" element={<Menu/>}/>
      <Route path={"/About Us"} element={<AboutUs/>} />
      <Route path={"/Ongoing Orders"} element={<OngoingOrder/>} />
      <Route path={"/Past Orders"} element={<PastOrder/>} />
      <Route path={"/Current Job"} element={<CurrentOrderToDeliver/>}/>
      <Route path={"/Available Jobs"} element={<AvailableOrders/>} />
    </Routes>
  //  </div>
    
    
  );
};

export default CenterBodyRoutes;
