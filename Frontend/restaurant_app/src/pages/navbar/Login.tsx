import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../state/store';



function Login() {

  const dispatch = useDispatch<AppDispatch>();

  const stateLogIn = useSelector((state:any) => state.auth.loggedIn)

  const navigate = useNavigate();

  const handleLogIn = () => {
   
    navigate("/login")

}
 
return (
     
     stateLogIn?
     <div className=' m-4 p-4 flex gap-4' onClick={handleLogIn}>

    <AccountCircleIcon fontSize='large' style={{ color: green[900] }}/>
    <NotificationsNoneIcon fontSize='large' style={{ color: green[900] }}/>
     </div>
     :
     //<Link to='/Login'>
     <div className=' w-fit h-fit m-4 p-3 rounded-lg bg-color-lightGreen cursor-pointer flex items-center justify-center'
        onClick={handleLogIn}
     >LOG IN</div>
    // </Link>
  )
}

export default Login