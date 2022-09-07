import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeDialogCategory} from "../../Features/DialogCategorySlice/openDialogCategorySlice";
import {setCategoryInSearchPage} from "../../Features/SearchInput/SearchInputSlice";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import axios from '../../axios'
import {selectCategory} from "../../Features/Transaction/categorySlice";
import Transition from "../Transition";
import {Dialog} from "@mui/material";
import LoadingScreen from "react-loading-screen";


const DialogTransactionCategory = (props) => {
    const dispatch = useDispatch();
    const selectCategoryState = useSelector(state => state.selectCategory)
    const [listCategory, setListCategory] = useState([]);
    const [listExpense, setListExpense] = useState([]);
    const [listIncome, setListIncome] = useState([]);
    const [typeCategory, setTypeCategory] = useState(true);
    const [searchIncome, setSearchIncome] = useState();
    const [searchExpense, setSearchExpense] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const currentWalletState = useSelector(state => state.currentWallet.value)

    const handleCloseCategory = () => {
        dispatch(closeDialogCategory())
    }

    useEffect(() => {
        setIsLoading(true)
        axios.get('transaction/category')
            .then(res => {
                setListCategory(res.data.data)
            })
        if (currentWalletState._id) {
            axios.post('category/expense', {wallet: currentWalletState._id})
                .then(res => {
                    setListExpense(res.data.data)
                    setIsLoading(false)

                })
            axios.post('category/income', {wallet: currentWalletState._id})
                .then(res => {
                    setListIncome(res.data.data)
                    setIsLoading(false)

                })
        }
        else{
            axios.get('transaction/category/expense')
                .then(res=>{
                    setListExpense(res.data.data)
                    setIsLoading(false)

                })
            axios.get('transaction/category/income')
                .then(res=>{
                    setListIncome(res.data.data)
                    setIsLoading(false)

                })
        }
    }, [currentWalletState])


    const handleTypeCategory = () => {
        setTypeCategory(!typeCategory)
    }

    const handleChangeSearch = (e) => {
        console.log(e.target.value)
        if (typeCategory) {
            let result = listExpense.filter((value, index) => {
                return value.name.toLowerCase().includes(e.target.value.toLowerCase())
            })
            setSearchExpense(result)
        } else {
            let result = listIncome.filter((value, index) => {
                return value.name.toLowerCase().includes(e.target.value.toLowerCase())
            })
            setSearchIncome(result)
        }
    }

    return (
        <Dialog
            open={selectCategoryState}
            TransitionComponent={Transition}
            onClose={handleCloseCategory}
            aria-describedby="alert-dialog-slide-description"
        >
            <div className="bg-white">
                <div
                    className="justify-center  items-center flex overflow-x-hidden modal-dialog modal-dialog-scrollable fixed inset-0 z-50 outline-none focus:outline-none"
                    tabIndex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div
                            className="border-0 rounded-[5px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div
                                className="flex items-start p-5 border-0 rounded-t">
                                <button className="pt-1 text-[#757575]" onClick={handleCloseCategory}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <span className="pl-[15px] text-[20px] font-sans">
                                Select Category
                            </span>
                            </div>
                            <div className="grid grid-cols-5 flex flex-col justify-center items-center border-0">
                                <div></div>
                                <div className="relative bg-gray-200 rounded-full col-span-3">
                                    <div className="absolute left-0 my-2.5 pl-5">
                                        <SearchIcon/>
                                    </div>
                                    <div>
                                        <input
                                            className="rounded-t pl-14 border-none col-span-3  appearance-none block w-full bg-transparent text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none "
                                            id="grid-last-name" type="text" placeholder="Search"
                                            onChange={handleChangeSearch}/>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="grid grid-cols-4 flex flex-col justify-center content-center border-gray-300 pt-2">
                                <div></div>
                                {typeCategory ? <Button sx={{
                                        borderBottom: 2,
                                        borderRadius: 0,
                                        borderColor: '#2EB74B',
                                        color: '#2EB74B'
                                    }}>EXPENSE</Button> :
                                    <Button sx={{color: 'gray'}} onClick={handleTypeCategory}>EXPENSE</Button>}
                                {!typeCategory ? <Button sx={{
                                        borderBottom: 2,
                                        borderRadius: 0,
                                        borderColor: '#2EB74B',
                                        color: '#2EB74B'
                                    }}>INCOME</Button> :
                                    <Button sx={{color: 'gray'}} onClick={handleTypeCategory}>INCOME</Button>}
                                <div></div>
                            </div>
                            {/*body*/}
                            {isLoading &&
                                <LoadingScreen
                                    loading={isLoading}
                                    bgColor="rgba(255,255,255,0.8)"
                                    spinnerColor="#2EB74B"
                                    textColor="#676767"
                                    logoSrc=""
                                    text=""
                                />
                            }
                            <div className="modal-body relative w-[500px] h-[490px] border flex-auto">
                                <ul className='m-auto'>
                                    {typeCategory
                                        ? (searchExpense ? searchExpense.map((value, index) => {
                                                return (
                                                    <div key={index}
                                                         className="relative hover:bg-[#E6EFE7] pl-8 pr-8  hover:cursor-pointer">
                                                        <li className='m-auto grid grid-cols-3 border-b p-2' onClick={() => {
                                                            dispatch(selectCategory(value))
                                                            dispatch(setCategoryInSearchPage(value))
                                                            dispatch(closeDialogCategory())

                                                        }}>
                                                            <img data-v-61e80534=""
                                                                 src={value.icon} alt=""
                                                                 name="2" className="category-icon w-[45px] ml-6 pl-2"/>
                                                            <div className="col-span-2 my-auto">
                                                                {value.name}
                                                            </div>
                                                        </li>
                                                    </div>
                                                )
                                            })
                                            : listExpense.map((value, index) => {
                                                return (
                                                    <div key={index}
                                                         className="relative pl-8 pr-8 hover:bg-[#E6EFE7] hover:cursor-pointer">
                                                        <li className='m-auto grid grid-cols-3 p-2 border-b' onClick={() => {
                                                            dispatch(selectCategory(value))
                                                            dispatch(setCategoryInSearchPage(value))
                                                            dispatch(closeDialogCategory())
                                                        }}>
                                                            <img data-v-61e80534=""
                                                                 src={value.icon} alt=""
                                                                 name="2" className="category-icon w-[45px] ml-6 pl-2"/>
                                                            <div className="col-span-2 my-auto">
                                                                {value.name}
                                                            </div>
                                                        </li>
                                                    </div>
                                                )
                                            }))
                                        : (searchIncome
                                                ? searchIncome.map((value, index) => {
                                                    return (
                                                        <div key={index}
                                                             className="relative pl-8 pr-8 hover:bg-[#E6EFE7] hover:cursor-pointer">
                                                            <li className='m-auto grid grid-cols-3 border-b p-2' onClick={() => {
                                                                dispatch(selectCategory(value))
                                                                dispatch(setCategoryInSearchPage(value))
                                                                dispatch(closeDialogCategory())
                                                            }}>
                                                                <img data-v-61e80534=""
                                                                     src={value ? value.icon : 'https://static.moneylover.me/img/icon/icon.png'}
                                                                     alt=""
                                                                     name="2"
                                                                     className="category-icon w-[45px] ml-6 pl-2"/>
                                                                <div className="col-span-2 my-auto">
                                                                    {value.name}
                                                                </div>
                                                            </li>
                                                        </div>
                                                    )
                                                })
                                                : listIncome.map((value, index) => {
                                                    return (
                                                        <div key={index}
                                                             className="relative pl-8 pr-8 hover:bg-[#E6EFE7] hover:cursor-pointer">
                                                            <li className='m-auto grid grid-cols-3 border-b p-2' onClick={() => {
                                                                dispatch(selectCategory(value))
                                                                dispatch(setCategoryInSearchPage(value))
                                                                dispatch(closeDialogCategory())
                                                            }}>
                                                                <img data-v-61e80534=""
                                                                     src={value ? value.icon : 'https://static.moneylover.me/img/icon/icon.png'}
                                                                     alt=""
                                                                     name="2"
                                                                     className="category-icon w-[45px] ml-6 pl-2"/>
                                                                <div className="col-span-2 my-auto">
                                                                    {value.name}
                                                                </div>
                                                            </li>
                                                        </div>
                                                    )
                                                })
                                        )
                                    }
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DialogTransactionCategory;