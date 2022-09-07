import NavBar from "../../NavBar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import {useDispatch} from "react-redux";
import {openDialogTransaction} from "../../../Features/DiaLogSlice/openDialogTransactionSlice";


import {useNavigate} from 'react-router-dom';



const NavBarTransactions = () => {
const navigate = useNavigate();
    const dispatch=useDispatch()
    return (
        <div>
            <NavBar>
                <IconButton >
                    <CalendarMonthIcon/>
                </IconButton>
                <IconButton onClick={()=>{navigate('/search')}}>
                    <SearchIcon />
                </IconButton>
                <button className={" text-white hover:bg-[#1AA332]  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none  bg-[#2EB74B]"}
                onClick={()=>dispatch(openDialogTransaction(true))}
                >ADD TRANSACTION</button>
            </NavBar>
        </div>
    );
};

export default NavBarTransactions;