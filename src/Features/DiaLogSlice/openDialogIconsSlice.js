import {createSlice} from "@reduxjs/toolkit";

const initialState = false;
const openDialogIconsSlice = createSlice({
    name: 'dialogIcons',
    initialState: {
        value: initialState
    },
    reducers: {
        closeDialogIcons: (state,action)=>{
            state.value = action.payload
        },
        openDialogIcons: (state,action)=>{
            state.value = action.payload
        }
    }
})

export default openDialogIconsSlice
export const {closeDialogIcons, openDialogIcons} = openDialogIconsSlice.actions //de goi trong dispatch