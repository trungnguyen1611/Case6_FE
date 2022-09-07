import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from "@mui/material/Divider";
import {useEffect, useState} from "react";
import axios from "../../axios";
import {Card, CardContent, CardHeader, Collapse, Grid, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {styled, alpha} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DialogNewCategory from "../../Components/Dialog/DialogCategory/DialogNewCategory";
import {useDispatch, useSelector} from "react-redux";
import {
    closeDialogNewCategory,
    openDialogNewCategory
} from "../../Features/DialogCategorySlice/openDialogNewCategorySlice";
import DialogIconCategory from "../../Components/Dialog/DialogCategory/DialogIconCategory";
import {setSelectIcon} from "../../Features/DiaLogSlice/selectIconSlice";
import {setDataCategory} from "../../Features/DialogCategorySlice/dataCategorySlice";
import {openDialogUpdateCategory} from "../../Features/DialogCategorySlice/openDialogUpdateCategorySlice";
import DialogUpdateCategory from "../../Components/Dialog/DialogCategory/DialogUpdateCategory";
import {setUpdateDataCategory} from "../../Features/DialogCategorySlice/updataDataCategorySlice";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {useNavigate} from "react-router-dom";
import {selectDataWallet, setIdWallet} from "../../Features/DialogCategorySlice/selectDataWalletOnCategory";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";
import './Category.css'
import {afterLoadingAPIScreen, isLoadingAPIScreen} from "../../Features/isLoadingScreen/isLoadingScreen";


//o dropDow
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function Category() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let tokenUser = JSON.parse(localStorage.getItem('alohaUser')) //lay token o trong localra
    //the hien ra khi bam button
    const [checked, setChecked] = React.useState(false);
    const [category, setCategory] = useState({})
    const [messageSucsess, setMessageSucsess] = useState('')
    const [open, setOpen] = React.useState(false); //bat tat alert thong bao
    const [wallets, setWallets] = useState([])
    const dataWallet = useSelector((state) => state.SelectDataWalletOnCategory.value)
    const dataUpdateCategory = useSelector((state) => state.UpdateDataCategory.value)

    const handleChange = (id, type, name, icon) => {
        setChecked(true);
        setCategory({id, type, name, icon})
    };
    const handleClose = () => {
        setChecked(false);
    }

// thanh dropDow
    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseNav = () => {
        setAnchorEl(null);
    };
    //hien dialog new category

    const handleNewCategory = () => {
        dispatch(openDialogNewCategory(true))
        dispatch(setSelectIcon(''))
    }

    //bat edit category

    const handleUpdateCategory = () => {
        dispatch(openDialogUpdateCategory(true))
        dispatch(setUpdateDataCategory(category))
        dispatch(setSelectIcon(category.icon))

    }
    //tat alert
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
//click chon vi
    const handleSellectWallet = (idWallet, iconUrl) => {
        setAnchorEl(null);
        dispatch(selectDataWallet({idWallet, iconUrl}))
    }

    const handleDeleteCategory = async () => {
        try {
            let token = JSON.parse(localStorage.getItem('JWT')) //lay token o trong localra
            await axios.post('/category/delete', {id: category.id, wallet: dataWallet.idWallet},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then((r) => {
                console.log(r)
                setChecked(false);
                setMessageSucsess(r.data.message)
                setOpen(true);
                dispatch(setDataCategory(r.data.data)) //set data toan bo du lieu tra ve de in ra man hinh
            })
        } catch (err) {
            console.log(err)
        }

    }

    async function getAllProduct() {
        let token = JSON.parse(localStorage.getItem('JWT'))
        let idWallet = dataWallet.idWallet == '' ? wallets[0]._id : dataWallet.idWallet;
        dispatch(setIdWallet(idWallet))
        return await axios.post('/category', {idWallet: idWallet},
            {headers: {Authorization: `Bearer ${token}`}},


        )
    }

    useEffect(() => {
            async function demo() {
                let token = JSON.parse(localStorage.getItem('JWT'))
                await axios.post('/wallet/render', {userId: tokenUser._id},
                    {headers: {Authorization: `Bearer ${token}`}})
                    .then((r) => {
                        const idWallet  = r.data.data[0]._id || null;
                        const iconUrl = r.data.data[0].icon.url;
                        dispatch(selectDataWallet({idWallet, iconUrl}))
                        setWallets(r.data.data)
                    })
            }

            demo().catch(err => {
                console.log(err.response)
            })
        }, []
    )

    useEffect(() => {
            dispatch(isLoadingAPIScreen())
            getAllProduct()
                .then((r) => {
                    dispatch(setDataCategory(r.data.data))
                    dispatch(afterLoadingAPIScreen())
                })
        }, [dataWallet.idWallet || wallets]
    )

    const data = useSelector((state) => state.DateCategory.value)
    useEffect(() => {
            setCategory({...dataUpdateCategory})
        }, [data]
    )

    return (
        <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={Variants.variant1}
        >
            // navbar

            <Box sx={{flexGrow: 1}}>
                <AppBar position="fixed" sx={{bgcolor: 'white'}}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            <ArrowBackIcon sx={{color: 'black'}}/>
                        </IconButton>
                        <Typography variant="h6" color='black' component="div" sx={{flexGrow: 1}}>
                            <span></span>
                            Categories
                        </Typography>
                        <Button onClick={handleNewCategory} variant="soft" color="neutral" sx={{color: 'black'}}>New
                            Category</Button>
                        <DialogNewCategory/>

                        <Button
                            id="demo-customized-button"
                            aria-controls={opens ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={opens ? 'true' : undefined}
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon sx={{color: 'black'}}/>}
                            variant="plain"
                        >
                            <img src={dataWallet.iconUrl}
                                 style={{height: 30}}
                            />
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={opens}
                            onClose={handleCloseNav}
                        >
                            <Typography sx={{
                                fontWeight: 'light',
                                fontSize: 13,
                                color: 'black',
                                textAlign: 'left',
                                m: 1
                            }}>
                                Included in Total
                            </Typography>
                            <Divider sx={{my: 0.5}}/>

                            {
                                wallets.map((item) => (
                                    <MenuItem disableRipple key={item._id}
                                              onClick={() => handleSellectWallet(item._id, item.icon.url)}>

                                        <img src={item.icon.url}
                                             className='rounded-full w-[35px] h-[35px] object-cover'
                                        />
                                        <Box sx={{ml: 2}}>
                                            <Typography sx={{
                                                fontWeight: 'bold',
                                                fontSize: 14,
                                                color: 'black',
                                                textAlign: 'left'
                                            }}>
                                                {item.name}
                                            </Typography>
                                            {/*<Typography sx={{*/}
                                            {/*    fontWeight: 'light',*/}
                                            {/*    fontSize: 12,*/}
                                            {/*    color: 'black',*/}
                                            {/*    textAlign: 'left'*/}
                                            {/*}}>*/}
                                            {/*    +95.000*/}
                                            {/*</Typography>*/}
                                        </Box>

                                    </MenuItem>
                                ))
                            }


                        </StyledMenu>

                    </Toolbar>
                </AppBar>
            </Box>


            //2 the grid danh sach
            <div className='flex inline relative'>
                <Grid container
                      spacing={0}
                      alignItems="center"
                      justifyContent="center"
                      style={{minHeight: '100vh'}}
                      sx={{bgcolor: '#e0e0e0'}}
                >
                    <div className='w-1/2 flex justify-center pt-6 '>
                        {/*<Grid xs={6} md={4}>*/}
                        <Box
                            sx={{width: "80%", backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: 3}}
                        >
                            <Typography>
                                <Typography sx={{bgcolor: '#eeeeee', fontSize: 22}}>
                                    Expense
                                </Typography>
                                <Divider/>
                                {data.map((item) => (
                                    <div key={item._id}>
                                        {item.type == 'EXPENSE' &&
                                            <>
                                                <Button
                                                    onClick={() => handleChange(item._id, item.type, item.name, item.icon)}
                                                    sx={{width: '100%', justifyContent: 'left'}}>
                                                    <img style={{height: 40}}
                                                         src={item.icon}/>
                                                    <Typography sx={{m: 2}} variant="" color='black'>
                                                        {item.name}
                                                    </Typography>
                                                </Button>
                                                <Divider/>
                                            </>
                                        }
                                    </div>
                                ))}

                                <Typography sx={{bgcolor: '#eeeeee', fontSize: 22}}>
                                    Income
                                </Typography>
                                <Divider/>
                                {data.map((item) => (
                                    <div key={item._id}>
                                        {item.type == 'INCOME' &&
                                            <>
                                                <Button
                                                    onClick={() => handleChange(item._id, item.type, item.name, item.icon)}
                                                    sx={{width: '100%', justifyContent: 'left'}}>
                                                    <img style={{height: 40}}
                                                         src={item.icon}/>
                                                    <Typography sx={{m: 2}} variant="" color='black'>
                                                        {item.name}
                                                    </Typography>
                                                </Button>
                                                <Divider/>
                                            </>
                                        }
                                    </div>
                                ))}
                            </Typography>

                        </Box>

                        {/*</Grid>*/}

                    </div>
                    {checked && <div className='w-1/2 flex category-right'>

                        {/*<Grid xs={6} md={4}>*/}
                        <Box sx={{height: 1250}}>
                            <Box
                                sx={{
                                    '& > :not(style)': {
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        height: 120,
                                        width: 50,
                                    },
                                }}
                            >

                                <Box>
                                    <Box sx={{width: '100%',}}>
                                        <Collapse orientation="horizontal" in={checked}>
                                            <Card position="fixed" sx={{bgcolor: 'white'}}>
                                                <CardHeader sx={{height: '50px'}}
                                                            avatar={
                                                                <Button onClick={handleClose}>
                                                                    <CloseIcon/>
                                                                </Button>
                                                            }

                                                            action={
                                                                <>
                                                                    <Button
                                                                        onClick={handleDeleteCategory}
                                                                        variant="text" sx={{
                                                                        fontWeight: 'light',
                                                                        fontSize: 14,
                                                                        color: 'red',
                                                                        mb: 4
                                                                    }}>
                                                                        DELETE
                                                                    </Button>
                                                                    <Button onClick={handleUpdateCategory}
                                                                            variant="text" sx={{
                                                                        fontWeight: 'light',
                                                                        fontSize: 14,
                                                                        mb: 4,
                                                                        color: '#2EB74B',
                                                                    }}>
                                                                        EDIT
                                                                    </Button>
                                                                </>
                                                            }
                                                            title={<Typography component="span"
                                                                               sx={{fontWeight: 'bold', fontSize: 23}}>Category
                                                                details</Typography>
                                                            }

                                                />
                                                <DialogUpdateCategory/>


                                                <Divider/>
                                                <CardContent>
                                                    <img style={{height: 65, float: "left", marginRight: '30px'}}
                                                         src={category.icon}/>
                                                    <Box>
                                                        <Typography sx={{fontWeight: 'medium', fontSize: 20}}
                                                                    color='black'>
                                                            {category.name}
                                                        </Typography>
                                                        <Box sx={{fontSize: 12}}>{category.type}</Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Collapse>
                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                        {/*</Grid>*/}
                    </div>
                    }
                </Grid>
            </div>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%'}}>
                        {messageSucsess}
                    </Alert>
                </Snackbar>
            </Stack>
        </motion.div>
    )
}

export default Category