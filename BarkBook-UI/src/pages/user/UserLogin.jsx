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
                <h2 className={"font-bold p-2 text-gray-900"}>Sign in to BarkBook</h2>
                <form onSubmit={handleSubmit}>
                    <div className={"grid grid-cols-1 border border-gray-400 rounded-lg p-4 bg-slate-700"}>
                        <div className={"flex flex-col items-center p-2"}>
                            <label className={"text-gray-200"}>Email</label>
                            <input
                                type="email"
                                className={"p-2 border-0 border-slate-400 rounded-md bg-slate-900 text-gray-400 focus:outline-none"}
                                value={email}
                                onChange={handleEmail}
                                required
                            />
                        </div>
                        <div className={"flex flex-col items-center p-2"}>
                            <label className={"text-gray-200"}>Password</label>
                            <input
                                type="password"
                                className={"p-2 border-0 border-slate-400 rounded-md bg-slate-900 text-gray-400 focus:outline-none"}
                                value={password}
                                onChange={handlePassword}
                                required
                            />
                        </div>
                        <div className='flex flex-col items-center p-2'>
                            <button type="submit"
                                    className="bg-green-600 hover:bg-green-500 text-gray-200 font-bold py-2 px-4 rounded">
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
                <div className={"flex items-center p-2"}>
                    <label className={"text-sm text-gray-600 p-2"} htmlFor={"login"}>Don't have an account yet?</label>
                    <Link
                        className="bg-green-600 hover:bg-green-500 text-gray-100 font-bold text-sm py-1 px-2 rounded-md"
                        value="login" id={"login"}
                        to="/register">Sign up</Link>
                </div>
            </div>
        </>
    );
}
export default UserLogin;