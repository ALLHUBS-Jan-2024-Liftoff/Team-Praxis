import {useAuth} from "../AuthContext.jsx";

export const LogoutButton = () => {

    const {logout} = useAuth();

    const handleSubmit = async () => {
        await logout();
    };

    return (
        <button className={"text-black bg-gray-200 hover:text-white hover:bg-black"} onClick={handleSubmit}>
            Logout
        </button>
    );
}