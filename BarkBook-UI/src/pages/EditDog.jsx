import { useEffect,useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDogById, updateDogById } from '../service/DogService';

export default function EditDog() {

    let navigate = useNavigate();

    const { id } = useParams()

    const [dogName, setDogName] = useState("");
    const [dogAge, setDogAge] = useState("");
    const [breed, setBreed] = useState("");
    const [weight, setWeight] = useState("");

    const handleDogName = e => setDogName(e.target.value);
    const handleDogAge = e => setDogAge(e.target.value);
    const handleBreed = e => setBreed(e.target.value);
    const handleWeight = e => setWeight(e.target.value);

    useEffect(() => {
        const loadDog = async () => {
            const result = await getDogById(id);
            setDogName(result.dogName);
            setDogAge(result.dogAge);
            setBreed(result.breed);
            setWeight(result.weight);
        }
        loadDog();
      }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
          await updateDogById(id, dogName, dogAge, breed, weight)  // post the dog obj
          navigate(`/user`); // navigate back to /user after submission
    };

    return (
        <form onSubmit={onSubmit}>
            <h5 className="text-base font-semibold leading-7 flex justify-center text-2xl">
                Edit your dog information
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
                                onChange={handleDogName}  
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
                                onChange={handleDogAge}
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
                            <input
                                id="breed"
                                name="breed"
                                type="text"
                                value={breed}
                                onChange={handleBreed}
                                className="block rounded-md border-2"
                            >
                            </input>
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
                                onChange={handleWeight}
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
                    to={`/dog/details/${id}`}
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
