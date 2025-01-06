import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN, AUTH_SIGNUP_DRIVER, AUTH_SIGNUP_USER } from "../../data/api/auth";
import { LoginDataModal } from "../../data/api/modals/auth/login";
import { JwtResponse } from "../../data/api/modals/response/auth";
import { makeLogin } from "../../state/authSlice";
import { AppDispatch } from "../../state/store";

import FaLock from "@mui/icons-material/Lock";
import FaUser from "@mui/icons-material/Person";
import { CreateUserDto } from "../../data/api/modals/request/user";
import RestName from "../navbar/RestName";

function Login() {

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState('user');

  const navigate = useNavigate();

  

  const dispatch = useDispatch<AppDispatch>();

    const handleLogin = (e : Event) =>{

      const userData : LoginDataModal = {
           userName : username,
           password : password
      }

       e.preventDefault();


      axios(AUTH_LOGIN, {
        timeout : 5000,
        method: 'POST',
        data: userData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    })
    .then((res)=>
        {

            const data : JwtResponse = res.data;
             dispatch(
              makeLogin({
              role : data.role,
              accessToken: data.accessToken,
              token: data.token
             })
            )

            localStorage.setItem("refreshToken",data.token)
            sessionStorage.setItem("accessToken",data.accessToken)
            navigate("/")
          }
        )
    .catch(
        (e)=>
        {

          const res = e.response;

          if(res.status == 500 || res.status == 400){
            alert(`${res.data}`)
          }
          else{
             alert('Something Went Wrong')
          }
        }
    )
  
  }

 

  const handleSignUp = (e : Event) => {
    
    e.preventDefault()

    if(password !== confirmPassword){
       
       alert('Password and Confirm are not same')
       return 
    }

     

    const userDto : CreateUserDto = {
      userName : username,
      password : password,
      accNo : 1,
      available : false,
      email : "",
      latitude : 0,
      longitude : 0,
      phoneNo : ""

    }
    
    const api = role == "user"? AUTH_SIGNUP_USER : AUTH_SIGNUP_DRIVER ;
    
    axios( api ,{
      timeout : 5000,
      method: 'POST',
      data: userDto,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  })
  .then((res) => 
    {

      console.log(res.data)
      
      //alert(`${res.data}`)
    }
  )
  .catch((e) => 
    {
      if(e == undefined){
        alert('Some client side error occurred')
        return
      }

      const res = e.response

      console.log(res.data)

     // alert(`${res.data}`)

    }
)


  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-color-cream">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center m-4">
        <RestName/>
        <div className="flex justify-center mb-6 m-4">
          <div
            className={`cursor-pointer pb-2 border-b-2 ${
              isLogin
                ? "border-gray-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </div>
          <div
            className={`ml-6 cursor-pointer pb-2 border-b-2 ${
              !isLogin
                ? "border-gray-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            SIGN UP
          </div>
        </div>
        {isLogin ? (
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="mb-4 flex items-center border-b border-gray-300">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4 flex items-center border-b border-gray-300">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-color-darkGreen text-white py-2 rounded hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              LOGIN
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => handleSignUp(e)}>
            <div className="mb-4 flex items-center border-b border-gray-300">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4 flex items-center border-b border-gray-300">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4 flex items-center border-b border-gray-300">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-2 focus:outline-none"
                required
              />
            </div>
         
            <div className="mb-4 flex justify-between">
              Sing Up As :
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
                className="mr-2"
              />
              User
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="driver"
                checked={role === 'driver'}
                onChange={() => setRole('driver')}
                className="mr-2"
              />
              Driver
            </label>
          </div>
          <button
              type="submit"
              className="w-full bg-color-darkGreen text-white py-2 rounded hover:bg-color-darkGreen focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              SIGN UP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;

