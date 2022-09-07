import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false
}

export const walletSlice = createSlice({
    name: 'selectWallet',
    initialState,
    reducers: {
        openDialogSelectWallet: (state,action) => {
            state.value = true
        },
        closeDialogSelectWallet: (state,action) => {
            state.value = false
        }
    },
})

export const {openDialogSelectWallet,closeDialogSelectWallet} = walletSlice.actions

export default walletSlice