import NavBar from "../../NavBar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const NavBarReport = () => {
    const navigate = useNavigate();
    return (
        <div>
            <NavBar>
                <IconButton>
                    <CalendarMonthIcon/>
                </IconButton>
                <IconButton onClick={() => navigate("/search")}>
                    <SearchIcon/>
                </IconButton>
            </NavBar>
        </div>
    );
};

export default NavBarReport;