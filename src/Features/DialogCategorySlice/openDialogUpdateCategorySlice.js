import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
const openDialogUpdateCategorySlide = createSlice({
    name: 'dialogChangePass',
    initialState: {
        value: initialState
    },
    reducers: {
        closeDialogUpdateCategory: (state,action)=>{
            state.value = action.payload
        },
        openDialogUpdateCategory: (state,action)=>{
            state.value = action.payload
        }
    }
})

export default openDialogUpdateCategorySlide
export const {closeDialogUpdateCategory, openDialogUpdateCategory} = openDialogUpdateCategorySlide.actions //de goi trong dispatch