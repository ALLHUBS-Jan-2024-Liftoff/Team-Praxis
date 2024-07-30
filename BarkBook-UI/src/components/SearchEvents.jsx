import testEventDataBig from "/src/assets/test-data/testEventDataBig.json";
import {useEffect, useState} from "react";
import {DynamicTable} from "./DynamicTable.jsx";


// TODO: plug backend data in here, or as prop on component
const useEventData = () => {

    // once data is loaded externally, uncomment the next line and delete the one with the test data
    // const [data, setData] = useState(null);
    const [data, setData] = useState(testEventDataBig);

    useEffect(() => {
        if(!testEventDataBig) return;

        setData(testEventDataBig);

    }, []);

    return data;
}

export const SearchEvents = () => {

    const [loading, setLoading] = useState(true);
    const [eventData, setEventData] = useState(useEventData());
    const [fields, setFields] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSearchField, setSelectedSearchField] = useState(fields[0] || "name");

    useEffect(() => {
        if (eventData.length === 0) return;

        setFields(Object.keys(eventData[0]));

    }, [eventData]);

    useEffect(() => {
        if (!eventData || !fields) return;

        setLoading(false);

    }, [eventData, fields]);


    const handleTermChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleFieldChange = e => {
        setSelectedSearchField(e.target.value);
    };


    const searchBar = () => {
        return (
            <form className={"grid"}>
                <legend
                    className={"text-sm font-bold mb-2"}
                >Search For events
                </legend>
                <input
                    className={"w-auto px-3 py-3 rounded-md border-2 focus:border-blue-500"}
                    type={"search"}
                    placeholder={"Type to search..."}
                    onChange={handleTermChange}
                    id={"searchBar"}
                />
                <legend className={"p-1 mt-2 text-sm font-bold"}>Choose search field</legend>
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
                            <label htmlFor={field} className={"px-1"}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
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
                <DynamicTable data={filteredEvents}/>
            )
        }
        return (
            <p className={"grid justify-center p-3"}>No events found...</p>
        );
    }

    if (loading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <search>
            <div className={"flex justify-center py-4"}>
                {searchBar()}
            </div>
            <section>
                {eventData.length === 0 ? (
                    <p className={"grid justify-center p-3"}>Loading...</p>
                ) : (
                    <>
                        <div className={"flex justify-center"}>
                            <h1>Results</h1>
                        </div>
                        {searchResults()}
                    </>
                )}
            </section>
        </search>
    )
}