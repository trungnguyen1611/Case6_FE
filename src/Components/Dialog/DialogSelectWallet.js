import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {closeDialogSelectWallet} from "../../Features/DiaLogSlice/openDialogWallet";
import axios from '../../axios/index'
import {selectWallet} from '../../Features/Transaction/walletSlice'
import {setWalletInSearchPage} from '../../Features/SearchInput/SearchInputSlice'
import Transition from "../Transition";
import {Dialog} from "@mui/material";

const DialogSelectWallet = (props) => {
    const dispatch = useDispatch();

    const [listWallet, setListWallet] = useState([]);
    const user = JSON.parse(localStorage.getItem('alohaUser'));


    useEffect(() => {
        axios.post('wallet/render', {userId: user._id})
            .then(res => {
                setListWallet(res.data.data)
            })
    }, [])

    const dialogWalletState = useSelector(state => state.dialogWallet.value);

    const handleCloseWallet = () => {
        closeDialogSelectWallet(false)
    }

    return (
        <Dialog
            open={dialogWalletState}
            TransitionComponent={Transition}
            onClose={handleCloseWallet}
            aria-describedby="alert-dialog-slide-description"
        >
            <div className="bg-white">
                <div
                    className="justify-center items-center flex overflow-x-hidden modal-dialog modal-dialog-scrollable fixed inset-0 z-[100] outline-none focus:outline-none"
                    tabIndex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div
                            className="border-0 rounded-[5px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div
                                className="flex items-start p-5 border-0 rounded-t">
                                <button className="pt-1 text-[#757575]"
                                        onClick={() => dispatch(closeDialogSelectWallet())}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <span className="pl-[15px] text-[20px] font-sans">
                                Select Wallet
                            </span>
                            </div>

                            <div className="modal-body relative w-[500px] h-[490px] border-t flex-auto">
                                <ul className="m-auto">
                                    {listWallet.map((value, index) => {
                                        return (
                                            <div key={index}
                                                 className="relative pl-8 pr-8  hover:bg-[#E6EFE7] hover:cursor-pointer">
                                                <li className='m-auto grid grid-cols-3 p-2 border-b' onClick={() => {
                                                    dispatch(selectWallet(value))
                                                    dispatch(setWalletInSearchPage(value))
                                                    dispatch(closeDialogSelectWallet())
                                                    props.onHandleWallet(value)
                                                }}>
                                                    <img data-v-61e80534=""
                                                         src={value.icon.url} alt=""
                                                         name="2" className="category-icon w-[45px] ml-6 pl-2"/>
                                                    <div className="col-span-2 my-auto">
                                                        {value.name}
                                                    </div>
                                                </li>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>
                            {/*body*/}
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DialogSelectWallet;