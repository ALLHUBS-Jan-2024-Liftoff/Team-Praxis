import {SearchEvents} from "../components/SearchEvents.jsx";

export const HomePage = () => {

    return (
        <>
            <br/>
            <div className={"flex place-content-around"}>
                <button className="bg-amber-900 hover:bg-amber-600 text-white font-medium px-3 py-2 text-sm rounded-md">
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