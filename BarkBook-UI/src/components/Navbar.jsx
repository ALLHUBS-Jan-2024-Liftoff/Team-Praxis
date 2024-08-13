import { Link } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { LogoutButton } from "./LogoutButton";
import { useEffect, useState } from "react";
import { getCurrentUser, isAuthenticated } from "../service/AuthService";


// edit and add destinations as needed, for now
// setting `valid` to false means it will not render in the navbar
const destinations = [
    {name: 'Home', path: '/', valid: true},
    {name: 'About', path: '/about', valid: false},
    {name: 'Create Event', path: '/create-event', valid: false},
    {name: 'Add Dog', path: '/add-dog', valid: false},
    {name: 'map test', path: '/map', valid: false},
    // {name: 'Account', path: '/userstuff', valid: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }



// TODO: make navbar sticky
const Navbar = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
        if (!isAuthenticated()) return;
        setUser(getCurrentUser())
    }, []);



    // return (
    //     <div className={"w-full h-20 flex justify-between items-center px-8 bg-amber-100"}>
    //         <h1 className="text-2xl font-bold text-amber-600">Bark Book</h1>
    //         <div className="insert-x-0 top-0 space-x-4">
    //             {destinations.map((item) => (
    //                 item.valid ? (
    //                     <Link
    //                         key={item.name}
    //                         to={item.path}
    //                         className={'px-3 text-black bg-amber-300 hover:text-white hover:bg-amber-600'}
    //                     >
    //                         {item.name}
    //                     </Link>
    //                 ) : null
    //             ))}
    //         </div>
    //     </div>
    // )
    return (
        <Disclosure as="nav" className="bg-amber-100">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {destinations.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        aria-current={item.valid ? 'page' : undefined}
                        className={classNames(
                          item.valid ? 'bg-amber-900 text-white' : 'text-brown hover:bg-amber-900 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-amber-100 p-1 text-amber-500 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
    
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-amber-500 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src=""
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
    
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {destinations.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      )
}
export default Navbar;