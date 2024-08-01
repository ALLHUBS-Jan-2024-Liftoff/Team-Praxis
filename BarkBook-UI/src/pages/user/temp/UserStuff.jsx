import {Link} from "react-router-dom";
import {UserLogout} from "./UserLogout.jsx";
import {useEffect, useMemo, useState} from "react";
import {getCurrentUser, isAuthenticated} from "../../../service/AuthService.js";

const destinations = [
    {name: 'login', path: '/login', valid: true},
    {name: 'register', path: '/register', valid: true},
    {name: 'allusers', path: '/allusers', valid: true},
    {name: 'user page', path: '/user', valid: true},
]


export const UserStuff = () => {


    const [user, setUser] = useState(false);


    useEffect(() => {
        if (!isAuthenticated()) return;
        setUser(getCurrentUser())
    }, []);


    return (
        <>
            <br/>
            <div className={"flex flex-col items-center justify-center"}>
                <div>
                    {destinations.map((item) => (
                        // if item.valid is true, render the button
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
                <div className={"flex-none"}>

                </div>
                <br/>
                <div>
                    {isAuthenticated() ? (
                        <div className={"flex flex-col"}>
                            <p>you are logged in</p>
                            <Link to={`/user/${user.id}`}
                                  className={'flex flex-col text-black bg-gray-200 hover:text-white hover:bg-black'}
                            >My profile</Link>
                            <UserLogout/>
                        </div>
                    ) : (
                        <p>you are NOT logged in</p>
                    )}
                </div>
            </div>
        </>
    )
}