import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
const openDialogAccountSlide = createSlice({
    name: 'dialog',
    initialState: {
        value: initialState
    },
    reducers: {
        closeDialog: (state,action)=>{
            state.value = action.payload
        },
        openDialog: (state,action)=>{
            state.value = action.payload
        }
    }
})

export default openDialogAccountSlide
export const {closeDialog, openDialog} = openDialogAccountSlide.actions //de goi trong dispatch