import { Link } from "react-router-dom";
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LogoutButton } from "./LogoutButton";
import { useEffect, useState } from "react";
import { getCurrentUser, isAuthenticated } from "../service/AuthService";


// edit and add destinations as needed, for now
// setting `valid` to false means it will not render in the navbar
const destinations = [
    {name: 'Home', path: '/', valid: true},
    {name: 'About', path: '/about', valid: true},
    {name: 'Places', path: '/save-places', valid: true},
]

// TODO: make navbar sticky
const Navbar = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
        if (!isAuthenticated()) return;
        setUser(getCurrentUser())
    }, []);

    return (
        <Disclosure as="nav" className="bg-amber-100">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                {/* Image below if we decide to add a logo - Tailwind logo commented out as example */}
                  {/* <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  /> */}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {destinations.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        aria-current={item.valid ? 'page' : undefined}
                        className="text-brown hover:bg-amber-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-amber-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-amber-500">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src="https://t3.ftcdn.net/jpg/02/77/80/68/360_F_277806809_9RDs2geUJlBKVX42LHHhKJzOjFdWO38N.jpg"
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <a href="/user" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <Link to={`/user/${user.id}/edit`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <a className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        <LogoutButton></LogoutButton>
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </Disclosure>
      )
}
export default Navbar;