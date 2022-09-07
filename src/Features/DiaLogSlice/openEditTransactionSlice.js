import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const dialogEditTransactionSlice = createSlice({
    name: 'editTransaction',
    initialState,
    reducers: {
        openDialogEditTransaction: (state,action) => {
            state.value = true
        },
        closeDialogEditTransaction: (state,action) => {
            state.value = false
        }
    },
})

export const {openDialogEditTransaction,closeDialogEditTransaction} = dialogEditTransactionSlice.actions

export default dialogEditTransactionSlice