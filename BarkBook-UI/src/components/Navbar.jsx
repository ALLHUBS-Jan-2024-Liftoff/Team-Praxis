import {Link} from "react-router-dom";

// edit and add destinations as needed, for now
// setting `valid` to false means it will not render in the navbar
const destinations = [
    {name: 'home', path: '/', valid: true},
    {name: 'test', path: '/test', valid: true},
    {name: 'about', path: '/about', valid: true},
    {name: 'login', path: '/login', valid: true},
    {name: 'register', path: '/register', valid: true},
    {name: 'create-event', path: '/create-event', valid: true},
    {name: 'add-dog', path: '/add-dog', valid: true},
]

// TODO: make navbar sticky
const Navbar = () => {
    return (
        <div className={"flex flex-col items-center bg-gray-400"}>
            <div className="space-x-4">
                {/*iterate over array of destination objects*/}
                {destinations.map((item) => (
                    // if item.valid is true, render the button
                    item.valid ? (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={'text-black bg-gray-200 hover:text-white hover:bg-black'}
                        >
                            | {item.name} |
                        </Link>
                    ) : null
                ))}
            </div>
        </div>
    )
}
export default Navbar;