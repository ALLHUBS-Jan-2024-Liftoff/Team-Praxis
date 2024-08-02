import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
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
import {AccountPage} from "./pages/AccountPage.jsx";
import {MapContainer} from "./api/MapContainer.jsx";
import ViewDog from './pages/ViewDog.jsx';
import EditDog from './pages/EditDog.jsx';
import EditEvent from "./pages/EditEvent.jsx";
import ViewEvent from "./pages/ViewEvent.jsx";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={"about"} element={<AboutPage />} />
            <Route path={"login"} element={<BarkBookLogin />} />
            <Route path={"register"} element={<BarkBookRegistration />} />
            <Route path={"create-event"} element={<CreateEventForm />} />
            <Route path={"add-dog"} element={<AddDog />} />
            <Route path={"allusers"} element={<AllUsers />} />
            <Route path={"edituser/:id"} element={<EditBarkBookReg />} />
            <Route path={"viewuser/:id"} element={<ViewBarkBookReg />} />
            <Route path={"user"} element={<AccountPage />} />
            <Route path={"map"} element={<MapContainer />} />
            <Route path={"/dog/details/:id"} element={<ViewDog />} />
            <Route path={"/dog/edit/:id"} element={<EditDog />} />
            <Route path={"/event/edit/:id"} element={<EditEvent />} />
            <Route path={"/event/details/:id"} element={<ViewEvent />} />
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
