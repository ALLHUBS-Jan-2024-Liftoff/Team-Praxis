import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

const EditBarkBookReg = () => {

    let navigate=useNavigate();

    const {id} = useParams()

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
        await axios.put(`http://localhost:8080/api/user/${id}`, val);
        navigate("/");
    }

        useEffect(() => {
            loadUser();
        }, [])

    const loadUser = async () => {
        const result=await axios.get(`http://localhost:8080/api/user/${id}`)
        setusernameReg(result.data.username);
        setPasswordReg(result.data.password);
    }


  return (

    <div>
        <div>
            <div>
                    <h2>Edit User Authorization</h2>
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Submit" />
                    </div>
                    {/* <div> */}
                        <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" value="Back to all Users" to="/allusers" />
                    {/* </div> */}
                </form>
            </div>
        </div>
        {/* Comment or UnComment Following Line If Space Is Needed */}
        <br /><br /><br />
    </div>

  )
}

export default EditBarkBookReg