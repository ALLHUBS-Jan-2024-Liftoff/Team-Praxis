<<<<<<< HEAD
import Navbar from "./components/Navbar.jsx";
import BarkBookLogin from "./components/BarkBookLogin.jsx"
// import BarkBookRegistration from "./components/BarkBookRegistration.jsx";

// import TailwindExample from "./components/TailwindExample.jsx";

const App = () => {
  return (
    <>
        <Navbar />
        {/*<TailwindExample />*/}
        <BarkBookLogin />
        {/* <BarkBookRegistration /> */}

    </>
  )
=======
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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={"test"} element={<TailwindExample />} />
            <Route path={"about"} element={<AboutPage />} />
            {/*To add a path, edit and uncomment...*/}
            {/*<Route path={"myPath"} element={<myPage />} />*/}
            {/*And add it to the Navbar array*/}
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
>>>>>>> origin/main
}

export default App
