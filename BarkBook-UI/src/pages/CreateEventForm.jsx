import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createNewEvent} from "../service/EventService";
import {SavePlaces} from "./maps/SavePlaces.jsx";
import {createPlace} from "../service/PlaceService.js";


const CreateEventForm = () => {

    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [chosenPlace, setChosenPlace] = useState(null);

    const handleName = e => setName(e.target.value);
    const handleDate = e => setDate(e.target.value);
    const handleDescription = e => setDescription(e.target.value);
    const handleLocationChoice = (placeObj) => {
        setChosenPlace(placeObj);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!chosenPlace) return;

        createPlace(chosenPlace)
            .then((savedPlace) => {
                return createNewEvent(name, date, description, savedPlace.id);
            })
            .then(savedEvent => {
                if (savedEvent) {
                    navigate(`/event/details/${savedEvent.id}`);
                }
            })
            .catch((error) => {
                console.log("Error submitting form", error);
            });
    };

    return (
        <div className="w-full">
            <section className="w-full bg-primary py-20 px-4 md:px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl font-bold text-primary-foreground sm:text-5xl">Unleash the Fun at Our Dog
                        Meetup</h1>
                    <p className="mt-4 text-lg text-primary-foreground">
                        Join fellow dog lovers for a day of play, socializing, and making new furry friends.
                    </p>
                </div>
            </section>

            <h1 className="text-2xl font-semibold leading-7 flex justify-center">
                Create A New Event
            </h1>
            <div className="border-b border-gray-900/10 pb-12 flex justify-center">
                <div className="mt-10 inline-flex gap-x-20 gap-y-8">
                    <form onSubmit={onSubmit}>
                        <div className="flex-col ">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Event Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={handleName}
                                className="block rounded-md border-2"
                                placeholder="Enter text here..."
                            >
                            </input>
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Event Date & Time
                            </label>
                            <input
                                id="date"
                                name="date"
                                type="datetime-local"
                                value={date}
                                onChange={handleDate}
                                className="block rounded-md border-2"
                            >
                            </input>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={handleDescription}
                                rows={4}
                                cols={35}
                                className="block rounded-md border-2"
                                placeholder="Enter text here..."
                            />
                            <div className="flex items-center my-5">
                                <div className={"p-1"}>
                                    <button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 inline-flex rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="p-1">
                                    <Link
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 inline-flex rounded"
                                        to={"/user"}
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>
                        {chosenPlace ?
                            (<>
                                <h2 className={"font-bold"}>Chosen Location: </h2>
                                <div className={"w-auto p-1"}>
                                    <span>{chosenPlace.displayName}<br/>{chosenPlace.formattedAddress}</span>
                                    <br/>
                                </div>
                            </>) : (<h2 className={"font-bold"}>Choose a Location</h2>)}
                        <SavePlaces onLocationChoice={handleLocationChoice}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEventForm;
