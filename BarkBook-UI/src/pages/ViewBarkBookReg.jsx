import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewBarkBookReg = () => {


    const [username, setusernameReg] = useState("")
    // const handleUserNameCreate = e => setusernameReg(e.target.value);
    const [password, setPasswordReg] = useState("")
    // const handlePasswordCreate = e => setPasswordReg(e.target.value)

    const { id } = useParams();

    useEffect(() => {
        loadUser();
      }, []);

      const loadUser = async () => {
        const result=await axios.get(`http://localhost:8080/api/user/${id}`)
        setusernameReg(result.data.username);
        setPasswordReg(result.data.password);
    }





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

export default ViewBarkBookReg