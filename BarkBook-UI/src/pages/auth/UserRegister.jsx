import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {createNewUser} from "/src/service/AuthService.js";

const UserRegister = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")

    const handleEmail = e => setEmail(e.target.value);
    const handleDisplayName = e => setDisplayName(e.target.value);
    const handlePassword = e => setPassword(e.target.value)
    const handleVerify = e => setVerifyPassword(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault();
        await createNewUser(email, displayName, password, verifyPassword); // returns user object
        navigate("/login");
    }

    return (
        <>
            <div className={"flex flex-col items-center h-auto w-auto p-4"}>
                <h2 className={"font-bold p-2"}>Sign up to BarkBook</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className={"grid grid-cols-1 border border-amber-400 rounded-lg p-4 bg-amber-100"}>

                        <div className={"flex flex-col items-center p-2"}>
                            <label htmlFor={email} className={"text-black"}>Email</label>
                            <input type="text" value={email} id={"email"}
                                   onChange={handleEmail}
                                   className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}/>
                        </div>

                        <div className={"flex flex-col items-center p-2"}>
                            <label htmlFor={"displayName"} className={"text-black"}>Display Name</label>
                            <input type="text" value={displayName} onChange={handleDisplayName}
                                   id={"displayName"}
                                   className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}/>
                        </div>

                        <div className={"flex flex-col items-center p-2"}>
                            <label htmlFor={"password"} className={"text-black"}>Password</label>
                            <input type="password" value={password} onChange={handlePassword}
                                   id={"password"}
                                   className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}/>
                        </div>

                        <div className={"flex flex-col items-center p-2"}>
                            <label htmlFor={"verify"} className={"text-black"}>Verify Password</label>
                            <input type="password" value={verifyPassword} id={"verify"}
                                   onChange={handleVerify}
                                   className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}/>
                        </div>

                        <div className='flex flex-col items-center p-2'>
                            <button
                                className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded"
                                type="submit" value="Register">Register
                            </button>
                        </div>
                    </div>
                </form>
                <div className={"flex items-center p-2"}>
                    <label className={"text-sm text-gray-600 p-2"} htmlFor={"login"}>Already have an account? </label>
                    <Link
                        className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm py-1 px-2 rounded-md"
                        value="login" id={"login"}
                        to="/login">Sign in</Link>
                </div>
            </div>
        </>
    )
}

export default UserRegister