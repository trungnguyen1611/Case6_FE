import {createSlice} from "@reduxjs/toolkit";

const initialState = {}
const WalletIdSlice = createSlice({
    name: 'WalletId',
    initialState: {
        walletId: initialState
    }
    ,
    reducers: {
        setWalletId: (state, action) => {
            state.walletId = action.payload
        }
    }
})

export const {setWalletId} = WalletIdSlice.actions

export default WalletIdSlice.reducer
