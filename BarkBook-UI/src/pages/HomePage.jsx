import {SearchEvents} from "../components/SearchEvents.jsx";

export const HomePage = () => {

    return (
        <>
            <br/>
            <div className={"flex place-content-around"}>
                <button className="bg-sky-500 hover:bg-sky-700">
                    Add a Dog!
                </button>
            </div>
            <div>
                <SearchEvents />
            </div>
            <br/>
            <div className={"grid place-content-center"}>Map goes here</div>
        </>
    )
}