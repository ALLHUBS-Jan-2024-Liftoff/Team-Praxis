import {Navigate, Outlet} from "react-router-dom";
import {isAuthenticated} from "../service/AuthService.js";

export const ProtectedRoutes = ({
                                    user,
                                    redirectPath = "/login",
                                    children
                                }) => {

    if (!user) {
        if (!isAuthenticated()) {
            return <Navigate to={redirectPath} replace/>;
        } else {
            return <Navigate to={"/"} replace/>
        }
    }

    return children ? children : <Outlet/>;
}