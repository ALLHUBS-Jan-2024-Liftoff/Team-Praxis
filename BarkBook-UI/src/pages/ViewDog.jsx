import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDogById, deleteDogById } from "../service/DogService";

export default function ViewDog() {

    const { id } = useParams(); // get specific data by id

    const [dogName, setDogName] = useState("");
    const [dogAge, setDogAge] = useState("");
    const [breed, setBreed] = useState("");
    const [weight, setWeight] = useState("");

    const loadDog = async () => {
        const result = await getDogById(id);
        setDogName(result.dogName);
        setDogAge(result.dogAge);
        setBreed(result.breed);
        setWeight(result.weight);
    }

    useEffect(() => {
        loadDog();
    }, [id]);

    // delete dog data, window pops up first to confirm
    const deleteDog = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this dog? This cannot be undone.");
        if (confirmed) {
            await deleteDogById(id);
            loadDog();
        }
    };

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
                                    {dogName}
                                </li>
                                <li className='list-group-item'>
                                    <b>Age: </b>
                                    {dogAge}                                    
                                </li>
                                <li className='list-group-item'>
                                    <b>Breed: </b>
                                    {breed}                                    
                                </li>
                                <li className='list-group-item'>
                                    <b>Weight (Pounds): </b>
                                    {weight}
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
                            to={`/dog/edit/${id}`}>
                                Edit
                        </Link>
                    </div>

                    <div className='flex justify-center'>
                        <Link className='btn my-2 rounded-md bg-black px-5 py-4 text-sm font-semibold text-white hover:bg-red-500' 
                            onClick={() => deleteDog(id)} 
                            to="/user">
                                Delete
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}