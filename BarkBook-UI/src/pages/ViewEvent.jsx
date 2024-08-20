import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getEventById, deleteEventById, addUserToEvent } from '../service/EventService';
import { getCurrentUser } from '../service/AuthService';


export default function ViewEvent() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [currentUser, setCurrentUser] = useState(null);

    const loadEvent = async () => {
        const result = await getEventById(id);
        setName(result.name);
        setLocation(result.location);
        setDate(result.date);
        setDescription(result.description);
    };

    // load the currentUser
    const loadCurrentUser = async () => {
        try {
            const user = await getCurrentUser();
            setCurrentUser(user);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    useEffect(() => {
        loadEvent();
        loadCurrentUser(); 
    }, [id]);

    //delete event data, window pops up first to confirm
    const deleteEvent = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this event? This cannot be undone.'
        );
        if (confirmed) {
            await deleteEventById(id);
            loadEvent();
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
            navigate('/user');
        } catch (error) {
            console.log('Signup error', error);
        }
    };

    return (
        <div>
            <div className="p-4 mt-2">
                <div className="border rounded-lg p-4 mt-2 shadow-md">
                    <h1 className="text-center text-3xl font-bold text-primary-foreground sm:text-5xl">
                        Event Details
                    </h1>

                    <div className="text-center p-7">
                        <div className="card-header">
                            <ul className="text-lg">
                                <li className="">
                                    <b>Name: </b>
                                    {name}
                                </li>
                                <li className="list-group-item">
                                    <b>Location: </b>
                                    {location}
                                </li>
                                <li className="list-group-item">
                                    <b>Date: </b>
                                    {formatDate(date)}
                                </li>
                                <li className="list-group-item">
                                    <b>Description: </b>
                                    {description}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex space-x-3 justify-center">
                        <Link
                            className="my-2 rounded-md bg-blue-500 hover:bg-blue-900 px-3 py-3 text-sm font-semibold text-white"
                            to={'/user'}
                        >
                            Back to user
                        </Link>

                        <Link
                            className="my-2 rounded-md bg-green-500 hover:bg-green-900 px-3 py-3 text-sm font-semibold text-white "
                            to={`/event/edit/${id}`}
                        >
                            Edit
                        </Link>

                        <Link
                            className="my-2 rounded-md bg-red-500 hover:bg-red-900 px-3 py-3 text-sm font-semibold text-white "
                            onClick={() => deleteEvent(id)}
                            to="/user"
                        >
                            Delete
                        </Link>

                        <Link
                            className="my-2 rounded-md bg-purple-500 hover:bg-purple-900 px-3 py-3 text-sm font-semibold text-white "
                            onClick={() => attendEvent()}
                        >
                            Attend
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center p-3">MAP HERE :)</div>
        </div>
    );
}
