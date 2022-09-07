import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const openDialogIconCategorySlice = createSlice({
    name: 'iconCategory',
    initialState,
    reducers: {
        openDialogIconCategory: (state, action) => {
            state.value = action.payload
        },
        closeDialogIconCategory: (state, action) => {
            state.value = action.payload
        }
    },
})


export const {openDialogIconCategory, closeDialogIconCategory} = openDialogIconCategorySlice.actions

export default openDialogIconCategorySlice