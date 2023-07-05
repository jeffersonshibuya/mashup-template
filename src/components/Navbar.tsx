import { House, HouseLine, List, Table, User } from "phosphor-react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppConfig } from "../context/SheetContext";
import Drawer from "./Drawer";
import ThemeSwitch from "./ThemeSwitch";

function Navbar() {
  let url = window.location.toString();
  const appName = url.split('/')[3];
  
  const { sheets } = useAppConfig();
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    	<nav className="bg-white dark:bg-gray-800 lg:py-2 px-2 my-2 rounded">
        <div className="container lg:flex justify-between hidden">
          <div className="-mb-px grid grid-cols-5 md:grid-cols-7 justify-start 
             gap-2 ">
            {/* <NavLink to={`/${appName}`} className="no-underline
              uppercase tracking-widest font-bold 
              text-xs py-3 mr-8">
                <span className="flex align-center">
                  <User size={16} className="mr-1"/>
                  Home
                </span>
            </NavLink> */}
            {sheets.map(sheet => 
              <NavLink to={`/${appName}/${sheet.id}`} 
                className=" justify-center flex items-center
                  text-xs py-1 px-2 rounded-lg hover:bg-gray-600
                  sm:grid-cols-3 md:font-medium md:border-0
                  bg-gray-200 dark:bg-gray-700 border-gray-700
                  hover:text-white dark:text-white"
                key={sheet.id}
              >
                <span className="flex align-center">
                  {/* <Table size={16} className="mr-1"/> */}
                  {sheet.title}
                </span>
              </NavLink>
            )}
          </div>
          <ThemeSwitch />
        </div>

        <Drawer isOpen={navbarOpen} setIsOpen={setNavbarOpen} appName={appName}/>

        <button
          className="cursor-pointer text-xl leading-none border 
          border-solid border-transparent rounded bg-transparent block lg:hidden 
          outline-none focus:outline-none absolute right-6 top-6 
          text-gray-900 dark:text-white"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <List size={24}/>
        </button>

        <button
          className="cursor-pointer text-xl leading-none border 
          border-solid border-transparent rounded bg-transparent block lg:hidden 
          outline-none focus:outline-none absolute left-6 top-6 
          text-gray-900 dark:text-white"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <House size={24}/>
        </button>

      </nav>
  )
}

export default Navbar;