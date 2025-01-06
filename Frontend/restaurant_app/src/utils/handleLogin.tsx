import axios from "axios";
import { AUTH_REFRESHTOKEN } from "../data/api/auth";
import { RefreshTokenRequest } from "../data/api/modals/request/auth";
import { JwtResponse } from "../data/api/modals/response/auth";
import { makeLogin } from "../state/authSlice";
import { AppDispatch } from "../state/store";

export async function HandleLogin(dispatch: AppDispatch) {
  const refreshToken: string | null = localStorage.getItem("refreshToken");

  if (refreshToken == null || refreshToken == "") return;

  const requestToken: RefreshTokenRequest = {
    token: refreshToken,
  };

  axios(AUTH_REFRESHTOKEN, {
    timeout: 5000,
    method: "POST",
    data: requestToken,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        const data: JwtResponse = res.data;
        dispatch(
          makeLogin({
            role: data.role,
            accessToken: data.accessToken,
            token: data.token,
          })
        );
         
        console.log(data)

        localStorage.setItem("refreshToken", data.token);
        sessionStorage.setItem("accessToken", data.accessToken);
      }
    })
    .catch((e) => {

         if(e.response == undefined){
          
          alert(`Server not accepting request at the moment`);
            //console.error(e.response.status);

            return;
         }

        console.log( e.response)
        const res = e.response;

        if(res.status == 401) {
            localStorage.setItem("refreshToken", "");
            sessionStorage.setItem("accessToken", "");
            alert(`${res.data}`);
        }
        
    });
}
