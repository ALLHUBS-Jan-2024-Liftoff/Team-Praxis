import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddDog() {
    let navigate = useNavigate();


    const [dog, setDog] = useState({
        dogName: '',
        dogAge: 0, // dogAge and weight initialize as integers, set them as 0
        breed: '',
        weight: 0,
    });

    const { dogName, dogAge, breed, weight } = dog;

    const onInput = (e) => {
        setDog({ ...dog, [e.target.name]: e.target.value }); // ... keeps on adding new object
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        try {
          await axios.post('http://localhost:8080/api/dog/add-dog', dog);  // post the dog obj
          navigate('/user'); // navigate back to /user after submission
        } catch (error) {
          console.error("Error submitting form:", error); // handle error 
        }
    };
  

    return (
        <form onSubmit={onSubmit}>
            <h5 className="text-base font-semibold leading-7 flex justify-center text-2xl">
                Enter your dog information
            </h5>
            <div className="border-b border-gray-900/10 pb-12 flex justify-center">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="dogName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Dog name
                        </label>
                        <div className="mt-2">
                            <input
                                id="dogName"
                                name="dogName"
                                type="text"
                                value={dogName}
                                onChange={onInput}  
                                className="block w-3/4 rounded-md border-2"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label
                            htmlFor="dogAge"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Age
                        </label>
                        <div className="mt-2">
                            <input
                                id="dogAge"
                                name="dogAge"
                                type="number"
                                value={dogAge}
                                onChange={onInput}
                                className="block w-1/2 rounded-md border-2"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label
                            htmlFor="breed"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Breed
                        </label>
                        <div className="mt-2">
                            <select
                                id="breed"
                                name="breed"
                                value={breed}
                                onChange={onInput}
                                className="block rounded-md border-2"
                            >
                                <option value = "">Select Breed</option>
                                <option value = "German Shepherd">German Shepherd</option>
                                <option value = "Bulldog">Bulldog</option>
                                <option value = "Golden Retriever">Golden Retriever</option>
                                <option value = "Beagle">Beagle</option>
                                <option value = "Corgi">Corgi</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label
                            htmlFor="weight"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Weight (Pounds)
                        </label>
                        <div className="mt-2">
                            <input
                                id="weight"
                                name="weight"
                                type="number"
                                value={weight}
                                onChange={onInput}
                                className="block w-1/2 rounded-md border-2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center my-5">
                <button
                    type="submit"
                    className="rounded-md bg-black px-5 py-4 text-sm font-semibold text-white hover:bg-blue-500"
                >
                    Save
                </button>
            </div>

            <div className="flex justify-center">
                <Link
                    className="rounded-md bg-black px-5 py-4 text-sm font-semibold text-white hover:bg-red-500"
                    to="/user"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
