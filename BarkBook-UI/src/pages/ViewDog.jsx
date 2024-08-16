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
        <div>
            <div className='p-4 mt-2'>
                <div className='border rounded-lg p-4 mt-2 shadow-md'>
                    <h1 className='text-center text-3xl font-bold text-primary-foreground sm:text-5xl'>Dog Details</h1>

                    <div className='text-center p-7'>
                        <div className='card-header'>
                            <ul className='text-lg'>
                                <li className=''>
                                    <b>Name: </b>
                                    {dogName}
                                </li>
                                <li className=''>
                                    <b>Age: </b>
                                    {dogAge}                                    
                                </li>
                                <li className=''>
                                    <b>Breed: </b>
                                    {breed}                                    
                                </li>
                                <li className=''>
                                    <b>Weight (Pounds): </b>
                                    {weight}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex space-x-3 justify-center'>
                        <Link 
                            className='my-2 rounded-md bg-blue-500 hover:bg-blue-900 px-3 py-3 text-sm font-semibold text-white' 
                            to={"/user"}
                        >
                                Back to user
                        </Link>

                        <Link 
                            className='my-2 rounded-md bg-green-500 hover:bg-green-900 px-3 py-3 text-sm font-semibold text-white '
                            to={`/dog/edit/${id}`}
                        >
                                Edit
                        </Link>

                        <Link 
                            className='my-2 rounded-md bg-red-500 hover:bg-red-900 px-3 py-3 text-sm font-semibold text-white ' 
                            onClick={() => deleteDog(id)} 
                            to="/user"
                        >
                                Delete
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center p-3">Cute dog photo here :)</div>
        </div>
    )
}