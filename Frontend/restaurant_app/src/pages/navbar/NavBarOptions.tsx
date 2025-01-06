import React, { useState } from 'react'
import { driverNavBar, publicNavBar, userNavBar } from '../../data/navbarData'
import { Link } from 'react-router-dom';

function NavBarOptions(props : {role : string}){

    const [curMenuIdx, setCurMenuIdx] = useState(1);

    let navItems = publicNavBar
    
    if(props.role == 'user') navItems = userNavBar;
    if(props.role == 'driver') navItems = driverNavBar;

    const handleOnClick =  (idx : number) => {
          setCurMenuIdx(idx)
    }


  return (
    <div className=' bg-transparent flex justify-between items-center  mx-auto px-4 text-color-darkGreen'>

    <ul className='hidden md:flex'>
      {navItems.map(item => (
          <Link to={item.text}>
          <li
          key={item.id}
          className={"p-4 rounded-xl m-2 cursor-pointer" + (curMenuIdx == item.id?" bg-color-lightGreen":"")}
          onClick={() => handleOnClick(item.id)}
          >
          {item.text}
        </li>
       </Link>
      ))} 
      
    </ul>
    </div>
  )
}

export default NavBarOptions