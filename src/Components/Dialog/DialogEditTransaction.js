import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from '../../axios/index';
import {openDialogCategory, closeDialogCategory} from "../../Features/DialogCategorySlice/openDialogCategorySlice";
import {selectCategory} from "../../Features/Transaction/categorySlice";
import {openDialogSelectWallet} from "../../Features/DiaLogSlice/openDialogWallet";
import {selectWallet} from "../../Features/Transaction/walletSlice";
import {closeDialogEditTransaction} from "../../Features/DiaLogSlice/openEditTransactionSlice";
import {selectDetailTransaction} from "../../Features/Transaction/detailTransactionSlice";
import DialogTransactionCategory from "./DialogTransactionCategory";
import DialogSelectWallet from "./DialogSelectWallet";
import swal from "sweetalert";
import Transition from "../Transition";
import {Dialog} from "@mui/material";


const DialogEditTransaction = () => {
    let user = JSON.parse(localStorage.getItem('alohaUser'))
    const dispatch = useDispatch();
    const detailTransactionState = useSelector(state => state.selectDetailTransaction.value)
    const selectCategoryState = useSelector(state => state.selectCategory.value)
    const selectWalletState = useSelector(state => state.selectWallet.value);
    const [amount, setAmount] = useState(detailTransactionState.amount);
    const [note, setNote] = useState(detailTransactionState.note);
    const [date, setDate] = useState(detailTransactionState.date.split('T')[0]);
    const dialogCategoryState = useSelector(state => state.DialogCategory.value)
    const dialogWalletState = useSelector(state => state.dialogWallet.value);


    const handleChangeAmount = (e) => {
        setAmount(e.target.value)
    }
    const handleChangeNote = (e) => {
        setNote(e.target.value)
    }
    const handleChangeDate = (e) => {
        setDate(e.target.value)
    }
    const handleSaveEditTransaction = () => {
        const transaction = {
            id: detailTransactionState?._id,
            wallet: selectWalletState?.name ? selectWalletState : detailTransactionState?.wallet,
            amount: amount * 1,
            category: selectCategoryState?.name ? selectCategoryState : detailTransactionState?.category,
            date: new Date(date),
            note: note,
            user: user
        }
        swal({
            icon: "success",
            button: null,
        })
            .then(() => {
                axios.post('transaction/edit', transaction)
                    .then((res) => {
                        dispatch(selectDetailTransaction(res.data.data))
                        handleCloseDialogEditTransaction()
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
            })
        setTimeout(() => {
            swal.close()
        }, 1000)
    }

    const handleCloseDialogEditTransaction = () => {
        dispatch(selectCategory({}))
        dispatch(selectWallet({}))
        dispatch(closeDialogEditTransaction())
    }

    const dialogEditTransactionState=useSelector(state=>state.dialogEditTransaction.value)

    return (
        <Dialog
            open={dialogEditTransactionState}
            TransitionComponent={Transition}
            onClose={handleCloseDialogEditTransaction}
            aria-describedby="alert-dialog-slide-description"
        >
            <div className="">
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto w-3/5">
                        {/*content*/}
                        <div
                            className="border-0 rounded-[5px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div
                                className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h4 className="text-2xl font-semibold">
                                    Edit transaction
                                </h4>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={handleCloseDialogEditTransaction}
                                >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="grid grid-cols-3 gap-1 py-6 px-6">

                                <div className="relative w-full pl-2 pr-2">
                                    <button id="button" onClick={() => dispatch(openDialogSelectWallet())}
                                            disabled={true}
                                            className="w-full  col-span-2 flex relative  border border-gray-300 p-2 h-[60px] hover:border-black rounded-[10px] ">
                                        <div className="">

                                            <img data-v-6bc9d4d3=""
                                                 src={selectWalletState?.icon ? selectWalletState?.icon?.url : detailTransactionState?.wallet?.icon?.url}
                                                 alt=""
                                                 name="2" className="transaction-icon w-[24px] my-3 mx-4"/>
                                        </div>
                                        <span
                                            className="my-3 mx-4 absolute pl-12"
                                        >{selectWalletState?.name ? selectWalletState?.name : detailTransactionState?.wallet?.name}
                                    </span>
                                        <label htmlFor="button"
                                               className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                        >Select Wallet
                                        </label>
                                    </button>

                                </div>

                                <div className="relative w-full pl-2 pr-2">
                                    <button id="button" onClick={() => dispatch(openDialogCategory())}
                                            className=" w-full  col-span-2 flex border border-gray-300 p-2 h-[60px]  rounded-[10px] hover:border-black">
                                        <img data-v-6bc9d4d3=""
                                             src={selectCategoryState?.icon
                                                 ? selectCategoryState?.icon
                                                 : detailTransactionState?.category?.icon}
                                             alt=""
                                             name="2" className="transaction-icon w-[24px] my-3 mx-4"/>
                                        <span
                                            className="my-3 text-s pl-14 absolute"
                                        >{selectCategoryState?.name
                                            ? selectCategoryState?.name
                                            : detailTransactionState?.category?.name}
                                    </span>
                                        <label htmlFor="button"
                                               className="absolute pl-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                        >Select Category
                                        </label>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="h-6 w-6 mx-[48px] my-3 text-[#757575] hover:text-black "
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">

                                        </svg>
                                    </button>
                                </div>

                                <div className="relative w-full pl-2 pr-2">
                                    <input type="number" id="floating_filled" onChange={handleChangeAmount}
                                           value={amount}
                                           className="block rounded-[10px] p-2 pl-5 pt-5 w-full h-full text-sm text-gray-900   border border-gray-300  appearance-none dark:text-black  focus:outline-none focus:ring-0 hover:border-black peer"
                                           placeholder=" "/>
                                    <label htmlFor="floating_filled"
                                           className="absolute pl-4 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >Amount
                                    </label>
                                </div>

                            </div>
                            <div className="grid grid-cols-3 gap-1 p-3 pt-0 px-6 pb-6">
                                <div className="w-full pl-2 pr-2">
                                    <input type="date" value={date ? date : detailTransactionState?.date?.split("T")[0]}
                                           onChange={handleChangeDate}
                                           className="block p-4 pl-4 h-full w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                           placeholder=""/>
                                </div>
                                <div className="relative w-full col-span-2 pl-2 pr-2">
                                    <input type="text" id="floating_filled" onChange={handleChangeNote} value={note}
                                           className="block rounded-[10px] p-2 pl-6 pt-5 w-full h-full text-sm text-gray-900   border border-gray-300  appearance-none dark:text-black  focus:outline-none focus:ring-0 hover:border-black peer"
                                           placeholder=" "/>
                                    <label htmlFor="floating_filled"
                                           className="absolute pl-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >Note
                                    </label>
                                </div>
                            </div>

                            {dialogCategoryState && <DialogTransactionCategory/>}
                            {dialogWalletState && <DialogSelectWallet/>}

                            {/*footer*/}
                            <div
                                className="flex items-center justify-end p-6  border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-[#F15A59] rounded-[5px] hover:bg-[#FEECEB] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleCloseDialogEditTransaction}
                                >
                                    CLOSE
                                </button>
                                <button
                                    className="bg-[#2EB74B] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleSaveEditTransaction}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DialogEditTransaction;