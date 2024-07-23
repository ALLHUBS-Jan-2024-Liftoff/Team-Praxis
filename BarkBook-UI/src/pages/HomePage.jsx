import {DynamicTable} from "../components/DynamicTable.jsx";
import testEventData from "../assets/test-data/testEventData.json";

export const HomePage = () => {
    // TODO: use a get function here instead of dummy data
    const eventData = testEventData;

    return (
        <>
            <br/>
            <div className={"flex place-content-around"}>
                <button className="bg-sky-500 hover:bg-sky-700">
                    Add a Dog!
                </button>
                <form>
                    <label>Search </label>
                    <input className="border-2" id="searchTerm"/>
                </form>
            </div>

            {/*TODO: make this container stay the same size, and scrollable*/}
            <br/>
            <div className={"flex place-content-around"}>
                <h1 className={"underline font-bold"}>Events</h1>
            </div>
            <DynamicTable data={eventData}/>

            <br/>
            <div className={"grid place-content-center"}>Map goes here</div>
        </>
    )
}