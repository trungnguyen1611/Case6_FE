import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const dataCategorySlice = createSlice({
    name: 'dataCategory',
    initialState,
    reducers: {
        setDataCategory: (state, action) => {
            state.value = action.payload
        }
    },
})


export const {setDataCategory} = dataCategorySlice.actions

export default dataCategorySlice