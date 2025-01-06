
import { useEffect } from "react";
import RoleBaseRoutes from "./routes/RoleBaseRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HandleLogin} from "./utils/handleLogin";
import { AppDispatch } from "./state/store";



export default function App() {

  console.log(localStorage.getItem("refreshToken"))
 
  const role = useSelector((state:any) => state.auth.userRole);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

 useEffect(() => {
  
    HandleLogin(dispatch)
    
    if(role == 'User') navigate("/user", {replace : true})
    if(role == 'Driver') navigate("/driver", {replace : true})
        
  },[role])

 return (
   <RoleBaseRoutes/>
  )
}
