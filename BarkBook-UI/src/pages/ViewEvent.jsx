import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewEvent() {
  
    const [event, setEvent] = useState({
      name:"",
      location:"",
      date:"",
      description:""
    });

    const { id } = useParams();

    useEffect(() => {
      loadEvent();
    }, []);

    const loadEvent = async () => {
      const result = await axios.get(`http://localhost:8080/api/event/${id}`)
      setEvent(result.data);
    }

    const deleteEvent = async (id) => {
        if (confirmDelete()){
        await axios.delete(`http://localhost:8080/api/event/${id}`);
        loadEvent();
        }
    };

    // window pops up after hitting delete
    function confirmDelete () {
        return window.confirm("Are you sure you want to delete this event?");
    }

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
                                    {event.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Location: </b>
                                    {event.location}                                    
                                </li>
                                <li className='list-group-item'>
                                    <b>Date: </b>
                                    {event.date}                                    
                                </li>
                                <li className='list-group-item'>
                                    <b>Description: </b>
                                    {event.description}
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
                        to={`/event/edit/${event.id}`}>
                            Edit
                        </Link>
                    </div>

                    <div className='flex justify-center'>
                        <Link className='btn my-2 rounded-md bg-black px-5 py-4 text-sm font-semibold text-white hover:bg-red-500' 
                            onClick={() => deleteEvent(event.id)} 
                            to="/user">
                                Delete
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}