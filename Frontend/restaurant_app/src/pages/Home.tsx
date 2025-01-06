
import React from "react"
import RightSidebar from "./CenterBody/RightSidebar"
import CenterBodyRoutes from "./CenterBody/routes/CenterBodyRoutes"
import NavBar from "./navbar/NavBar"



function Home() {

return (
    <div className='h-100% w-100%  bg-color-cream flex-col'>
      <NavBar {...{role : "public"}}/>
      <div className=" h-full w-full bg-transparent flex flex-1">
        <CenterBodyRoutes/>
         <RightSidebar/>
        </div>
       </div>

  )
}


export default Home