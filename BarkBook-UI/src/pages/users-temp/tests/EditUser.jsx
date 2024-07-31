import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {getUserById, postNewUser, updateUserById} from "../../../api/UserAPI.js";

const EditUser = () => {

    let navigate= useNavigate();

    const {id} = useParams()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [verify, setVerify] = useState("")

    const handleUsername = e => setUsername(e.target.value);
    const handlePassword = e => setPassword(e.target.value)
    const handleVerify = e => setVerify(e.target.value)


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
        await updateUserById(username, password, id); // returns user object
        navigate("/");
    }

  return (

    <div>
        <div>
            <div>
                    <h2>Edit User Authorization</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                        <input type="text" placeholder="Username *" value={username} onChange={handleUsername}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password *" value={password} onChange={handlePassword} />
                    </div>
                    <div className='mb-3'>
                        <input type="password" placeholder="Confirm Password *" value={confirm} onChange={handleVerify} />
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
    </div>

  )
}

export default EditUser