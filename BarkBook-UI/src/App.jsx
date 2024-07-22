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
import BarkBookLogin from "./pages/BarkBookLogin.jsx"
import BarkBookRegistration from "./pages/BarkBookRegistration.jsx"
import CreateEventForm from "./pages/CreateEventForm.jsx";
import AddDog from './pages/AddDog.jsx';
import AllUsers from "./pages/AllUsers.jsx";
import EditBarkBookReg from "./pages/EditBarkBookReg.jsx";
import ViewBarkBookReg from "./pages/ViewBarkBookReg.jsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={"test"} element={<TailwindExample />} />
            <Route path={"about"} element={<AboutPage />} />
            <Route path={"login"} element={<BarkBookLogin />} />
            <Route path={"register"} element={<BarkBookRegistration />} />
            <Route path={"create-event"} element={<CreateEventForm />} />
            <Route path={"add-dog"} element={<AddDog />} />
            <Route path={"allusers"} element={<AllUsers />} />
            <Route path={"edituser/:id"} element={<EditBarkBookReg />} />
            <Route path={"viewuser/:id"} element={<ViewBarkBookReg />} />
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
