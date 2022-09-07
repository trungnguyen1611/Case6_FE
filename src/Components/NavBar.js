import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import {styled, alpha} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import {useDispatch, useSelector} from "react-redux";
import {addClick} from "../Features/SidebarOpenSlice/clickSlice";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {selectCurrentWallet} from "../Features/Transaction/currentWalletSlice";
import axios from '../axios/index'

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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

function NavBar({children}) {
    const user = JSON.parse(localStorage.getItem('alohaUser'))
    const dispatch = useDispatch()
    const open = useSelector((state) => state.Layout.value)
    const currentWalletState = useSelector(state => state.currentWallet.value)
    const dialogTransactionState = useSelector(state => state.dialogTransaction.value);
    const dialogEditState = useSelector(state => state.dialogEditTransaction.value);

    // thanh dropDow
    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        let result = 0
        axios.post('wallet/render', {userId: user?._id})
            .then(res => {
                res.data.data.forEach((item) => {
                    result += item.initial
                })
            })
    }, [dialogTransactionState, dialogEditState, currentWalletState])

    function currencyFormat(num) {
        return num?.toFixed(0)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    bgcolor: 'white',
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => {
                        dispatch(addClick(!open))
                    }}
                    sx={{
                        marginRight: '100px',
                        ...(open && {display: 'none'}),
                    }}
                >
                    <MenuTwoToneIcon sx={{bgcolor: '#757575'}}/>
                </IconButton>

                {/*<IconButton>*/}
                <Button
                    onClick={handleClick}
                    // endIcon={<KeyboardArrowDownIcon/>}
                >
                    <img
                        className='rounded-full w-[35px] h-[35px] object-cover'
                        src={currentWalletState?.icon?.url ? currentWalletState?.icon?.url : 'https://static.moneylover.me/img/icon/ic_category_all.png'}
                    />
                    <Box sx={{ml: 1}}>
                        <Typography sx={{
                            fontWeight: 'medium',
                            fontSize: 12,
                            color: 'black',
                            textAlign: 'left'
                        }}>
                            {currentWalletState?.name
                                ? currentWalletState?.name
                                : 'Select Wallet'}
                            <KeyboardArrowDownIcon/>
                        </Typography>

                        <Typography sx={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: 'black',
                            textAlign: 'left'
                        }}>
                            {/*total current wallet*/}
                            {currentWalletState?.currency
                                ? currencyFormat(currentWalletState?.initial) + " " + currentWalletState?.currency?.code?.split("-")[1]
                                : ""}
                        </Typography>
                    </Box>

                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={opens}
                    onClose={handleClose}
                >
                    <Typography sx={{
                        fontWeight: 'light',
                        fontSize: 16,
                        color: 'black',
                        textAlign: 'center',
                        m: 1
                    }}>
                        Select Wallet
                    </Typography>

                    {user?.wallet?.map((wallet, index) => (
                        <div key={index}>
                            <Divider/>
                            <MenuItem disableRipple onClick={() => {
                                setAnchorEl(null);
                                dispatch(selectCurrentWallet(wallet));

                            }}>
                                <img
                                    src={wallet?.icon?.url ? wallet?.icon?.url : "https://static.moneylover.me/img/icon/icon.png"}
                                    className='rounded-full w-[35px] h-[35px] object-cover'
                                    alt="..."
                                />
                                <Box sx={{ml: 2}}>
                                    <Typography sx={{
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        color: 'black',
                                        textAlign: 'left'
                                    }}>
                                        {wallet?.name}
                                    </Typography>
                                    <Typography sx={{
                                        fontWeight: 'light',
                                        fontSize: 12,
                                        color: 'black',
                                        textAlign: 'left'
                                    }}>
                                        {wallet?.initial}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        </div>
                    ))}

                </StyledMenu>
                {/*</IconButton>*/}
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    align='right'
                    sx={{flexGrow: 1}}
                >
                    {children}
                </Typography>

            </Toolbar>
        </AppBar>
    )
}

export default NavBar