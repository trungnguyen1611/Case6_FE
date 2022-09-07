import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
const openDialogDetailSlice = createSlice({
    name: 'dialogDetail',
    initialState: {
        value: initialState
    },
    reducers: {
        closeDialogDetail: (state,action)=>{
            state.value = action.payload
        },
        openDialogDetail: (state,action)=>{
            state.value = action.payload
        }
    }
})

export default openDialogDetailSlice
export const {closeDialogDetail, openDialogDetail} = openDialogDetailSlice.actions //de goi trong dispatch