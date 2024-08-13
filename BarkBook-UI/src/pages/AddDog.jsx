import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createNewDog } from '../service/DogService';


export default function AddDog() {
    let navigate = useNavigate();

    const [dogName, setDogName] = useState('');
    const [dogAge, setDogAge] = useState('');
    const [breed, setBreed] = useState('');
    const [weight, setWeight] = useState('');

    // const [image, setImage] = useState(null);

    const handleDogName = (e) => setDogName(e.target.value);
    const handleDogAge = (e) => setDogAge(e.target.value);
    const handleBreed = (e) => setBreed(e.target.value);
    const handleWeight = (e) => setWeight(e.target.value);

    // target.files is specfically for file types
    // const handleImage = e => setImage(e.target.files[0]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // NEED TO ADD IMAGES HERE
            // const result = await uploadImage(image);
            // setUploadStatus(result);
            await createNewDog(dogName, dogAge, breed, weight); // post the dog obj
            navigate(`/user`); // navigate back to /user after submission
        } catch (error) {
            console.error('Error submitting form:', error); // handle error
        }
    };

    return (
    <div>
        <section className="w-full bg-primary py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-primary-foreground sm:text-5xl">Add Your Furry Friend!</h1>
          <p className="mt-4 text-lg text-primary-foreground">
          Tell us about your dog!
          </p>
        </div>
      </section>
        <form onSubmit={onSubmit}>
            <h5 className="text-base font-semibold leading-7 flex justify-center text-2xl">
                Enter your dog information
            </h5>
            <div className="border-b border-gray-900/10 pb-12 flex justify-center">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* <div className="col-span-full">
                        <label
                            htmlFor="dogImage"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Upload an image of your dog (only png/jpeg)
                        </label>
                        <div className="mt-2">
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/png, image/jpeg"
                                value={image}
                                onChange={handleImage}  
                                className="block w-3/4 rounded-md border-2"/>
                        </div>
                    </div> */}

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
                            ></input>
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
                    to="/user"
                >
                    Cancel
                </Link>
            </div>
        </form>
    </div>
    );
}
