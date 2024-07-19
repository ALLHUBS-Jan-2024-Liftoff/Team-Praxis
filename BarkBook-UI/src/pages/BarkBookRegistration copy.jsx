import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const BarkBookRegistration = () => {

    let navigate=useNavigate();

    const [usernameReg, setusernameReg] = useState("")
    const handleUserNameCreate = e => setusernameReg(e.target.value);
    const [passwordReg, setPasswordReg] = useState("")
    const handlePasswordCreate = e => setPasswordReg(e.target.value)
    const [passwordConfirmReg, setPasswordConfirmReg] = useState("")
    const handlePasswordConfirmReg = e => setPasswordConfirmReg(e.target.value)

    // const [userAuth, setuserAuth] = useState({
    //                                     username:"", 
    //                                     password:"",
    //                                     confirm:""
    //                                 });
    
    // const { username, password, confirm } = userAuth;

    // const onInputChange=(e)=> {
    //     // setuserAuth({[e.target.username]: e.target.value}, {[e.target.password]: e.target.value}, {[e.target.confirm]: e.target.value})
    //     setuserAuth({ ...userAuth, [e.target.username]: e.target.value})
    // }

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     await axios.post("http://localhost:8080/api/register", userAuth);
    //     navigate("/");

    // }

  return (

    <div>
        <div>
            <div>
                    <h2>Bark Book Registration</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                        <input type="text" placeholder="Username *" value={usernameReg} onChange={handleUserNameCreate}/>
                        {/* <input type={"text"} placeholder="Username *" name="username" value={username} onChange={(e) => onInputChange(e)}/> */}
                    </div>
                    <div>
                        <input type="password" placeholder="Password *" value={passwordReg} onChange={handlePasswordCreate} />
                        {/* <input type={"password"} placeholder="Password *" name="password" value={password} onChange={(e) => onInputChange(e)} /> */}
                    </div>
                    <div className='mb-3'>
                        <input type="password" placeholder="Confirm Password *" value={passwordConfirmReg} onChange={handlePasswordConfirmReg} />
                        {/* <input type={"password"} placeholder="Confirm Password *" name="confirm" value={confirm} onChange={(e) => onInputChange(e)} /> */}
                    </div>
                    <div className='mb-3'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Register" />
                    </div>
                    {/* <div className='mb-3'>
                        <input type="submit" value="Login" />
                    </div> */}
                    {/* <div> */}
                        {/* <input type="submit" value="Cancel" /> */}
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