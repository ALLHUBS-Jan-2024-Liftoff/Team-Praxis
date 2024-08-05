import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById, deleteEventById } from "../service/EventService";

export default function ViewEvent() {

    const { id } = useParams();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const loadEvent = async () => {
        const result = await getEventById(id);
        setName(result.name);
        setLocation(result.location);
        setDate(result.date);
        setDescription(result.description);
    }

    useEffect(() => {
        loadEvent();
    }, [id]);

    //delete event data, window pops up first to confirm
    const deleteEvent = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this event? This cannot be undone.")
        if (confirmed) {
            await deleteEventById(id);
            loadEvent();
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border round p-4 mt-2 shadow'>
                    <h1 className='text-center text-2xl'>Event Details</h1>

                    <div className='card'>
                        <div className='card-header'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Location: </b>
                                    {location}                                    
                                </li>
                                <li className='list-group-item'>
                                    <b>Date: </b>
                                    {date}                                    
                                </li>
                                <li className='list-group-item'>
                                    <b>Description: </b>
                                    {description}
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
                            to={`/event/edit/${id}`}>
                                Edit
                        </Link>
                    </div>

                    <div className='flex justify-center'>
                        <Link className='btn my-2 rounded-md bg-black px-5 py-4 text-sm font-semibold text-white hover:bg-red-500' 
                            onClick={() => deleteEvent(id)} 
                            to="/user">
                                Delete
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}