import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getEventById, updateEventById} from "../service/EventService";
import {SavePlaces} from "./maps/SavePlaces.jsx";
import {ViewSinglePlace} from "./maps/ViewSinglePlace.jsx";
import {Switch} from "@headlessui/react";
import {createPlace} from "../service/PlaceService.js";

const EditEvent = () => {

    let navigate = useNavigate();

    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [place, setPlace] = useState(null);

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const [viewCurrent, setViewCurrent] = useState(false);
    const [viewNew, setViewNew] = useState(false);
    const [chosenPlace, setChosenPlace] = useState(null);

    const handleName = e => setName(e.target.value);
    const handleDate = e => setDate(e.target.value);
    const handleDescription = e => setDescription(e.target.value);

    const handleLocationChoice = (placeObj) => {
        setChosenPlace(placeObj);
    };

    const handleViewCurrent = () => {
        if (viewNew) setViewNew(false);
        setViewCurrent(!viewCurrent)
    };

    const handleViewNew = () => {
        if (viewCurrent) setViewCurrent(false);
        setViewNew(!viewNew);
    };

    useEffect(() => {
        if (event && place) return;

        getEventById(id).then((result) => {
            setEvent(result.event);
            setPlace(result.place);
        }).catch((err) => {
            console.error(err);
        });

    }, [id, event, place]);

    useEffect(() => {
        if (!event || !place) return;

        setName(event.name);
        setDate(event.date);
        setDescription(event.description);
        setLoading(false);

    }, [event, place]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (viewNew && chosenPlace) {
            console.log("got this far... ")
            createPlace(chosenPlace)
                .then((savedPlace) => {
                    console.log("got a place... ", savedPlace.id);
                    return updateEventById(id, name, date, description, savedPlace.id);
                })
                .then(result => {
                    console.log(result)
                    if (result.id) {
                        navigate(`/event/details/${result.id}`);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            updateEventById(id, name, date, description, null)
                .then((result) => {
                    console.log(result)
                    if (result.id) {
                        navigate(`/event/details/${result.id}`);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    if (loading) return <p>Loading... </p>;
    return (
        <>
            <h1 className="text-base font-semibold leading-7 flex justify-center">
                Update Your Event's Details
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
                        <h2 className={"font-bold"}>Current Event Location: </h2>
                        <div className={"w-auto p-1"}>
                            <div className={"flex items-center"}>
                                <div>
                                    <span>{place.displayName}<br/>{place.formattedAddress}</span>
                                </div>
                                <div className={"p-2"}>
                                    <Link target={"_blank"}
                                          to={place.googleMapsURI}
                                          className={"bg-blue-600 hover:bg-blue-700 text-white p-1 rounded inline-flex"}
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={"flex"}>
                            <Switch
                                checked={viewCurrent}
                                onChange={() => handleViewCurrent()}
                                className={`${viewCurrent ? 'bg-yellow-600' : 'bg-green-700'} 
                                relative inline-flex h-[19px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    className={`${viewCurrent ? 'translate-x-4' : 'translate-x-0'}
                                    pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                            <label htmlFor={"viewCurrent"}
                                   className="text-sm leading-6 text-gray-900 inline-flex p-1"
                            >View Current Event Location</label>
                        </div>
                        <Switch
                            checked={viewNew}
                            onChange={() => handleViewNew()}
                            className={`${viewNew ? 'bg-yellow-600' : 'bg-green-700'} 
                                relative inline-flex h-[19px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={`${viewNew ? 'translate-x-4' : 'translate-x-0'}
                                    pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                        <label htmlFor={"viewNew"}
                               className="text-sm leading-6 text-gray-900 inline-flex p-1"
                        >Select a New Location</label>
                        {viewCurrent ?
                            (<>
                                <ViewSinglePlace place={place}/>
                            </>) : (<></>)}
                        {viewNew ?
                            (<>
                                <p className={"text-sm italic"}>Unchecking the above toggle will keep your
                                    current location.</p>
                                <p className={"text-sm italic"}>Keeping the above toggle on will save your newly
                                    chosen location.</p>
                                {chosenPlace ?
                                    (<>
                                        <h2 className={"font-bold"}>Chosen Location: </h2>
                                        <div className={"w-auto p-1"}>
                                            <span>{chosenPlace.displayName}<br/>{chosenPlace.formattedAddress}</span>
                                            <br/>
                                        </div>
                                    </>) : (<h2 className={"font-bold"}>Choose a Location</h2>)}
                                <SavePlaces onLocationChoice={handleLocationChoice}/>
                            </>) : (<></>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditEvent;
