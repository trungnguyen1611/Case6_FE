import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {closeDialog} from "../../Features/DiaLogSlice/openDialogAccountSlide";
import {openDialogChangePass} from "../../Features/DiaLogSlice/openDialogChangePassSlice";
import {userSignOut} from "../../Features/CurrentUser/UserSlice";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import {selectCurrentWallet} from "../../Features/Transaction/currentWalletSlice";
import axios from "axios";
import {useEffect, useState} from "react";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DialogAccount() {
    const user=JSON.parse(localStorage.getItem('alohaUser'))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const openDialogAccount = useSelector((state) => state.Dialog.value)
    const currentUser = useSelector((state) => state.currentUser.currentUser)
    const userId = JSON.parse(localStorage.getItem('alohaUser'))?._id;
    const currentWalletState=useSelector(state=>state.currentWallet.value)
    const[inflow,setInflow]=useState()
    const[outflow,setOutflow]=useState()

    useEffect(()=>{
        if (user?._id && currentWalletState?._id){
        axios.post('transaction/list/wallet', {
            user: user?._id,
            wallet: currentWalletState?._id
        })
            .then(res => {

                let inflow = res.data.data.filter(value => {
                    return value?.category?.type === 'INCOME'
                })
                let sumInflow = 0
                inflow.forEach(value => sumInflow += value.amount)


                let outFlow = res.data.data.filter(value => {
                    return value?.category?.type === 'EXPENSE'
                })
                let sumOutFlow = 0
                outFlow.forEach((value) => sumOutFlow += value?.amount)

                setOutflow(sumOutFlow)
                setInflow(sumInflow)
            }).catch(err =>{
            console.log(err.message)
        })}
    },[currentWalletState])

    const handleSignOut = () => {
        dispatch(closeDialog(false))
        dispatch(userSignOut())
        swal("See you again and Have a nice day!", {
            buttons: false,
            timer: 3000,
        }).then(() => {
            dispatch(selectCurrentWallet({}))
            navigate('/login')
        })
    };
    const handleClose = () => {
        dispatch(closeDialog(false))
    };

    const handleChangePass = () => {
        dispatch(openDialogChangePass(true))
        dispatch(closeDialog(false))
    }

    const handleOpenConfirmDeleteAccount = () => {
        swal({
            title: `Do you want to delete account ?`,
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your account has been deleted!", {
                    icon: "success",
                }).then(() => {
                    axios.post('http://localhost:8080/user',{userId:userId}).then((r)=>{
                        handleClose();
                        navigate('/login');
                    })
                });
            } else {
                swal("Your record is safe!");
            }
        });

    }

    function currencyFormat(num) {
        return num?.toFixed(0)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openDialogAccount}
                fullWidth
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    My Account
                </BootstrapDialogTitle>

                <div
                    className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full shadow-lg rounded-xl mt-16 h-full">
                    <div className="px-6 h-full ">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full flex justify-center">
                                <div className="relative">
                                    <img
                                        src={currentUser?.avatarUrl ? currentUser?.avatarUrl : "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"}
                                        className="shadow-xl object-cover w-[150px] h-[150px] rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                                        alt=""/>
                                </div>
                            </div>
                            <div className="w-full text-center mt-20">
                                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                    <div className="p-3 text-center">
                                        <span
                                            className="text-xl font-bold block uppercase tracking-wide text-slate-700"
                                        >{currencyFormat(currentWalletState?.initial)}{currentWalletState?.currency?.code?.split('-')[1]}
                                        </span>
                                        <span className="text-sm text-slate-400">Balance</span>
                                    </div>
                                    <div className="p-3 text-center">
                                        <span
                                            className="text-xl font-bold block uppercase tracking-wide text-slate-700"
                                        >{currencyFormat(outflow)}{currentWalletState?.currency?.code?.split('-')[1]}
                                        </span>
                                        <span className="text-sm text-slate-400">Expenses</span>
                                    </div>
                                    <div className="p-3 text-center">
                                        <span
                                            className="text-xl font-bold block uppercase tracking-wide text-slate-700"
                                        >{currencyFormat(inflow)}{currentWalletState?.currency?.code?.split('-')[1]}
                                        </span>
                                        <span className="text-sm text-slate-400">Income</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1 capitalize">{currentUser?.username ? currentUser?.username : 'User Name'}</h3>
                            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                {currentUser?.company ? `Company,  ${currentUser.company}` : ""}
                            </div>
                            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                {currentUser?.email ? currentUser.email : ""}
                            </div>
                            <span onClick={handleOpenConfirmDeleteAccount}
                                  className={"text-gray-200 hover:text-zinc-500 cursor-pointer"}>Delete account</span>
                        </div>
                        <div className="mt-6 py-6 border-t border-slate-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-between">
                                    <Typography>
                                        <Button variant="outlined" color="success" align='right' size="small"
                                                onClick={() => {
                                                    dispatch(closeDialog(false))
                                                    navigate('/my-account/change-profile')
                                                }}>Change Profile</Button>
                                    </Typography>

                                    <Typography>
                                        <Button variant="outlined" color="success" disabled={!!currentUser?.uid}
                                                align='right' size="small"
                                                onClick={handleChangePass}>Change Password</Button>
                                    </Typography>

                                    <Typography>
                                        <Button autoFocus variant={"outlined"} color={"error"} onClick={handleSignOut}>
                                            SIGN OUT
                                        </Button>
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BootstrapDialog>
        </>
    );
}
