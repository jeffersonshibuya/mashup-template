import { User } from "phosphor-react";
import { NavLink, useParams } from "react-router-dom";
import { useAppConfig } from "../context/SheetContext";
import ThemeSwitch from "./ThemeSwitch";

function Navbar() {
  let url = window.location.toString();
  const appName = url.split('/')[3];
  
  const { sheets } = useAppConfig();


  return (
    	<nav className="bg-white dark:bg-gray-800 pt-2 shadow-md">
        <div className="container flex align-center justify-between">
          <div className="-mb-px flex justify-start dark:text-gray-300">
            <NavLink to={`/${appName}`} className="no-underline
                uppercase tracking-widest font-bold 
                text-xs py-3 mr-8">
                  <span className="flex align-center">
                    <User size={16} className="mr-1"/>
                    Home
                  </span>
                </NavLink>
              {sheets.map(sheet => 
                <NavLink to={`/${appName}/${sheet.id}`} 
                  className="no-underline 
                    uppercase tracking-wide font-bold 
                    text-xs py-3 mr-8"
                  key={sheet.id}
                >
                  <span className="flex align-center">
                    <User size={16} className="mr-1"/>
                    {sheet.title}
                  </span>
                </NavLink>
              )}
          </div>
          <ThemeSwitch />
        </div>
      </nav>
  )
}

export default Navbar;