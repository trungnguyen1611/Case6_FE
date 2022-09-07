import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
}

export const detailTransactionSlice = createSlice({
    name: 'detailTransaction',
    initialState,
    reducers: {
        selectDetailTransaction: (state,action) => {
            state.value =action.payload
        },

    },
})

export const { selectDetailTransaction } = detailTransactionSlice.actions

export default detailTransactionSlice.reducer