import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: {},
}

export const selectCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        selectCategory:(state,action)=>{
            state.value = action.payload
        }
    },
})


export const {selectCategory} = selectCategorySlice.actions

export default selectCategorySlice