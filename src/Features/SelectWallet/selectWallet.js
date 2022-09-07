import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    iconObj: {
        url: 'https://static.moneylover.me/img/icon/icon_not_selected.png',
        _id: ''
    },
    currencyObj: {
        code:'',
        name: '',
        url: 'https://static.moneylover.me/img/icon/icon_not_selected.png',
        _id: '',
    },
    nameCurrency: '',
    initialBalance: 0
};
const WalletSlice = createSlice({
    name: 'SelectWalletIcon',
    initialState: initialState,
    reducers: {
        setIconObj: (state, action) => {
            state.iconObj = action.payload
        },
        setCurrencyObj: (state, action) => {
            state.currencyObj = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setInitialBalance: (state, action) => {
            state.initialBalance = action.payload
        }
    }
})

export const {setIconObj,setCurrencyObj,setName,setInitialBalance} = WalletSlice.actions

export default WalletSlice.reducer
