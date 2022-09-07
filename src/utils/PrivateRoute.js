import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute=()=>{
    let token=JSON.parse(localStorage.getItem('JWT'))

    return (
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;