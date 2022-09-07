import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
const openDialogWalletSlice = createSlice({
    name: 'dialogWallet',
    initialState: {
        value: initialState
    },
    reducers: {
        closeDialogWallet: (state,action)=>{
            state.value = action.payload
        },
        openDialogWallet: (state,action)=>{
            state.value = action.payload
        }
    }
})

export default openDialogWalletSlice
export const {closeDialogWallet, openDialogWallet} = openDialogWalletSlice.actions //de goi trong dispatch