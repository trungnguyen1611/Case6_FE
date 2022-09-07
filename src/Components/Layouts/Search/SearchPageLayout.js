import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NavBarWithMultipleInPut from "./NavBarWithMultipleInPut";
import SideBar from "../../SideBar";

const mdTheme = createTheme();

function SearchPageLayout({children}) {

    return (
        <div>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <NavBarWithMultipleInPut/>
                    <SideBar/>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar/>
                        <>
                            {children}
                        </>
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default SearchPageLayout