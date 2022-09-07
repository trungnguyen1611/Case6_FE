import {useDispatch, useSelector} from "react-redux";
import {closeDialogDetail} from "../../Features/DiaLogSlice/openDialogDetailSlice";
import {useEffect, useRef, useState} from "react";
import axios from "../../axios/index";
import {openDialogEditWallet} from "../../Features/DiaLogSlice/openDialogEditWalletSlice";
import DialogEditWallet from "../Dialog/DialogEditWallet"
import {Slide} from "@mui/material";
import swal from "sweetalert";
import DialogBalance from "./DialogBalance";
import {openDialogBalance} from "../../Features/DiaLogSlice/openDialogBalanceSlice";
import {selectCurrentWallet} from "../../Features/Transaction/currentWalletSlice";

export default function DialogDetailWallet({walletId}) {
    const dispatch = useDispatch();
    const [walletObj, setWalletObj] = useState({})
    const [userObj, setUserObj] = useState(JSON.parse(localStorage.getItem('alohaUser')))



    const handleCloseDialogDetailWallet = () => {
        dispatch(closeDialogDetail(false))
    }

    const handleOpenDialogEditWallet = () => {
        dispatch(openDialogEditWallet(true))
    }

    const editState = useSelector((state) =>
        state.DialogEditWallet.value
    )

    useEffect(() => {
        axios.post('wallet/detail', {walletId}).then(r => {
            setWalletObj(r.data.data)
            dispatch(selectCurrentWallet(r.data.data))
        })
    }, [walletObj?._id,walletObj?.currency,walletObj?.icon])

    const handleDeleteWallet = () => {
        swal({
            title: `Do you want to delete wallet ${walletObj.name}?`,
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    }).then(() => {
                        axios.post('wallet/delete', {walletId}).then(r => {
                            handleCloseDialogDetailWallet()
                        })
                    });
                } else {
                    swal("Your record is safe!");
                }
            });

    }

    const containerRef = useRef(null);

    const detailState = useSelector((state) =>
        state.DialogDetail.value
    )

    const balanceState = useSelector((state) =>
        state.DialogBalance.value
    )

    const handleOpenDialogBalance = () => {
        dispatch(openDialogBalance(true))
    }

    return (
        <Slide direction="left" in={detailState} container={containerRef.current}>

            <div className={" w-1/2 drop-shadow-2xl"}>
                <div className=" border mt-[100px] w-[90%] rounded-[5px] bg-white  text-xs text-gray-900 border ">
                    <div
                        className={"text-left  flex justify-between py-4 px-6 py-2 border-b border-gray-200 w-full h-[63px]"}>
                        <div className={"flex mb-4"}>
                            <button onClick={handleCloseDialogDetailWallet}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className=" w-5 h-5 text-[#ccc] hover:text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15"/>
                                </svg>
                            </button>
                            <span className={"text-lg px-4 text-black w-full "}>Wallet details</span>
                        </div>
                        <div className={"flex text-center text-[14px]"}>
                            <button onClick={handleOpenDialogEditWallet}
                                    className={"text-[#2EB74B] w-[80px] rounded-[5px] h-[36px] mx-[20px] hover:bg-[#E9F6EB]"}>EDIT
                            </button>
                            <button onClick={handleDeleteWallet}
                                    className={"text-[#F15A59] w-[80px] h-[36px] rounded-[5px] hover:bg-[#FEECEB]"}>DELETE
                            </button>
                        </div>
                    </div>
                    <div className={"w-full h-[102px] border-b-[1px]"}>
                        <div className={"p-[23px] pl-[77p   x] flex "}>
                            <img className={"w-[56px] h-[56px] rounded-full"}
                                 src={walletObj?.icon?.url} alt=""/>
                            <div className={"mx-[34px] font-sans"}>
                                <h2 className={"text-[24px] w-full h-[32px] "}>{walletObj?.name}</h2>
                                <p className={"text-[14px]  font-normal"}>{walletObj?.currency?.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full h-[113px]  border-b-[1px]"}>
                        <div className={"ml-[77px]"}>
                            <div className={" w-full pt-[9px]  text-left pl-[4px] pb-[11px]"}>
                                <span className={"font-bold text-[#757575]"}>Users</span>
                            </div>
                            <div className={"flex py-[16px] pl-[4px]"}>
                                <img className={"w-[40px] h-[40px] object-cover rounded-full"}
                                     src={userObj.avatarUrl} alt=""/>
                                <div className={"ml-2"}>
                                    <span className={"font-bold"}>{userObj.username}</span>
                                    {userObj.username && <span
                                        className={"mx-3 w-[34px] p-1 h-[10px] bg-[#FEB74D] text-white rounded-[5px]"}>Owner</span>}


                                    <h3 className={"text-[#757575] py-1"}>{userObj.email}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={" pl-[45px] "}>
                        <div>
                            <div className={"py-[15px] px-[44px] h-[74px] flex"}>
                                <input id="checkbox1" type="checkbox" value=""
                                       className="h-[18px] bg-[black] text-white w-[18px]"/>
                                <label htmlFor="checkbox1" className={"px-6 "}>
                                    <div>Excluded from Total</div>
                                    <div className={"text-[#757575]"}>Ignore this wallet and its balance in the "Total"
                                        mode.
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className={"py-[15px] px-[44px] flex h-[74px]"}>
                                <input type="checkbox"
                                       id={"checkbox2"}
                                       className={"h-[18px] bg-[black] text-white w-[18px] border-[20px] border-[#757575]"}/>
                                <label htmlFor="checkbox2" className={"px-6"}>
                                    <div>Archived</div>
                                    <div className={"text-[#757575]"}>Freeze this wallet and stop generating bills &
                                        recurring transactions.
                                    </div>

                                </label>
                            </div>

                        </div>
                    </div>
                    <div onClick={handleOpenDialogBalance} className={"h-[50px] text-center border-t hover:bg-[#E9F6EB]  cursor-pointer"}>
                        <button className={"py-4 text-[#2EB74B]"} >
                            ADJUST BALANCE
                        </button>

                    </div>

                </div>
                {editState && <DialogEditWallet walletObj={walletObj}/>}
                {balanceState && <DialogBalance walletObj={walletObj}/>}
            </div>
        </Slide>


    )
}