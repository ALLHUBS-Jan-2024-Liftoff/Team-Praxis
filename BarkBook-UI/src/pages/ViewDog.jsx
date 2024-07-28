import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewDog() {

    const [dog, setDog] = useState({
        dogName: '',
        dogAge: 0, // dogAge and weight initialize as integers, set them as 0
        breed: '',
        weight: 0,
    });

    const { id } = useParams(); // get specific data by id


    // load data
    useEffect(() => {
        loadDog();
      }, []);

      const loadDog = async () => {
        const result=await axios.get(`http://localhost:8080/user/dog/${id}`)
        setDog(result.data)
    }

    // delete dog data, window pops up first
    const deleteDog = async (id) => {
        if (confirmDelete()){
        await axios.delete(`http://localhost:8080/user/dog/${id}`);
        loadDog();
        }
    };

    // window pops up after hitting delete
    function confirmDelete () {
        return window.confirm("Are you sure you want to delete this dog?");
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border round p-4 mt-2 shadow'>
                    <h1 className='text-center text-2xl'>Dog Details</h1>

                    <div className='card'>
                        <div className='card-header'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {dog.dogName}
                                </li>
                                <li className='list-group-item'>
                                    <b>Age: </b>
                                    {dog.dogAge}                                    
                                </li>
                                <li className='list-group-item'>
                                    <b>Breed: </b>
                                    {dog.breed}                                    
                                </li>
                                <li className='list-group-item'>
                                    <b>Weight (Pounds): </b>
                                    {dog.weight}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                    <Link 
                    className='btn btn-primary my-2 rounded-md bg-black px-5 py-4 text-sm font-semibold text-white hover:bg-blue-500' 
                    to={"/user"}>
                        Back to user
                    </Link>
                    </div>

                    <div className='flex justify-center'>
                    <Link className='btn my-2 rounded-md bg-black px-5 py-4 text-sm font-semibold text-white hover:bg-green-500'
                    to={`/user/edit-dog/${dog.id}`}>
                        Edit
                        </Link>
                    </div>

                    <div className='flex justify-center'>
                    <Link className='btn my-2 rounded-md bg-black px-5 py-4 text-sm font-semibold text-white hover:bg-red-500' 
                    onClick={() => deleteDog(dog.id)} 
                    to="/user">
                        Delete
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}