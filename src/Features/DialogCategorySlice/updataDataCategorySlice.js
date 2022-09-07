import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: {},
}

export const updateDataCategorySlice = createSlice({
    name: 'updateDataCategory',
    initialState,
    reducers: {
        setUpdateDataCategory: (state, action) => {
            state.value = action.payload
        },
        setUpdateDataNameCategory: (state, action) => {
            state.value.name = action.payload
        },
        setUpdateDataTypeCategory: (state, action) => {
            state.value.type = action.payload
        },
        setUpdateDataIconCategory: (state, action) => {
            state.value.icon = action.payload
        },

        // closeDialogIconCategory: (state, action) => {
        //     state.value = action.payload
        // }
    },
})


export const {setUpdateDataCategory,setUpdateDataNameCategory, setUpdateDataTypeCategory,setUpdateDataIconCategory} = updateDataCategorySlice.actions

export default updateDataCategorySlice