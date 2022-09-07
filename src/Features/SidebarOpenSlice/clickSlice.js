import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
const clickSlice = createSlice({
    name: 'layout',
    initialState: {
        value: initialState
    },
    reducers: {
        addClick: (state,action)=>{
            state.value = action.payload
        }
    }
})

export default clickSlice
export const {addClick} = clickSlice.actions //de goi trong dispatch