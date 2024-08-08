import {Link} from "react-router-dom";
import {LogoutButton} from "../../../components/LogoutButton.jsx";
import {isAuthenticated} from "../../../service/AuthService.js";

const authDestinations = [
    {name: 'login', path: '/login', valid: true},
    {name: 'register', path: '/register', valid: true},
]

// this is a temporary component to provide developer access to user pages.
// TODO: refactor into the navbar
export const UserStuff = () => {

    return (
        <>
            <br/>
            <div className={"flex flex-col items-center justify-center"}>
                <div>
                    {isAuthenticated() ? (
                        <div className={"flex flex-col"}>
                            <Link
                                to={`/user`}
                                className={'flex flex-col text-black bg-gray-200 hover:text-white hover:bg-black'}
                            >My profile</Link>
                            <LogoutButton/>
                        </div>
                    ) : (
                        <div className={"flex flex-col"}>
                            {authDestinations.map((item) => (
                                item.valid ? (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={'flex flex-col text-black bg-gray-200 hover:text-white hover:bg-black'}
                                    >
                                        {item.name}
                                    </Link>
                                ) : null
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}