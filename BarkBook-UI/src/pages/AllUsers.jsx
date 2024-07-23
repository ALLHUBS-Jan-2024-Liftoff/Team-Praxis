import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';

export default function AllUsers() {

    const [users, setUsers] = useState([])
    
    const { id } = useParams();

    useEffect(()=> {
        loadUsers();
    }, []);

    const loadUsers=async()=>{
        const result=await axios.get("http://localhost:8080/api/users")
        setUsers(result.data)
    }


    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/api/users/${id}`);
        loadUsers();
    };


  return (
    <div>

<table>
  <thead>
    <tr>
      <th>#</th>
      <th>ID#</th>
      <th>Username</th>
      <th>Password</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>

    {
        users.map((user, index)=>(
            <tr>
            <th key={index}>{index+1}</th>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>
                <Link className='mr-3' to={`/viewuser/${user.id}`} >View</Link>
                <Link className='mr-3' to={`/edituser/${user.id}`}>Edit</Link>
                <Link onClick={() => deleteUser(user.id)}>Delete</Link>
            </td>
            </tr>
        ))
    }


  </tbody>
</table>

    </div>
  )
}
