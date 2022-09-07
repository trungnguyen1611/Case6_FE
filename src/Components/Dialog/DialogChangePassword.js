import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {useDispatch, useSelector} from "react-redux";
import DialogTitle from '@mui/material/DialogTitle';
import {closeDialogChangePass} from "../../Features/DiaLogSlice/openDialogChangePassSlice";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import axios from '../../axios/index'
import {FilledInput, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";


export default function DialogChangePassword() {
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,

    })
    const [isFull, setIsFull] = useState(false)
    const dispatch = useDispatch()
    const openDialogChangePass = useSelector((state) => state.DialogPass.value)
    const navigate = useNavigate()

    const handleCloseChangePass = () => {
        dispatch(closeDialogChangePass(false))
    };

    const handleChange = (e, field) => {
        data[field] = e.target.value
        setData({...data})
    }

    const handleClickShowOldPassword = () => {
        setData({
            ...data,
            showOldPassword: !data.showOldPassword,
        });
    }

    const handleClickShowNewPassword = () => {
        setData({
            ...data,
            showNewPassword: !data.showNewPassword,
        });
    }

    const handleClickShowConfirmPassword = () => {
        setData({
            ...data,
            showConfirmPassword: !data.showConfirmPassword,
        });
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(closeDialogChangePass(false))
        const body = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
        }
        let token = JSON.parse(localStorage.getItem('JWT'))

        axios.put('auth/change-password',
            body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                swal({
                    icon: "success",
                    button: null,
                })
                    .then(() => {
                        navigate('/login')
                    })
                setTimeout(() => {
                    swal.close()
                }, 1000)
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    button: null,
                })
                    .then(() => {
                        console.log(err.message)
                    })
                setTimeout(() => {
                    swal.close()
                }, 1000)
            })

    }
    useEffect(() => {
        if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
            setIsFull(false)
        } else {
            setIsFull(true)
        }
    })
    return (
        <div>
            <Dialog open={openDialogChangePass}>
                <Box
                    sx={{width: "400px"}}
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <div className={"mt-4 relative"}>
                            <OutlinedInput
                                sx={{width: "100%"}}
                                id="floating_filled1"
                                type={data.showOldPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => handleChange(e, 'oldPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowOldPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {data.showOldPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <label htmlFor="floating_filled1"
                                   className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                                Old password
                            </label>
                        </div>
                        <div className={"mt-4 relative"}>
                            <OutlinedInput
                                sx={{width: "100%",}}
                                id="floating_filled"
                                type={data.showNewPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => handleChange(e, 'newPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowNewPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {data.showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <label htmlFor="floating_filled"
                                   className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                                New password
                            </label>
                        </div>
                        <div className={"mt-4 relative"}>
                            <OutlinedInput
                                sx={{width: "100%",}}
                                id="floating_filled"
                                type={data.showConfirmPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => handleChange(e, 'confirmPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {data.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <label htmlFor="floating_filled"
                                   className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                                Confirm password
                            </label>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button
                            className={"text-[#F15A59] rounded-[5px] hover:bg-[#FEECEB] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                            onClick={handleCloseChangePass}>CLOSE
                        </button>
                        {isFull ? <button
                            className="bg-[#2EB74B] text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleSubmit}
                            id="btn-create"
                        >
                            SAVE CHANGE
                        </button> : <button
                            className="bg-[#E0E0E0] text-[#ACACAC]  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            disabled={true}
                            onClick={handleSubmit}
                            id="btn-create"
                        >
                            SAVE CHANGE </button>}
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
