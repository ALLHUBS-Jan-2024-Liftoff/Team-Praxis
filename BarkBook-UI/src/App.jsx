import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import TailwindExample from "./components/TailwindExample.jsx";
import {MainLayout} from "./layouts/MainLayout.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {AboutPage} from "./pages/AboutPage.jsx";
import CreateEventForm from "./pages/CreateEventForm.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={"test"} element={<TailwindExample />} />
            <Route path={"about"} element={<AboutPage />} />
            <Route path={"create-event"} element={<CreateEventForm />} />
            {/*To add a path, edit and uncomment...*/}
            {/*<Route path={"myPath"} element={<myPage />} />*/}
            {/*And add it to the Navbar array*/}
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
}

export default App
