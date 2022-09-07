import {createSlice} from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('alohaUser')) || {
};
const UserSlice = createSlice({
    name: 'UserInfo',
    initialState: {
        currentUser:initialState
    }
    ,
    reducers: {
        UserLoginWithFireBase: (state,action)=>{
            state.currentUser = action.payload
            localStorage.setItem('alohaUser',JSON.stringify(action.payload))
        },
        UserLoginWithPassword: (state,action)=>{
            state.currentUser = action.payload
            localStorage.setItem('alohaUser',JSON.stringify(action.payload))
        },
        updateUserInfo: (state,action)=>{
            state.currentUser = action.payload
            localStorage.setItem('alohaUser',JSON.stringify(action.payload))
        },
        userSignOut: (state,action)=>{
            state.currentUser = {}
            localStorage.removeItem('alohaUser')
            localStorage.removeItem('JWT')
        }

    }
})

export const {UserLoginWithFireBase, updateUserInfo,UserLoginWithPassword,userSignOut} = UserSlice.actions

export default UserSlice.reducer
