import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {}
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        selectTransaction: (state,action) => {
            state.value = action.payload
        },
    },
})

export const {selectTransaction} = transactionSlice.actions

export default transactionSlice