import testDogData from "/src/assets/test-data/testDogData.json";
import testEventData from "/src/assets/test-data/testEventData.json";
import testUserData from "/src/assets/test-data/testUserData.json";
import {DynamicTable} from "../components/DynamicTable.jsx";
import {Link, Navigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import {getCurrentUser, isAuthenticated} from "../service/AuthService.js";
import {getUserById} from "../service/UserService.js";

export const AccountPage = () => {

    const {id} = useParams();

    // const loadDogs = async() => {
    // call to get dogs associated with user
    // return resulting json
    // };
    // const dogList = loadDogs();
    // change into GET user data

    const [thisUser, setThisUser] = useState(false);
    const [thisUsername, setThisUsername] = useState("");
    const [thisUserLocation, setThisUserLocation] = useState("Kansas City");

    const [viewingUser, setViewingUser] = useState(false);
    const [viewingUserIsThisUser, setViewingUserIsThisUser] = useState(false);

    // gets information for this page
    useEffect(() => {
        const getUser = async () => {
            const result = await getUserById(id);
            setThisUsername(result.username);
            setThisUser(result)
        }
        getUser();
    }, [id]);

    // gets info of user who is currently logged in
    useEffect(() => {
        if (!isAuthenticated()) return;
        setViewingUser(getCurrentUser())
    }, []);

    // if the logged in user owns this page, and can see "edit" button
    useEffect(() => {
        if (thisUser && viewingUser && thisUser.id === viewingUser.id) {
            setViewingUserIsThisUser(true);
        }
    }, [thisUser, viewingUser]);

    const [dog, setDog] = useState([]);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        loadDog();
        loadEvent();
    }, []);

    const loadDog = async () => {
        const result = await axios.get(`http://localhost:8080/api/dog`)
        setDog(result.data)
    }

    const loadEvent = async () => {
        const result = await axios.get(`http://localhost:8080/api/event`)
        setEvent(result.data)
    }

    if (!id) return <Navigate to={"/"} />

    return (
        <>
            <br/>
            <div className={"flex justify-center"}>
                <h1 className={"font-bold p-4"}>{thisUsername}</h1>
                <p className={"p-4"}>{thisUserLocation}</p>
                <div className={"grid place-content-center"}>
                    {viewingUserIsThisUser ? (
                        <Link className="bg-green-600 hover:bg-green-500 text-gray-100 font-bold py-2 px-4 rounded"
                              to={`/user/${thisUser.id}/edit`}>Edit</Link>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <br/>
            <div className={"flex place-content-around"}>
                <h1 className={"underline font-bold"}>My Dogs</h1>
                <Link className="bg-sky-500 hover:bg-sky-700 ..." to="/add-dog">
                    Add a Dog!
                </Link>
            </div>
            <DynamicTable data={dog} type="dog"/>

            <br/>
            <div className={"flex place-content-around"}>
                <h1 className={"underline font-bold"}>My Events</h1>
                <Link className="bg-sky-500 hover:bg-sky-700 ..." to="/create-event">
                    Find Events!
                </Link>
            </div>
            <DynamicTable data={event} type="event"/>
        </>
    )
}