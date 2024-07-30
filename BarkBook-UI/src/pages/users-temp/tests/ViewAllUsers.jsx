import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {getAllUsers, deleteUserById} from '/src/api/UserAPI.js';

export default function ViewAllUsers() {

    const [users, setUsers] = useState([])

    useEffect(()=> {
        const getUsers = async() => {
            const result = await getAllUsers();
            setUsers(result)
        }
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        await deleteUserById(id);
        window.location.reload();
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
                    <tr key={index}>
                    <th key={index}>{index+1}</th>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>
                        <Link className='mr-3' to={`/viewuser/${user.id}`} >View</Link>
                        <Link className='mr-3' to={`/edituser/${user.id}`}>Edit</Link>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
  )
}