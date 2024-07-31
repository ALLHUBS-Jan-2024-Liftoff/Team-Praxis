import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {AboutPage} from "./pages/AboutPage.jsx";
import UserLogin from "./pages/users-temp/UserLogin.jsx"
import UserRegister from "./pages/users-temp/UserRegister.jsx"
import CreateEventForm from "./pages/CreateEventForm.jsx";
import AddDog from './pages/AddDog.jsx';
import ViewAllUsers from "./pages/users-temp/tests/ViewAllUsers.jsx";
import EditUser from "./pages/users-temp/tests/EditUser.jsx";
import ViewUserById from "./pages/users-temp/tests/ViewUserById.jsx";
import {AccountPage} from "./pages/AccountPage.jsx";
import {MapContainer} from "./api/google/MapContainer.jsx";
import ViewDog from './pages/ViewDog.jsx';
import EditDog from './pages/EditDog.jsx';



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={"about"} element={<AboutPage />} />
            <Route path={"login"} element={<UserLogin />} />
            <Route path={"register"} element={<UserRegister />} />
            <Route path={"create-event"} element={<CreateEventForm />} />
            <Route path={"add-dog"} element={<AddDog />} />
            <Route path={"allusers"} element={<ViewAllUsers />} />
            <Route path={"edituser/:id"} element={<EditUser />} />
            <Route path={"viewuser/:id"} element={<ViewUserById />} />
            <Route path={"user"} element={<AccountPage />} />
            <Route path={"map"} element={<MapContainer />} />
            <Route path={"/user/dog/:id"} element={<ViewDog />} />
            <Route path={"/user/edit-dog/:id"} element={<EditDog />} />
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
