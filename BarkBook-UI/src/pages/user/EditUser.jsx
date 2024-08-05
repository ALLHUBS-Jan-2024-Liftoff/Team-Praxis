import {useEffect, useState} from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import {deleteUserById, getUserById, updateUserById} from "../../service/UserService.js";
import {useAuth} from "../../AuthContext.jsx";

const EditUser = () => {

    let navigate = useNavigate();
    const {id} = useParams();
    const {logout} = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const handleUsername = e => setUsername(e.target.value);
    const handlePassword = e => setPassword(e.target.value);
    const handleVerify = e => setVerifyPassword(e.target.value);

    useEffect(() => {
        const getUser = async () => {
            const result = await getUserById(id);
            setUsername(result.username);
            setPassword(result.password);
        }
        getUser();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Are you sure you want to update your account?");
        if (confirmed) {
            await updateUserById(id, username, password, verifyPassword); // returns user object
            navigate("/");
        }
    }

    const deleteUser = async (id) => {
        const confirmed = window.confirm("Are you sure you want to PERMANENTLY DELETE your account? This action cannot be undone.")
        if (confirmed) {
            await deleteUserById(id);
            await logout();
        }
    };

    return (
        <>
            <div className={"flex flex-col items-center h-auto w-auto p-4"}>
                <h2 className={"font-bold p-2"}>Edit your account</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className={"grid grid-cols-1 border border-gray-400 rounded-lg p-4 bg-slate-700"}>
                        <div className={"flex flex-col items-center p-2"}>
                            <label htmlFor={"username"} className={"text-gray-200"}>New Username</label>
                            <input type="text" value={username} id={"username"}
                                   className={"p-2 border-0 border-slate-400 rounded-md bg-slate-900 text-gray-400 focus:outline-none"}
                                   onChange={handleUsername}/>
                        </div>
                        <div className={"flex flex-col items-center p-2"}>
                            <label htmlFor={"password"} className={"text-gray-200"}>New Password</label>
                            <input type="password" id={"password"}
                                   className={"p-2 border-0 border-slate-400 rounded-md bg-slate-900 text-gray-400 focus:outline-none"}
                                   onChange={handlePassword}/>
                        </div>
                        <div className={"flex flex-col items-center p-2"}>
                            <label htmlFor={"verify"} className={"text-gray-200"}>Verify Password</label>
                            <input type="password" id={"verify"}
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
        </>

    )
}

export default EditUser