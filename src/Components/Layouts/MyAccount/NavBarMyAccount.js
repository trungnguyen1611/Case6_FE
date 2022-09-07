import NavBar from "../../NavBar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const NavBarMyAccount = () => {
    return (
        <div>
            <NavBar>
                <IconButton >
                    <CalendarMonthIcon/>
                </IconButton>

                <IconButton>
                    <RemoveRedEyeIcon/>
                </IconButton>

                <IconButton>
                    <SearchIcon/>
                </IconButton>
                <Button color="success" variant="contained">ADD TRANSACTION</Button>
            </NavBar>
        </div>
    );
};

export default NavBarMyAccount;