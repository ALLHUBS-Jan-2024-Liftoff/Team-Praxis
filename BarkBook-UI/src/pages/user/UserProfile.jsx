import {DynamicTable} from "../../components/DynamicTable.jsx";
import {Link, Navigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getCurrentUser, isAuthenticated} from "../../service/AuthService.js";
import {getUserById, getUserCreatedDogs, getUserCreatedEvents} from "../../service/UserService.js";
import {getAllDogs} from "../../service/DogService.js";
import {getAllEvents} from "../../service/EventService.js";


export const UserProfile = () => {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [thisUser, setThisUser] = useState(false);
    const [thisDisplayName, setThisDisplayName] = useState("");
    const [thisUserLocation, setThisUserLocation] = useState("Kansas City");
    const [viewingUser, setViewingUser] = useState(false);
    const [viewingUserIsThisUser, setViewingUserIsThisUser] = useState(false);

    const [dogs, setDogs] = useState([]);
    const [events, setEvents] = useState([]);

    // gets information for this page
    useEffect(() => {
        const getUser = async () => {
            const result = await getUserById(id);
            setThisDisplayName(result.displayName);
            setThisUser(result)
        }
        getUser();
    }, [id]);

    // gets info of user who is currently logged in
    useEffect(() => {
        if (!isAuthenticated()) return;
        setViewingUser(getCurrentUser())
    }, []);

    // if the logged-in user owns this page, and can see "edit" button
    useEffect(() => {
        if (thisUser && viewingUser && thisUser.id === viewingUser.id) {
            setViewingUserIsThisUser(true);
        }
    }, [thisUser, viewingUser]);


    useEffect(() => {
        const getData = async () => {
            try {
                const [gotDogs, gotEvents] = await Promise.all([
                    getUserCreatedDogs(),
                    getUserCreatedEvents()
                ]);
                setDogs(gotDogs);
                setEvents(gotEvents);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);


    if (!id) return <Navigate to={"/"} />

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <>
            <div className="flex justify-center p-4">
                <h1 className="font-bold p-4">{thisDisplayName}</h1>
                <p className="p-4">{thisUserLocation}</p>
                <div className="grid place-content-center">
                    {viewingUserIsThisUser ? (
                        <Link className="bg-green-600 hover:bg-green-500 text-white font-bold px-2 py-1 rounded"
                              to={`/user/${thisUser.id}/edit`}>Edit</Link>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <br/>
            <div className="flex place-content-around">
                <h1 className=" font-bold text-lg">My Dogs</h1>
                <Link className="bg-sky-500 hover:bg-sky-700 text-white font-bold p-1 mr-2 py-2 px-2 rounded" to="/add-dog">
                    Add a Dog!
                </Link>
            </div>
            <DynamicTable data={dogs} type="dog"/>

            <br/>
            <div className="flex place-content-around">
                <h1 className="font-bold text-lg">My Events</h1>
                <Link className="bg-sky-500 hover:bg-sky-700 text-white font-bold p-1 mr-2 py-2 px-2 rounded" to="/create-event">
                    Create an Event!
                </Link>
            </div>
            <DynamicTable data={events} type="event"/>
        </>
    )
}