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
import UserEdit from "./pages/user/UserEdit.jsx";
import ViewUserById from "./pages/user/temp/ViewUserById.jsx";
import {AccountPage} from "./pages/AccountPage.jsx";
import {MapContainer} from "./api/google/MapContainer.jsx";
import ViewDog from './pages/ViewDog.jsx';
import EditDog from './pages/EditDog.jsx';
import {AuthProvider} from "./AuthContext.jsx";
import {UserStuff} from "./pages/user/temp/UserStuff.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import ViewEvent from "./pages/ViewEvent.jsx";
import {ProtectedRoutes} from "./components/ProtectedRoutes.jsx";
import {useEffect, useState} from "react";
import {getCurrentUser, isAuthenticated} from "./service/AuthService.js";
import {UserRedirect} from "./pages/user/UserRedirect.jsx";


const App = () => {

    const [user, setUser] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) return;
        setUser(getCurrentUser())
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route path={"about"} element={<AboutPage />} />
                <Route path={"userstuff"} element={<UserStuff />} />

                <Route element={<ProtectedRoutes user={!user}/>} >
                    <Route path={"login"} element={<UserLogin />} />
                    <Route path={"register"} element={<UserRegister />} />
                </Route>

                <Route element={<ProtectedRoutes user={user}/>} >
                    {/* users */}
                    <Route path={"allusers"} element={<ViewAllUsers />} />
                    <Route path={"viewuser/:id"} element={<ViewUserById />} />
                    <Route path={"user"} element={<UserRedirect />} />
                    <Route path={"user/:id"} element={<AccountPage />} />
                    <Route path={"user/:id/edit"} element={<UserEdit />} />
                    {/* dogs */}
                    <Route path={"add-dog"} element={<AddDog />} />
                    <Route path={"/dog/details/:id"} element={<ViewDog />} />
                    <Route path={"/dog/edit/:id"} element={<EditDog />} />
                    {/* events */}
                    <Route path={"create-event"} element={<CreateEventForm />} />
                    <Route path={"/event/details/:id"} element={<ViewEvent />} />
                    <Route path={"/event/edit/:id"} element={<EditEvent />} />
                    {/* misc */}
                    <Route index element={<HomePage />} />
                    <Route path={"map"} element={<MapContainer />} />
                </Route>
            </Route>
        )
    );

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
export default App
