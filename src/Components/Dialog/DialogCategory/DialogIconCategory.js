import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {closeDialogIconCategory} from "../../../Features/DialogCategorySlice/openDialogIconCategorySlice";
import {ImageList, ImageListItem} from "@mui/material";
import {setSelectIcon} from "../../../Features/DiaLogSlice/selectIconSlice";
import {
    setUpdateDataIconCategory,
} from "../../../Features/DialogCategorySlice/updataDataCategorySlice";

export default function DialogIconCategory() {

    const dispatch = useDispatch()
    const openDialogIconCategory = useSelector((state) => state.DialogIconCategory.value)
    const handleClose = () => {
        dispatch(closeDialogIconCategory(false))
    }

    const handleChange = (icon)=>{
        console.log(icon)
        dispatch(setSelectIcon(icon))
        dispatch(setUpdateDataIconCategory(icon))

        dispatch(closeDialogIconCategory(false))
    }

    return (
        <div>
            <Dialog
                open={openDialogIconCategory}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Icon Category"}
                </DialogTitle>

                <ImageList sx={{width: 300, height: 300}} cols={3} rowHeight={60}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} sx={{width: 65,height: 65}}>
                            <Button onClick = {() => handleChange(item.img)}>
                                <img
                                    src={`${item.img}?w=60&h=60&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=60&h=60&fit=crop&auto=format&dpr=2 2x`}
                                    loading="lazy"
                                />
                            </Button>
                        </ImageListItem>
                    ))}
                </ImageList>

                <DialogActions>
                    <Button sx={{color:'red'}} onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

const itemData = [
    {
        img: "https://static.moneylover.me/img/icon/ic_category_foodndrink.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/ic_category_transport.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/icon_136.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/icon_124.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/icon_134.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/icon_125.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/icon_126.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/icon_138.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/icon_118.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/ic_category_salary.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/ic_category_other_income.png",
    },
    {
        img: "https://static.moneylover.me/img/icon/icon_143.png",
    },
];
