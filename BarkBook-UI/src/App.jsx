import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {AboutPage} from "./pages/AboutPage.jsx";
import UserLogin from "./pages/user/UserLogin.jsx"
import UserRegister from "./pages/user/UserRegister.jsx"
import CreateEventForm from "./pages/CreateEventForm.jsx";
import AddDog from './pages/AddDog.jsx';
import ViewAllUsers from "./pages/user/temp/ViewAllUsers.jsx";
import EditUser from "./pages/user/EditUser.jsx";
import ViewUserById from "./pages/user/temp/ViewUserById.jsx";
import {AccountPage} from "./pages/AccountPage.jsx";
import {MapContainer} from "./api/google/MapContainer.jsx";
import ViewDog from './pages/ViewDog.jsx';
import EditDog from './pages/EditDog.jsx';
import {AuthProvider} from "./AuthContext.jsx";
import {UserStuff} from "./pages/user/temp/UserStuff.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import ViewEvent from "./pages/ViewEvent.jsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={"about"} element={<AboutPage />} />
            <Route path={"userstuff"} element={<UserStuff />} />
            <Route path={"login"} element={<UserLogin />} />
            <Route path={"register"} element={<UserRegister />} />
            <Route path={"allusers"} element={<ViewAllUsers />} />
            <Route path={"viewuser/:id"} element={<ViewUserById />} />
            <Route path={"user/:id"} element={<AccountPage />} />
            <Route path={"user"} element={<AccountPage />} /> {/*TODO: make this a redirect */}
            <Route path={"user/:id/edit"} element={<EditUser />} />
            <Route path={"map"} element={<MapContainer />} />
            <Route path={"create-event"} element={<CreateEventForm />} />
            <Route path={"add-dog"} element={<AddDog />} />
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
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App
