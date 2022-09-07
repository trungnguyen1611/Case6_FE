import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false
}

export const dialogTransactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        openDialogTransaction: (state,action) => {
            state.value = true
        },
        closeDialogTransaction: (state,action) => {
            state.value = false
        }
    },
})

export const {openDialogTransaction,closeDialogTransaction} = dialogTransactionSlice.actions

export default dialogTransactionSlice