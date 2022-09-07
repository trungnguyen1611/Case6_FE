import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import {useNavigate} from "react-router-dom";
import DialogAccount from "../Dialog/DialogAccount";
import {useDispatch, useSelector} from "react-redux";
import {openDialog} from "../../Features/DiaLogSlice/openDialogAccountSlide";
import DialogChangePassword from "../Dialog/DialogChangePassword";
import {Typography} from "@mui/material";
import {sx} from "@mui/joy/styles/styleFunctionSx";

const MainListItems = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const open = useSelector((state)=>state.Dialog.value)


    const handleOpenAccountDialog = () => {
        dispatch(openDialog(true))
    }

    const pathname = window.location.pathname;

    return (
        <>
            <React.Fragment>
                <ListItemButton
                    onClick={() => navigate('/Transactions')}>
                    <ListItemIcon>
                        <AccountBalanceWalletIcon sx={pathname==="/Transactions" ? {color:'green'} :{}} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography sx={pathname==="/Transactions" ? {color:'green'} :{}} >Transaction</Typography>}/>
                </ListItemButton>

                <ListItemButton
                    onClick={() => navigate('/report')}
                >
                    <ListItemIcon>
                        <CollectionsBookmarkIcon sx={pathname==="/report" ? {color:'green'} :{}}/>
                    </ListItemIcon>
                    <ListItemText primary={<Typography sx={pathname==="/report" ? {color:'green'} :{}} >Report</Typography>}/>
                </ListItemButton>


                {/*<ListItemButton*/}
                {/*    onClick={() => navigate('/store')}*/}
                {/*>*/}
                {/*    <ListItemIcon>*/}
                {/*        <LocalGroceryStoreIcon/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Store"/>*/}
                {/*</ListItemButton>*/}

                {/*<ListItemButton*/}
                {/*    onClick={() => navigate('/help')}*/}
                {/*>*/}
                {/*    <ListItemIcon>*/}
                {/*        <HelpIcon/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Help"/>*/}
                {/*</ListItemButton>*/}
            </React.Fragment>
            <hr/>
            <React.Fragment>
                <ListItemButton
                    onClick={handleOpenAccountDialog}
                >
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary={<Typography sx={open ? {color:'green'} :{}} >My Account</Typography>}/>
                </ListItemButton>

                <ListItemButton
                    onClick={() => navigate("/my-wallets")}
                >
                    <ListItemIcon>
                        <AccountBalanceWalletIcon/>
                    </ListItemIcon>
                    <ListItemText primary="My Wallets"/>
                </ListItemButton>

                <ListItemButton
                    onClick={() => navigate("/categories")}
                >
                    <ListItemIcon>
                        <CategoryIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Categories"/>
                </ListItemButton>
            </React.Fragment>
            <DialogAccount/>
            <DialogChangePassword/>
        </>
    )
};

export default MainListItems;