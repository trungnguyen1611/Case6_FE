import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
}

export const currentWalletSlice = createSlice({
    name: 'currentWallet',
    initialState,
    reducers: {
        selectCurrentWallet: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { selectCurrentWallet } = currentWalletSlice.actions

export default currentWalletSlice.reducer