import {useEffect, useState} from 'react';
import {useNavigate, Link, useParams, Navigate} from 'react-router-dom';
import {deleteUserById, getUserById, updateUserById} from "../../service/UserService.js";
import {useAuth} from "../../AuthContext.jsx";
import {usePageOwnership} from "../../service/AuthService.js";

const UserEdit = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const {logout} = useAuth();
    const {ownership, loading} = usePageOwnership(id);

    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");

    const handleDisplayName = e => setDisplayName(e.target.value);
    const handleCurrentPassword = e => setCurrentPassword(e.target.value);
    const handleChangePassword = e => {
        setChangePassword(e.target.checked);
        setNewPassword("");
        setVerifyNewPassword("");
    }
    const handleNewPassword = e => setNewPassword(e.target.value);
    const handleVerify = e => setVerifyNewPassword(e.target.value);

    useEffect(() => {
        const getUser = async () => {
            const result = await getUserById(id);
            setDisplayName(result.displayName);
            setEmail(result.email);
        }
        getUser();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!currentPassword.length > 0) {
            window.alert("Must enter 'Current Password'")
            return;
        }
        if (changePassword && newPassword !== verifyNewPassword) {
            window.alert("'New Password' and 'Verify' must match")
            return;
        }
        const confirmed = window.confirm("Are you sure you want to update your account?");
        if (confirmed) {
            await updateUserById(id, displayName, currentPassword, newPassword, verifyNewPassword); // returns user object
            navigate(`/user/${id}`);
        }
    }

    const deleteUser = async (id) => {
        const confirmed = window.confirm("Are you sure you want to PERMANENTLY DELETE your account? This action cannot be undone.")
        if (confirmed) {
            await deleteUserById(id);
            await logout();
        }
    };

    if (loading) return <p>Loading...</p>

    return (
        <>
            {ownership ? (
                <div className={"flex flex-col items-center h-auto w-auto p-4"}>
                    <h2 className={"font-bold p-2"}>Edit your account:
                        <span className={"font-normal"}> {email}</span>
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className={"grid grid-cols-1 border border-amber-400 rounded-lg p-4 bg-amber-100"}>
                            <div className={"flex flex-col items-center p-2"}>
                                <label htmlFor={"displayName"} className={"text-black"}>New Display Name</label>
                                <input type="text" value={displayName} id={"displayName"}
                                       className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}
                                       onChange={handleDisplayName}/>
                            </div>
                            <div className={"flex flex-col items-center p-2"}>
                                <label htmlFor={"currentPassword"} className={"text-black"}>Current Password</label>
                                <input type="password" id={"currentPassword"}
                                       className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}
                                       onChange={handleCurrentPassword}/>
                            </div>

                            <div className={"flex flex-row justify-center p-2"}>
                                <input type={"checkbox"} id={"changePassword"} className={"px-2"}
                                       onClick={handleChangePassword}/>
                                <label htmlFor={"changePassword"} className={"text-black px-2"}>Change
                                    Password?</label>
                            </div>

                            {changePassword ? (
                                <>
                                    <div className={"flex flex-col items-center p-2"}>
                                        <label htmlFor={"newPassword"} className={"text-black"}>New Password</label>
                                        <input type="password" id={"newPassword"}
                                               className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}
                                               onChange={handleNewPassword}/>
                                    </div>
                                    <div className={"flex flex-col items-center p-2"}>
                                        <label htmlFor={"verifyNewPassword"} className={"text-black"}>Verify New
                                            Password</label>
                                        <input type="password" id={"verifyNewPassword"}
                                               className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}
                                               onChange={handleVerify}/>
                                    </div>
                                </>
                            ) : (<></>)}

                            <div className={"flex flex-col items-center p-2"}>
                                <button
                                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                                    type="submit" value="Submit">Submit
                                </button>
                            </div>
                        </div>
                        <div className={"flex flex-col items-center p-7"}>
                            <Link
                                className="bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-1 px-2 rounded-md"
                                to="/user">Cancel</Link>
                        </div>
                    </form>
                    <div className={"flex flex-col items-center"}>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-1 px-2 rounded-md"
                            onClick={() => deleteUser(id)}
                        >DELETE ACCOUNT
                        </button>
                    </div>
                </div>
            ) : (
                <Navigate to={"/user"}/>
            )}
        </>
    )
}

export default UserEdit