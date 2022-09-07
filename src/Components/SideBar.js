import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import MainListItems from "./Layouts/listItems";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {useDispatch, useSelector} from "react-redux";
import {addClick} from "../Features/SidebarOpenSlice/clickSlice";
import logo from "../images/hi-removebg-preview.png"

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 240,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


function SideBar() {
    const dispatch = useDispatch()
    const open = useSelector((state) => state.Layout.value)
    return <Drawer variant="permanent" open={open}>
        <Toolbar
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
            }}
        >
            <div className={"h-[63px] mr-7 flex"}>
                <img src={logo} alt="" className={"object-cover  w-[60px] "}/>
                <span className={"mt-5 text-xl text-zinc-500"}>Alo</span>
                <span className={"mt-5 text-xl font-black text-[#2EB74B]"}>ha</span>
            </div>
            <IconButton onClick={() => {
                dispatch(addClick(!open))
            }}>
                <ChevronLeftIcon/>
            </IconButton>
        </Toolbar>
        <Divider/>
        <List component="nav">
            <MainListItems/>
        </List>
    </Drawer>;
}

export default SideBar;