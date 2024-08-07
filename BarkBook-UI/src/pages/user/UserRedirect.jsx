import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getCurrentUser} from "../../service/AuthService.js";

export const UserRedirect = () => {
    const location = useLocation()
    const navigate = useNavigate();

    useEffect(() => {
        const user = getCurrentUser();
        const subPath = location.pathname;
        console.log(subPath)
        if (user && subPath) {
            navigate(`${subPath}/${user.id}`);
        } else {
            navigate(`/`)
        }
    }, [navigate, location]);


    return (
        <>
            <h1>Redirecting...</h1>
            <Link to={"/"}>Click here if no change</Link>
        </>
    )
}