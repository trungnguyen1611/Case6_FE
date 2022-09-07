import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

// const userId= JSON.parse(localStorage.getItem('alohaUser'))._id || ''

// const fetchAllTransactions = createAsyncThunk(
//     'transactions/fetchByIdStatus',
//     async (params, thunkAPI) => {
//         const response = await axios.post('',userId)
//         return response.data
//     }
// )


const initialState = {
    wallet: {
        currency: {},
        icon: {_id: '', name: '', url: 'https://static.moneylover.me/img/icon/ic_category_all.png'},
        initial: 0,
        name: "Wallet"
    },
    category: {
        name: 'Category',
        icon: "https://static.moneylover.me/img/icon/ic_category_all.png",
        _id: '',
        type: ''
    },
    date: '',
    note: ''
};

const SearchInputSlice = createSlice({
    name: 'SearchInput',
    initialState: {
        SearchInput: initialState,
        AllTransactions: {
            loading: false,
            data: {}
        },
        searchResult: []

    },
    reducers: {
        setCategoryInSearchPage: (state, action) => {
            state.SearchInput.category = action.payload
        },
        setWalletInSearchPage: (state, action) => {
            state.SearchInput.wallet = action.payload;
        },
        setSearchInputForNote: (state, action) => {
            state.SearchInput = action.payload
        },
        setSearchInputForDate: (state, action) => {
            state.SearchInput.date = action.payload.startDate + "->" + action.payload.endDate
        },
        updateSearchResult: (state, action) => {
            state.searchResult = action.payload
        }
    },
    // extraReducers:{
    //     [fetchAllTransactions.pending]: (state)=>{
    //         state.AllTransactions.loading=true
    //     },
    //     [fetchAllTransactions.rejected]: (state, action)=>{
    //         state.AllTransactions.loading=false
    //     },
    //     [fetchAllTransactions.fulfilled]: (state,action)=>{
    //         state.AllTransactions.loading=false
    //         state.AllTransactions.data=action.payload
    //     },
    // }
})

export const {
    setCategoryInSearchPage,
    setSearchInputForNote,
    setWalletInSearchPage,
    setSearchInputForDate,
    updateSearchResult
} = SearchInputSlice.actions

export default SearchInputSlice.reducer
