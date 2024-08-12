import {useAuth} from "../AuthContext.jsx";

export const LogoutButton = () => {

    const {logout} = useAuth();

    const handleSubmit = async () => {
        await logout();
    };

    return (
        <button className={"text-sm text-gray-700"} onClick={handleSubmit}>
            Logout
        </button>
    );
}