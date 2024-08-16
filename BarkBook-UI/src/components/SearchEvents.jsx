import {useEffect, useState} from "react";
import {DynamicTable} from "./DynamicTable.jsx";
import {getAllEvents} from "../service/EventService.js";


export const SearchEvents = () => {

    const [loading, setLoading] = useState(true);
    const [eventData, setEventData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [fields, setFields] = useState([]);
    const [selectedSearchField, setSelectedSearchField] = useState(fields[0] || "name");

    useEffect(() => {
        if (!eventData || eventData.length === 0) return;

        setFields(Object.keys(eventData[0]));

    }, [eventData]);

    useEffect(() => {
        if (!eventData || !fields) return;

        setLoading(false);

    }, [eventData, fields]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const gotEvents = await getAllEvents();
                setEventData(gotEvents);
            } catch (e) {
                console.log(e);
            }
        }
        fetchEvents();
    }, []);


    const handleTermChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleFieldChange = e => {
        setSelectedSearchField(e.target.value);
    };


    const searchBar = () => {
        return (
            <form className={"grid"}>
                <legend className={"text-sm font-bold mb-2"}>Search For events</legend>
                <input
                    className={"w-auto px-3 py-3 rounded-md border-2 focus:border-blue-500"}
                    type={"search"}
                    placeholder={"Type to search..."}
                    onChange={handleTermChange}
                    id={"searchBar"}
                />
                <legend className={"p-3 mt-2 text-sm font-bold"}>Choose search field</legend>
                <fieldset className={"flex"}>
                    {fields.map((field, index) => (
                        <div className={"px-1"} key={index}>
                            <input
                                type={"radio"}
                                name={"searchField"}
                                id={field}
                                value={field}
                                checked={selectedSearchField === field}
                                onChange={handleFieldChange}
                            />
                            <label htmlFor={field}
                                   className={"px-1"}
                                >
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                        </div>
                    ))}
                </fieldset>
            </form>
        )
    }

    const filteredEvents = eventData.filter(event => {
        return (
            event[selectedSearchField]
                .toString().toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    });

    const searchResults = () => {
        if (filteredEvents.length !== 0) {
            return (
                <DynamicTable data={filteredEvents} type={"event"}/>
            )
        }
        return (
            <p className={"grid justify-center p-3"}>No events found...</p>
        );
    }

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <search>
            <div className={"flex justify-center py-4"}>
                {searchBar()}
            </div>
            <section>
                {searchResults()}
            </section>
        </search>
    )
}