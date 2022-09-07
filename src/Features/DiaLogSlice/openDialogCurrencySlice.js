import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
const openDialogCurrencySlice = createSlice({
    name: 'dialogCurrency',
    initialState: {
        value: initialState
    },
    reducers: {
        closeDialogCurrency: (state,action)=>{
            state.value = action.payload
        },
        openDialogCurrency: (state,action)=>{
            state.value = action.payload
        }
    }
})

export default openDialogCurrencySlice
export const {closeDialogCurrency, openDialogCurrency} = openDialogCurrencySlice.actions //de goi trong dispatch