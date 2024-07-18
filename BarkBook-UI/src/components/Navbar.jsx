import {Link} from "react-router-dom";

// edit and add destinations as needed, for now
// setting `valid` to false means it will not render in the navbar
const destinations = [
    {name: 'home', href: '/', valid: true},
    {name: 'login', href: '/login', valid: true},
    {name: 'about', href: '/about', valid: true},
    {name: 'add dog', href: '/add-dog', valid: true},
    {name: 'new link', href: '/newpage', valid: false},
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