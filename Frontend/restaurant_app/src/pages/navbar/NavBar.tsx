import React from 'react'
import RestName from './RestName'
import NavBarOptions from './NavBarOptions'
import Login from './Login'

function NavBar( props : {role : string}) {
  return (
    <div className='w-full h-40  flex justify-between items-center bg-transparent'>
    <RestName/>
    <NavBarOptions role={props.role}/>
    <Login/>
    </div>
  )
}

export default NavBar