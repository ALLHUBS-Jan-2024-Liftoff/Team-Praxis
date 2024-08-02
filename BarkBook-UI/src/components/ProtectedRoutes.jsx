import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoutes = ({
                                    user,
                                    redirectPath = "/login",
                                    children
                                }) => {

    if (!user) {
        return <Navigate to={"/login"} replace/>;
    }

    return children ? children : <Outlet />;
}