import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {AboutPage} from "./pages/AboutPage.jsx";
import UserLogin from "./pages/auth/UserLogin.jsx"
import UserRegister from "./pages/auth/UserRegister.jsx"
import CreateEventForm from "./pages/CreateEventForm.jsx";
import AddDog from './pages/AddDog.jsx';
import UserEdit from "./pages/user/UserEdit.jsx";
import {UserProfile} from "./pages/user/UserProfile.jsx";
import ViewDog from './pages/ViewDog.jsx';
import EditDog from './pages/EditDog.jsx';
import {AuthProvider} from "./AuthContext.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import ViewEvent from "./pages/ViewEvent.jsx";
import {ProtectedRoutes} from "./components/ProtectedRoutes.jsx";
import {useEffect, useState} from "react";
import {getCurrentUser, isAuthenticated} from "./service/AuthService.js";
import AddImage from './pages/UploadImage.jsx';
import {UserProfileRedirect} from "./pages/user/UserProfileRedirect.jsx";
import {SavePlaces} from "./pages/maps/SavePlaces.jsx";
import {ViewPlace} from "./pages/maps/ViewPlace.jsx";
import {LogoutRedirect} from "./components/LogoutRedirect.jsx";


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
                <Route path={"logout"} element={<LogoutRedirect />} />

                <Route element={<ProtectedRoutes user={!user}/>} >
                    <Route path={"login"} element={<UserLogin />} />
                    <Route path={"register"} element={<UserRegister />} />
                </Route>

                <Route element={<ProtectedRoutes user={user}/>} >
                    {/* users */}
                    <Route path={"user"} element={<UserProfileRedirect />} />
                    <Route path={"user/:id"} element={<UserProfile />} />
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
                    <Route path={"save-places"} element={<SavePlaces />} />
                    <Route path={"view-places"} element={<ViewPlace />} />
                    <Route path={"/image"} element={<AddImage />} />
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
