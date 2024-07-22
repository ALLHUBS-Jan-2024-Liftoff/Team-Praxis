import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const BarkBookRegistration = () => {

    let navigate=useNavigate();

    const [username, setusernameReg] = useState("")
    const handleUserNameCreate = e => setusernameReg(e.target.value);
    const [password, setPasswordReg] = useState("")
    const handlePasswordCreate = e => setPasswordReg(e.target.value)
    const [confirm, setPasswordConfirmReg] = useState("")
    const handlePasswordConfirmReg = e => setPasswordConfirmReg(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault();
        const val = {
            username,
            password,
        };
        await axios.post(`http://localhost:8080/api/register`, val);
        navigate("/");

    }

  return (

    <div>
        <div>
            <div>
                    <h2>Bark Book Registration</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                        <input type="text" placeholder="Username *" value={username} onChange={handleUserNameCreate}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password *" value={password} onChange={handlePasswordCreate} />
                    </div>
                    <div className='mb-3'>
                        <input type="password" placeholder="Confirm Password *" value={confirm} onChange={handlePasswordConfirmReg} />
                    </div>
                    <div className='mb-3'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Register" />
                    </div>
                    {/* <div> */}
                        <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" value="Cancel" to="/" />
                    {/* </div> */}
                </form>
            </div>
        </div>
        {/* Comment or UnComment Following Line If Space Is Needed */}
        <br /><br /><br />
    </div>

  )
}

export default BarkBookRegistration