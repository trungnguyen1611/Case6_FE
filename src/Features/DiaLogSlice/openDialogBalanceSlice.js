import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
const openDialogBalanceSlice = createSlice({
    name: 'dialogBalance',
    initialState: {
        value: initialState
    },
    reducers: {
        closeDialogBalance: (state,action)=>{
            state.value = action.payload
        },
        openDialogBalance: (state,action)=>{
            state.value = action.payload
        }
    }
})

export default openDialogBalanceSlice
export const {closeDialogBalance, openDialogBalance} = openDialogBalanceSlice.actions //de goi trong dispatch