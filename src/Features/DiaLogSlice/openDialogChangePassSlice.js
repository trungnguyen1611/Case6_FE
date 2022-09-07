import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
const openDialogChangePassSlide = createSlice({
    name: 'dialogChangePass',
    initialState: {
        value: initialState
    },
    reducers: {
        closeDialogChangePass: (state,action)=>{
            state.value = action.payload
        },
        openDialogChangePass: (state,action)=>{
            state.value = action.payload
        }
    }
})

export default openDialogChangePassSlide
export const { closeDialogChangePass, openDialogChangePass} = openDialogChangePassSlide.actions //de goi trong dispatch