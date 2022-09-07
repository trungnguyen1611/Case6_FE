import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    value: {
        idWallet: '',
        iconUrl: 'https://static.moneylover.me/img/icon/icon.png'
    },
}

export const selectDataWalletOnCategorySlice = createSlice({
    name: 'selectDataWalletOnCategory',
    initialState,
    reducers: {
        selectDataWallet: (state, action) => {
            state.value = action.payload
        },
        setIdWallet: (state, action) => {
            state.value.idWallet = action.payload
        },
        // setUpdateDataNameCategory: (state, action) => {
        //     state.value.name = action.payload
        // },
    },
})


export const {selectDataWallet, setIdWallet} = selectDataWalletOnCategorySlice.actions

export default selectDataWalletOnCategorySlice