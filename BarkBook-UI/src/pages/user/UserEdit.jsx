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
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");

    const handleDisplayName = e => setDisplayName(e.target.value);
    const handleCurrentPassword = e => setCurrentPassword(e.target.value);
    const handleNewPassword = e => setNewPassword(e.target.value);
    const handleVerify = e => setVerifyNewPassword(e.target.value);

    useEffect(() => {
        const getUser = async () => {
            const result = await getUserById(id);
            setDisplayName(result.displayName);
            setEmail(result.email);
        }
        getUser();
    }, [id, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!newPassword.length > 0) {
            window.alert("Password cannot be blank")
        } else {
            const confirmed = window.confirm("Are you sure you want to update your account?");
            if (confirmed) {
                await updateUserById(id, displayName, currentPassword, newPassword, verifyNewPassword); // returns user object
                navigate(`/user/${id}`);
            }
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
                        <div className={"grid grid-cols-1 border border-gray-400 rounded-lg p-4 bg-slate-700"}>
                            <div className={"flex flex-col items-center p-2"}>
                                <label htmlFor={"displayName"} className={"text-gray-200"}>New Display Name</label>
                                <input type="text" value={displayName} id={"displayName"}
                                       className={"p-2 border-0 border-slate-400 rounded-md bg-slate-900 text-gray-400 focus:outline-none"}
                                       onChange={handleDisplayName}/>
                            </div>
                            <div className={"flex flex-col items-center p-2"}>
                                <label htmlFor={"currentPassword"} className={"text-gray-200"}>Current Password</label>
                                <input type="password" id={"currentPassword"}
                                       className={"p-2 border-0 border-slate-400 rounded-md bg-slate-900 text-gray-400 focus:outline-none"}
                                       onChange={handleCurrentPassword}/>
                            </div>
                            <div className={"flex flex-col items-center p-2"}>
                                <label htmlFor={"newPassword"} className={"text-gray-200"}>New Password</label>
                                <input type="password" id={"newPassword"}
                                       className={"p-2 border-0 border-slate-400 rounded-md bg-slate-900 text-gray-400 focus:outline-none"}
                                       onChange={handleNewPassword}/>
                            </div>
                            <div className={"flex flex-col items-center p-2"}>
                                <label htmlFor={"verifyNewPassword"} className={"text-gray-200"}>Verify New Password</label>
                                <input type="password" id={"verifyNewPassword"}
                                       className={"p-2 border-0 border-slate-400 rounded-md bg-slate-900 text-gray-400 focus:outline-none"}
                                       onChange={handleVerify}/>
                            </div>
                            <div className={"flex flex-col items-center p-2"}>
                                <button
                                    className="bg-green-600 hover:bg-green-500 text-gray-200 font-bold py-2 px-4 rounded"
                                    type="submit" value="Submit">Submit
                                </button>
                            </div>
                        </div>
                        <div className={"flex flex-col items-center p-7"}>
                            <Link
                                className="bg-red-700 hover:bg-red-600 text-gray-100 font-bold text-sm py-1 px-2 rounded-md"
                                to="/allusers">Cancel</Link>
                        </div>
                    </form>
                    <div className={"flex flex-col items-center p-16"}>
                        <button
                            className="bg-red-700 hover:bg-red-600 text-gray-100 font-bold text-sm py-1 px-2 rounded-md"
                            onClick={() => deleteUser(id)}
                        >DELETE ACCOUNT
                        </button>
                    </div>
                </div>
            ) : (
                <Navigate to={"/"}/>
            )}
        </>
    )
}

export default UserEdit