import {useAuth} from "../AuthContext.jsx";
import {useEffect} from "react";

export const LogoutRedirect = () => {

    const {logout} = useAuth();

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <></>
    );
}