import {useState} from "react"
import {useAuth} from "../../AuthContext.jsx";
import {Link} from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = e => setEmail(e.target.value);
    const handlePassword = e => setPassword(e.target.value)

    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        window.location.href = "/";
    }

    return (
        <>
            <div className="flex flex-col items-center h-auto w-auto p-4">
                <h2 className={"font-bold p-2 text-black"}>Sign in to BarkBook</h2>
                <form onSubmit={handleSubmit}>
                    <div className={"grid grid-cols-1 border border-amber-400 rounded-lg p-4 bg-amber-100"}>
                        <div className={"flex flex-col items-center p-2"}>
                            <label className={"text-black"}>Email</label>
                            <input
                                type="email"
                                className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}
                                value={email}
                                onChange={handleEmail}
                                required
                            />
                        </div>
                        <div className={"flex flex-col items-center p-2"}>
                            <label className={"text-black"}>Password</label>
                            <input
                                type="password"
                                className={"p-2 border-2 border-amber-400 rounded-md bg-white text-black focus:outline-none focus:border-amber-500"}
                                value={password}
                                onChange={handlePassword}
                                required
                            />
                        </div>
                        <div className='flex flex-col items-center p-2'>
                            <button type="submit"
                                    className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded">
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
                <div className={"flex items-center p-2"}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <label className={"text-sm text-gray-600 p-2"} htmlFor={"login"}>Don't have an account yet?</label>
                    <Link
                        className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm py-1 px-2 rounded-md"
                        value="login" id={"login"}
                        to="/register">Sign up</Link>
                </div>
            </div>
        </>
    );
}
export default UserLogin;