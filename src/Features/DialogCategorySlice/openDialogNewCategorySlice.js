import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const openDialogNewCategorySlice = createSlice({
    name: 'newCategory',
    initialState,
    reducers: {
        openDialogNewCategory: (state, action) => {
            state.value = action.payload
        },
        closeDialogNewCategory: (state, action) => {
            state.value = action.payload
        }
    },
})


export const {openDialogNewCategory, closeDialogNewCategory} = openDialogNewCategorySlice.actions

export default openDialogNewCategorySlice