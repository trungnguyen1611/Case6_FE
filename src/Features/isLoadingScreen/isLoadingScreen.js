import {createSlice} from "@reduxjs/toolkit";

const isLoadingScreenSlice = createSlice({
    name: 'UserInfo',
    initialState: {
        isLoadingScreen: false
    }
    ,
    reducers: {
        isLoadingAPIScreen: (state) => {
            state.isLoadingScreen = true
            // console.log("isLoadingScreen", state.isLoadingScreen);
        },
        afterLoadingAPIScreen: (state) => {
            state.isLoadingScreen = false
            // console.log("isLoadingScreen", state.isLoadingScreen);
        }
    }
})

export const {isLoadingAPIScreen, afterLoadingAPIScreen} = isLoadingScreenSlice.actions

export default isLoadingScreenSlice.reducer
