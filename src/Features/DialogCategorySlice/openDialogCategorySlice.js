import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        openDialogCategory: (state, action) => {
            state.value = true
        },
        closeDialogCategory: (state, action) => {
            state.value = false
        }
    },
})


export const {openDialogCategory, closeDialogCategory} = categorySlice.actions

export default categorySlice