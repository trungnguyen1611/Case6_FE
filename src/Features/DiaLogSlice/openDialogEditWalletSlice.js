import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false
}

export const editWalletSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        openDialogEditWallet: (state,action) => {
            state.value = true
        },
        closeDialogEditWallet: (state,action) => {
            state.value = false
        }
    },
})

export const {openDialogEditWallet,closeDialogEditWallet} = editWalletSlice.actions

export default editWalletSlice