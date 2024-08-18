import {SearchEvents} from "../components/SearchEvents.jsx";

export const HomePage = () => {

    return (
        <>
            <div className="">
                <h1 className="text-3xl text-center font-bold text-primary-foreground sm:text-5xl p-3">Welcome to BarkBook!</h1>
                <div className="text-center p-4">
                    <SearchEvents />
                </div>
                <div className="grid place-content-center p-4">
                    Map goes here
                </div>
            </div>
        </>
    )
}