import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';


import NavBar from "../../NavBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import category from "../../../Pages/Category/Category";
import {useNavigate} from "react-router-dom";
import {openDialogCategory, closeDialogCategory} from "../../../Features/DialogCategorySlice/openDialogCategorySlice";
import {openDialogSelectWallet} from "../../../Features/DiaLogSlice/openDialogWallet";
import {setSearchInputForNote, setSearchInputForDate} from "../../../Features/SearchInput/SearchInputSlice";
import {afterLoadingAPIScreen, isLoadingAPIScreen} from "../../../Features/isLoadingScreen/isLoadingScreen";
import {calculateNewValue} from "@testing-library/user-event/dist/utils";


const NavBarWithMultipleInPut = () => {


    let navigate = useNavigate();
    const dispatch = useDispatch();
    const SearchInput = useSelector(state => state.SearchInput.SearchInput)

    const handleOnChange = (event) => {
        dispatch(setSearchInputForNote({...SearchInput, [event.target.name]: event.target.value}));
    };

    const handleReset = () => {
        dispatch(setSearchInputForNote({
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
        }));
    };

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleOpenDatePicker = () => {
        setIsDatePickerOpen(true);
    };

    const handleCloseDatePicker = (event, reason) => {
        if (reason !== 'backdropClick') {
            setIsDatePickerOpen(false);
        }
    };

    const [selectedDate, setSelectedDate] = useState({
        startDate: dayjs(new Date().toString()),
        endDate: dayjs(new Date().toString())
    });

    const handleStartDateChange = (newValue) => {
        setSelectedDate({...selectedDate, startDate: newValue});
    };
    const handleEndDateChange = (newValue) => {
        setSelectedDate({...selectedDate, endDate: newValue});
    };

    const handleUpdateDateIntoRedux = () => {
        dispatch(setSearchInputForDate({
            startDate: selectedDate.startDate.$d.toLocaleDateString('en-US'),
            endDate: selectedDate.endDate.$d.toLocaleDateString('en-US')
        }))
    }

    useEffect(() => {
        // console.log(SearchInput);
        dispatch(isLoadingAPIScreen())
        dispatch(afterLoadingAPIScreen())
    })
    return (
        <div>
            <NavBar>
                <div className="content-container block">
                    <div className="flex justify-between text-black w-full">
                        <div className=" p-4 flex text-black ">
                            <button className='w-10 h-10 cursor-pointer'><ArrowBackIcon onClick={() => {
                                navigate(-1)
                            }}/></button>
                            <span className='w-50 h-10 p-1.5'> Search for transaction</span></div>
                        <div className=" flex text-sm  p-6 cursor-pointer" onClick={handleReset}>Reset</div>
                    </div>
                    <div className="flex  text-black">
                        <div className=" p-4 flex text-black gap-7 w-full justify-center">
                            <div className=" border-transparent border-2 hover:border-gray-200 rounded p-3"
                                 onClick={() => dispatch(openDialogSelectWallet())}>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="walletSearch">
                                        Wallet
                                    </InputLabel>
                                    <Input
                                        name={"wallet"}
                                        onChange={() => {
                                        }}
                                        id="walletSearch"
                                        value={SearchInput?.wallet?.name}

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img className="h-7 object-cover"
                                                     src={SearchInput?.wallet?.icon?.url || "https://static.moneylover.me/img/icon/ic_category_all.png"}
                                                     alt=""/>
                                            </InputAdornment>
                                        }
                                        readOnly={true}
                                    />
                                </FormControl>
                            </div>
                            <div className=" border-transparent border-2 hover:border-gray-200 rounded p-3"
                                 onClick={() => dispatch(openDialogCategory())}>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="walletSearch">
                                        Category
                                    </InputLabel>
                                    <Input
                                        name={"category"}
                                        onChange={() => {
                                        }}
                                        id="walletSearch"
                                        value={SearchInput?.category?.name}

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img className="h-7 object-cover"
                                                     src={SearchInput?.category?.icon}
                                                     alt=""/>
                                            </InputAdornment>
                                        }
                                        readOnly={true}
                                    />
                                </FormControl>
                            </div>

                            <div className=" border-transparent border-2 hover:border-gray-200 rounded p-3"
                                 onClick={handleOpenDatePicker}
                            >
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="walletSearch">
                                        Date
                                    </InputLabel>
                                    <Input
                                        name={"date"}
                                        onChange={() => {
                                        }}
                                        id="walletSearch"
                                        value={SearchInput.date}
                                        readOnly={true}
                                    />
                                </FormControl>
                            </div>

                            <div className=" border-transparent border-2 hover:border-gray-200 rounded p-3">
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="walletSearch">
                                        Note
                                    </InputLabel>
                                    <Input
                                        name={"note"}
                                        value={SearchInput.note}
                                        onChange={handleOnChange}
                                        id="walletSearch"
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>

            </NavBar>

            {/*pickupdate modal*/}
            <div className='w-full'>
                <Dialog disableEscapeKeyDown open={isDatePickerOpen} onClose={handleCloseDatePicker}>
                    <DialogTitle>Pick the Date</DialogTitle>
                    <DialogContent>
                        <Box sx={{width: 300}}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <MobileDatePicker
                                        label="Starting Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={selectedDate.startDate}
                                        maxDate={selectedDate.endDate}
                                        name={'StartDate'}
                                        onChange={handleStartDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <MobileDatePicker
                                        label="End Date"
                                        inputFormat="MM/DD/YYYY"
                                        name={'EndDate'}
                                        minDate={selectedDate.startDate}
                                        maxDate={dayjs(new Date().toString())}
                                        value={selectedDate.endDate}
                                        onChange={handleEndDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDatePicker}>Cancel</Button>
                        <Button onClick={() => {
                            handleCloseDatePicker();
                            handleUpdateDateIntoRedux()
                        }}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>


        </div>
    );
};

export default NavBarWithMultipleInPut