"use client";
import React from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Menu } from "@headlessui/react";
import { ModeToggle } from "./ModeToggle";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function Nav() {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  dark:from-indigo-800 dark:via-purple-800  dark:to-pink-800 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl dark:text-gray-200">
          Next.js-Full-Stack-app
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="bg-white text-indigo-500 dark:bg-gray-700 dark:text-gray-300 px-4 py-2 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300">
              <SignInButton />
            </div>
          </SignedOut>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center text-white dark:text-gray-200">
              Menu <ChevronDownIcon className="w-5 h-5 ml-1" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`${
                      active
                        ? "bg-indigo-500 text-white dark:bg-gray-600 dark:text-gray-200"
                        : "text-gray-900 dark:text-gray-300"
                    } block px-4 py-2 text-sm`}
                  >
                    Dashboard
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`${
                      active
                        ? "bg-indigo-500 text-white dark:bg-gray-600 dark:text-gray-200"
                        : "text-gray-900 dark:text-gray-300"
                    } block px-4 py-2 text-sm`}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`${
                      active
                        ? "bg-indigo-500 text-white dark:bg-gray-600 dark:text-gray-200"
                        : "text-gray-900 dark:text-gray-300"
                    } block px-4 py-2 text-sm`}
                  >
                    Logout
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
