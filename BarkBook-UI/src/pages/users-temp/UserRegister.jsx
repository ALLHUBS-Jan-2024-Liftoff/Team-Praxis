import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {postNewUser} from "/src/api/UserAPI.js";

const UserRegister = () => {

    let navigate= useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [verify, setVerify] = useState("")

    const handleUsername = e => setUsername(e.target.value);
    const handlePassword = e => setPassword(e.target.value)
    const handleVerify = e => setVerify(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault();
        await postNewUser(username, password); // returns user object
        navigate("/");
    }

  return (
      <>
          <h2>Bark Book Registration</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div>
                <input type="text" placeholder="Username *" value={username} onChange={handleUsername}/>
            </div>
            <div>
                <input type="password" placeholder="Password *" value={password} onChange={handlePassword} />
            </div>
            <div className='mb-3'>
                <input type="password" placeholder="Confirm Password *" value={verify} onChange={handleVerify} />
            </div>
            <div className='mb-3'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Register">Register</button>
            </div>
                <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" value="Cancel" to="/">Cancel</Link>
        </form>
      </>

  )
}

export default UserRegister