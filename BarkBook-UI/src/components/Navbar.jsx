import {Link} from "react-router-dom";

// edit and add destinations as needed, for now
// setting `valid` to false means it will not render in the navbar
const destinations = [
    {name: 'home', path: '/', valid: true},
    {name: 'about', path: '/about', valid: true},
    {name: 'create-event', path: '/create-event', valid: true},
    {name: 'add-dog', path: '/add-dog', valid: true},
    {name: 'map test', path: '/map', valid: true},
    {name: 'user stuff', path: '/userstuff', valid: true},
]

// TODO: make navbar sticky
const Navbar = () => {

    return (
        <div className={"flex flex-row bg-gray-400"}>
            <div className="flex flex-grow justify-center space-x-4">
                {destinations.map((item) => (
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