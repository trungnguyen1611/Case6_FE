import {Dialog} from "@mui/material";
import Transition from "../Transition";
import {useDispatch, useSelector} from "react-redux";
import {closeDialogBalance} from "../../Features/DiaLogSlice/openDialogBalanceSlice";
import {openDialogSelectWallet} from "../../Features/DiaLogSlice/openDialogWallet";
import React, {useEffect, useState} from "react";
import DialogSelectWallet from "./DialogSelectWallet";
import axios from "../../axios/index";
import swal from "sweetalert";


export default function DialogBalance(props) {
    const [walletObj, setWalletObj] = useState(props.walletObj || {});
    const [initialInput, setInitialInput] = useState(props.walletObj.initial);
    const [isFull, setIsFull] = useState(false)
    const dispatch = useDispatch();
    const userId = JSON.parse(localStorage.getItem('alohaUser'))._id

    const handleCloseDialogBalance = () => {
        dispatch(closeDialogBalance(false))
    }

    const handleWallet = (walletObj) => {
        setWalletObj(walletObj)

    }

    const data = {
        walletId: walletObj._id,
        initial: initialInput
    }

    const handleUpdateBalance = (e) => {

        swal({
            icon: "success",
            button: null,
        }).then(() => {
            e.preventDefault()
            axios.post('wallet/updateBalance', data).then(r => {
                handleCloseDialogBalance()
            })
        });
        setTimeout(() => {
            swal.close()
        }, 1000)
        if (data.initial > walletObj.initial) {
            const dataTransaction = {
                wallet: walletObj._id,
                category: {
                    _id: '6316a5497058758749d1ec28',
                    wallet: walletObj._id,
                    icon: 'https://static.moneylover.me/img/icon/ic_category_other_income.png',
                    name: 'Other Income',
                    type: 'INCOME'
                },
                amount: Number(data.initial) - Number(walletObj.initial),
                date: new Date(new Date().getFullYear()
                    + ((new Date().getMonth() < 9) ? `-0${new Date().getMonth() + 1}` : `-${new Date().getMonth() + 1}`)
                    + "-" + new Date().getDate()),
                user: userId
            }
            e.preventDefault()
            axios.post('transaction/add', dataTransaction).then(r => {
                console.log(r)
            })
        } else {
            const dataTransaction = {
                wallet: walletObj._id,
                category: {
                    _id: '6316a5487058758749d1ec1b',
                    wallet: walletObj._id,
                    icon: 'https://static.moneylover.me/img/icon/icon_138.png',
                    name: 'Other Utility Bills',
                    type: 'EXPENSE'
                },
                amount: Number(walletObj.initial) - Number(data.initial),
                date: new Date(new Date().getFullYear()
                    + ((new Date().getMonth() < 9) ? `-0${new Date().getMonth() + 1}` : `-${new Date().getMonth() + 1}`)
                    + "-" + new Date().getDate()),
                user: userId
            }
            e.preventDefault()
            axios.post('transaction/add', dataTransaction).then(r => {
                console.log(r)
            })
        }
    }

    const dialogWalletState = useSelector(state => state.dialogWallet.value);

    useEffect(() => {
        if (data.initial === walletObj.initial) {
            setIsFull(true)
        } else if (!data.initial) {
            setIsFull(true)
        } else {
            setIsFull(false)
        }
    })

    const handleChangeInitial = (e) => {

    }

    return (

        <Dialog
            open={true}
            TransitionComponent={Transition}
            aria-describedby="alert-dialog-slide-description"
            onClose={handleCloseDialogBalance}
        >

            <div
                className="   flex overflow-x-hidden overflow-y-auto modal-dialog  fixed inset-0 z-50 outline-none focus:outline-none"
                tabIndex="-1" aria-hidden="true"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-[5px] shadow-lg relative h-[400px] w-[496px] flex flex-col  bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start p-5 border-b-2 border-solid border-slate-200 rounded-t">
                            <span className="pl-[15px] text-[20px] font-sans">
                                Adjust Balance
                            </span>
                        </div>
                        {/*body*/}
                        <div className="modal-body relative  flex-auto p-4 pb-0">
                            <div className="relative w-full  pl-2 pr-2">
                                <button id="button" onClick={() => dispatch(openDialogSelectWallet())}
                                        className="w-full col-span-2 flex relative  border border-gray-300 p-2 h-[60px]  rounded-[10px] hover:border-black">
                                    <div className="">
                                        <img data-v-6bc9d4d3=""
                                             src={walletObj?.icon?.url}
                                             alt=""
                                             name="2" className="transaction-icon w-[24px] h-[24px] my-3 mx-1"/>
                                    </div>
                                    <div className={"flex"}>
                                        <span className="my-3 mx-2 absolute ">{walletObj?.name}</span>
                                        <label htmlFor="button"
                                               className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                        >Wallet
                                        </label>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className=" ml-[370px] mt-[10px] w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                                        </svg>
                                    </div>
                                </button>
                                <div className={"relative mt-5 w-full "}>
                                    <input type={"number"} id="floating_filled"
                                                  name={"name"}
                                                  onChange={(e)=>{
                                                      setInitialInput(Number(e.target.value))
                                                  }}
                                                  defaultValue={walletObj?.initial}
                                                  className="block  rounded-[10px] p-2 pl-4 pt-7 w-full h-[64px] text-[20px] text-gray-900  border border-gray-300  appearance-none dark:text-black  focus:outline-none focus:ring-0 hover:border-black peer"
                                                  placeholder="$ 0"/>
                                    <label htmlFor="floating_filled"
                                           className="absolute text-[16px] p-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   ">
                                        Enter current balance of this wallet
                                    </label>
                                    <div className={""}>
                                        <div className={"py-4 pb-0 px-1 flex h-[74px]"}>
                                            <input type="checkbox"
                                                   id={"checkbox3"}
                                                   className={"h-[18px] bg-[black] text-white w-[18px] border-[20px] border-[#757575]"}/>
                                            <label htmlFor="checkbox3" className={"px-6"}>
                                                <div>Exclude from report</div>
                                                <div className={"text-[#757575] pt-2 text-[12px]"}>Ignore this wallet
                                                    and its balance in the "Total" mode.
                                                </div>

                                            </label>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                        {/*footer*/}
                        <div
                            className="flex items-center m-5 mt-0 justify-end  border-slate-200 rounded-b">
                            <button
                                className="text-[#F15A59] rounded-[5px] hover:bg-[#FEECEB] w-[96px] h-[36px] background-transparent rounded-[5px] font-bold uppercase mr-4 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleCloseDialogBalance}
                            >
                                CLOSE
                            </button>
                            {isFull ? <button
                                className="bg-[#E0E0E0] text-[#ACACAC] text-white active:bg-emerald-600 w-[96px] h-[36px] font-bold uppercase text-sm mr-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleUpdateBalance}
                                id="btn-create"
                                disabled={true}
                            >
                                DONE
                            </button> : <button

                                className="bg-[#2EB74B] text-white active:bg-emerald-600 w-[96px] h-[36px] font-bold uppercase text-sm mr-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleUpdateBalance}
                                id="btn-create"
                            >
                                DONE
                            </button>}

                        </div>
                    </div>
                </div>
                {dialogWalletState && <DialogSelectWallet onHandleWallet={handleWallet}/>}
            </div>
        </Dialog>
    )
}