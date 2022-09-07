import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {FormControl, FormControlLabel, Grid, InputLabel, Snackbar} from "@mui/material";
import Alert from '@mui/material/Alert';
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";

import {useState} from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DialogIconCategory from "./DialogIconCategory";
import {useNavigate} from "react-router-dom";
import {
    openDialogIconCategory
} from "../../../Features/DialogCategorySlice/openDialogIconCategorySlice";
import Typography from "@mui/material/Typography";
import axios from "../../../axios";
import {setDataCategory} from "../../../Features/DialogCategorySlice/dataCategorySlice";
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import {closeDialogUpdateCategory} from "../../../Features/DialogCategorySlice/openDialogUpdateCategorySlice";
import {
    setUpdateDataNameCategory,
    setUpdateDataTypeCategory
} from "../../../Features/DialogCategorySlice/updataDataCategorySlice";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function DialogUpdateCategory() {
    const [open, setOpen] = React.useState(false); //bat tat alert thong bao
    const [messageSucsess, setMessageSucsess] = useState('')
    const [messageErr, setMessageErr] = useState('')
    const dispatch = useDispatch()
    const openDialogUpdateCategory = useSelector((state) => state.UpdateCategory.value)
    const dataWallet = useSelector((state) => state.SelectDataWalletOnCategory.value)
    const dataUpdateCategory = useSelector((state) => state.UpdateDataCategory.value)
    console.log(dataUpdateCategory)

    const handleClose = () => {
        dispatch(closeDialogUpdateCategory(false))
        setMessageErr('')
    }

    const iconButton = useSelector((state) => state.SelectIcon.value)
    console.log(iconButton)
    const handleIcon = () => {
        dispatch(openDialogIconCategory(true))
    }
    const handleChangeName = (e) => {
        dispatch(setUpdateDataNameCategory(e.target.value))
    }
    const handleChangeType = (e) => {
        dispatch(setUpdateDataTypeCategory(e.target.value))
    }

//tat alert

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let token = JSON.parse(localStorage.getItem('JWT')) //lay token o trong localra
            await axios.put('/category/update',
                {
                    id:dataUpdateCategory.id,
                    type: dataUpdateCategory.type,
                    name: dataUpdateCategory.name,
                    icon: dataUpdateCategory.icon,
                    wallet: dataWallet.idWallet
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then((r) => {
                console.log(r)
                setMessageSucsess(r.data.message)
                setOpen(true);
                dispatch(setDataCategory(r.data.data)) //set data toan bo du lieu tra ve de in ra man hinh
                dispatch(closeDialogUpdateCategory(false));

            }).catch(err => {
                setMessageErr(err.response.data.message)
                console.log(err.response.data)
            })
        } catch (err) {
            // console.log(err.response)
        }
    }


    return (
        <div>
            <Dialog
                open={openDialogUpdateCategory}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth='400px'
            >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '100%'},
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <DialogTitle>{"Update Category"}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Button align='center' onClick={handleIcon}
                                        sx={{ml: 2, mt: 1}} variant="outlined"
                                >
                                    {iconButton === '' ?
                                        <HelpOutlineIcon sx={{width: 60, height: 60, color: '#9e9e9e'}}/> :
                                        <img style={{width: '60px'}} src={iconButton} alt={""}/>}
                                </Button>
                                <Typography align='center' variant='h6'>Select Icon</Typography>

                                <DialogIconCategory/>


                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    value={dataUpdateCategory.name ? dataUpdateCategory.name : " "}
                                    placeholder="Name"
                                    sx={{color: '#9e9e9e'}}
                                    onChange={handleChangeName}
                                />

                                <FormControl sx={{width: '100%'}}>
                                    <InputLabel id='demo-simple-select-label'
                                                htmlFor="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={dataUpdateCategory.type ? dataUpdateCategory.type : " "}
                                        label="Type"
                                        onChange={(e) => handleChangeType(e)}
                                        sx={{color: '#9e9e9e', ml: 1,width: '100%'}}
                                        focused
                                    >
                                        <MenuItem value={'EXPENSE'}>Expense</MenuItem>
                                        <MenuItem value={'INCOME'}>Income</MenuItem>
                                    </Select>
                                </FormControl>
                                {messageErr && <span className='text-red-700'>{messageErr}</span>}
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <button className={"text-[#F15A59] rounded-[5px] hover:bg-[#FEECEB] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"} onClick={handleClose}>Close</button>
                        <button onClick={handleSubmit} className={"bg-[#2EB74B] text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"} type='submit'>UPDATE</button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%'}}>
                        {messageSucsess}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>

    );
}
