import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getEventById, deleteEventById, addUserToEvent} from '../service/EventService';
import {getCurrentUser} from '../service/AuthService';
import {ViewSinglePlace} from "./maps/ViewSinglePlace.jsx";


export default function ViewEvent() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState(null);
    const [creator, setCreator] = useState(null);
    const [attendees, setAttendees] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserIsCreator, setCurrentUserIsCreator] = useState(false);


    useEffect(() => {
        getEventById(id).then((result) => {
            setEventData(result);
        }).catch((error) => {
            console.error(error);
        });

        const userData = getCurrentUser();
        setCurrentUser(userData);

    }, [id]);

    useEffect(() => {
        if (!eventData) return;

        setName(eventData.event.name);
        setDate(eventData.event.date);
        setDescription(eventData.event.description);
        setPlace(eventData.place);
        setCreator(eventData.creator);
        setAttendees(eventData.attendees);
    }, [eventData, creator])


    useEffect(() => {
        if (!place || !currentUser || !creator) return;
        if (currentUser.id === creator.id) {
            setCurrentUserIsCreator(true);
        }
        setLoading(false);
    }, [place, currentUser, creator]);


    //delete event data, window pops up first to confirm
    const deleteEvent = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this event? This cannot be undone.'
        );
        if (confirmed) {
            await deleteEventById(id);
            navigate("/user");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    // user is able to attend event
    const attendEvent = async () => {
        try {
            await addUserToEvent(id, currentUser.id);
            alert("You're signed up");
            window.location.reload();
        } catch (error) {
            console.log('Signup error', error);
        }
    };

    if (loading) return <p>Loading... </p>;
    return (
        <div>
            <div className="p-4 mt-2">
                <div className="border rounded-lg p-4 mt-2 shadow-md">
                    <h1 className="text-center text-3xl font-bold text-primary-foreground sm:text-5xl">
                        Event Details
                    </h1>
                    <div className={"grid grid-cols-1 gap-4 "}>
                        <div className={"p-5"}>
                            <ul className="text-lg text-center">
                                <li className="">
                                    <b>Name: </b>
                                    {name}
                                </li>
                                <li className="list-group-item">
                                    <b>Date: </b>
                                    {formatDate(date)}
                                </li>
                                <li className="list-group-item">
                                    <b>Description: </b>
                                    {description}
                                </li>
                                <li className="list-group-item">
                                    <b>Creator: </b>
                                    <Link to={`/user/${creator.id}`}
                                          className={"text-blue-500 underline"}
                                    >{creator.displayName}</Link>
                                </li>
                                <li className="list-group-item">
                                    <b>Attendees: </b>
                                    {attendees.length > 0 ?
                                        (<>
                                            {attendees.map((attendee, index) => (
                                                <Link key={index}
                                                      to={`/user/${attendee.id}`}
                                                      className={"text-blue-500 underline p-1"}
                                                >{attendee.displayName}</Link>
                                            ))}
                                        </>) : (<span>None yet! Sign up now!</span>)
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex space-x-3 justify-center">
                        <Link
                            className="my-2 rounded-md bg-blue-500 hover:bg-blue-900 px-3 py-3 text-sm font-semibold text-white"
                            to={'/'}
                        >
                            Back
                        </Link>

                        {currentUserIsCreator ?
                            (
                                <>
                                    <Link
                                        className="my-2 rounded-md bg-green-500 hover:bg-green-900 px-3 py-3 text-sm font-semibold text-white "
                                        to={`/event/edit/${id}`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="my-2 rounded-md bg-red-500 hover:bg-red-900 px-3 py-3 text-sm font-semibold text-white "
                                        onClick={() => deleteEvent(id)}
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (<></>)
                        }

                        <button
                            className="my-2 rounded-md bg-purple-500 hover:bg-purple-900 px-3 py-3 text-sm font-semibold text-white "
                            onClick={() => attendEvent()}
                        >
                            Attend
                        </button>
                    </div>
                </div>

                <div className={"grid justify-center p-5"}>
                    <div className={"w-auto p-1"}>
                        <h2 className={"font-bold"}>Current Event Location: </h2>
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
                    <div>
                        <ViewSinglePlace place={place}/>
                    </div>
                </div>
            </div>


        </div>
    );
}
