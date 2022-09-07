import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: '',
}

export const selectIconSlice = createSlice({
    name: 'selectIcon',
    initialState,
    reducers: {
        setSelectIcon: (state, action) => {
            state.value = action.payload
        },
        // closeDialogIconCategory: (state, action) => {
        //     state.value = action.payload
        // }
    },
})


export const {setSelectIcon} = selectIconSlice.actions

export default selectIconSlice