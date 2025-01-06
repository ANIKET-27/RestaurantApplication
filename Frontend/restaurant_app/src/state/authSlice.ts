

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JwtResponse } from '../data/api/modals/response/auth';

interface AuthState{
   loggedIn : boolean 
   accessToken: string
   refreshToken: string
   userRole : string
}

const initialState : AuthState = {
    loggedIn : false,
    accessToken : '',
    refreshToken: '',
    userRole:'Public'

}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        makeLogin(state, {payload} : PayloadAction<JwtResponse>){
            const data:JwtResponse = payload
            state.loggedIn = true,
            state.accessToken = data.accessToken,
            state.refreshToken = data.token,
            state.userRole = data.role
            localStorage.setItem("refreshToken",data.token)
        },
        makeLogout(state){
           state.loggedIn = false;
           state.refreshToken='';
           state.accessToken = '';
           sessionStorage.setItem('accessToken',"")
        },
    }
})

export const {makeLogin, makeLogout} = authSlice.actions

export default authSlice.reducer