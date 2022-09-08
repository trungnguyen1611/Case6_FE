import DialogWallet from "../../Components/Dialog/DialogWallet";
import {useEffect, useState} from "react";
import axios from "../../axios/index";
import {useDispatch, useSelector} from "react-redux";
import {openDialogWallet} from "../../Features/DiaLogSlice/openDialogMyWalletSlice";
import {useNavigate} from "react-router-dom";
import {openDialogDetail} from "../../Features/DiaLogSlice/openDialogDetailSlice";
import DialogDetailWallet from "../../Components/Dialog/DialogDetailWallet";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants"
import {afterLoadingAPIScreen, isLoadingAPIScreen} from "../../Features/isLoadingScreen/isLoadingScreen";


export default function MyWallet() {

    const [wallets, setWallets] = useState([])
    const [walletId, setWalletId] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('alohaUser'));

    const walletState = useSelector((state) =>
        state.DialogWallet.value
    )

    const detailState = useSelector((state) =>
        state.DialogDetail.value
    )


    useEffect(() => {
        dispatch(openDialogDetail(false))
    }, [])

    useEffect(() => {
        const qs = require('qs');
        const data = qs.stringify({
            'userId': currentUser?._id
        });
        const config = {
            method: 'post',
            url: 'https://aloha-back-end.herokuapp.com/wallet/render',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        dispatch(isLoadingAPIScreen())
        axios(config)
            .then(function (response) {
                setWallets(response.data.data);
            })
            .catch(function (error) {
                console.log(error.message);
            });
        dispatch(afterLoadingAPIScreen())
    }, [wallets])

    const handleOpenDialogWallet = () => {
        dispatch(openDialogWallet(true))
    }

    const handleOpenDialogDetail = (e, wallet) => {
        dispatch(openDialogDetail(true))
        setWalletId(wallet?._id)
    }

    function currencyFormat(num) {
        return num?.toFixed(0)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (

        <motion.div className="relative bg-[#E4E4E4] h-[100vh]"
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    variants={Variants.variant1}
        >
            <div className="navbar">
                <div>
                    <nav
                        className="bg-white  px-2 sm:px-4 py-2.5 bg-white fixed w-full h-16 z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-200">
                        <div className="container flex flex-wrap justify-between items-center ">
                            <div className="flex p-2 ">
                                <button onClick={() => {
                                    navigate('/Transactions')
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-6 w-6 text-[#ccc] text-xl  hover:text-black ml-16" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
                                    </svg>
                                </button>
                                <h2 className="text-[#000000DE] ml-4 font-sans text-xl">My Wallets</h2>
                            </div>
                            <div className=" justify-between items-center w-full md:flex md:w-auto md:order-1"
                                 id="navbar-sticky">
                                {wallets.length < 3 ? <button className="flex absolute right-8" onClick={handleOpenDialogWallet}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    Create Wallet
                                </button> : null}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className={"flex justify-center gap-6"}>
                <div
                    className={detailState ? "flex justify-center w-1/2 top-0 left-20 transition-transform " : "flex justify-center w-1/2"}
                    id={"wallet"}>
                    <div className=" border mt-[100px] w-[80%]  text-sm text-gray-900 drop-shadow-2xl">
                        <div
                            className={"text-left text-[#707070] px-6 py-2 border-b border-r border-gray-200 w-full h-[40px] bg-[#F4F4F4] "}>
                            Included in Total
                        </div>
                        {wallets.map((wallet, index) => {
                            return (
                                <div onClick={(e) => {
                                    handleOpenDialogDetail(e, wallet)
                                }} key={index}
                                     className="text-left border-r border-b hover:bg-[#E6EFE7] flex px-6 py-2 round-[10px]  w-full h-[72px] bg-[#FFFFFF] text-black cursor-pointer">
                                    <img src={wallet.name ? wallet?.icon?.url : ""}
                                         className="w-10 h-10 rounded-full my-2"
                                         alt=""/>
                                    <div className="px-3">
                                        <h3 className="font-sans my-1 text-[14px]">{wallet?.name}</h3>
                                        <span
                                            className="text-[#949494]">+ {currencyFormat(wallet?.initial)} {wallet?.currency?.code}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {detailState ? (<><DialogDetailWallet walletId={walletId}/></>) : null}
            </div>
            {walletState ? (<><DialogWallet/></>) : null}
        </motion.div>
    )
}

