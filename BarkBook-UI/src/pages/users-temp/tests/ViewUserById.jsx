import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import {getUserById} from "/src/api/UserAPI.js";


const ViewUserById = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { id } = useParams();

    // could convert to try/catch/finally, so it looks cleaner
    useEffect(() => {
        const getUser = async () => {
            const result = await getUserById(id);
            setUsername(result.username);
            setPassword(result.password);
        }
        getUser();
    }, [id]);

  return (
    <div>
        <div>
            <div>
                    <h2>View Book User Registration</h2>
                    <div>
                        <div>
                            Details of User ID: {id}
                            <ul>
                                <li>
                                    <b>Username: </b>
                                    {username}
                                </li>
                                <li>
                                    <b>Password: </b>
                                    {password}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to={"/allusers"}>Back To all Users</Link>
            </div>
        </div>
    </div>
  )
}

export default ViewUserById