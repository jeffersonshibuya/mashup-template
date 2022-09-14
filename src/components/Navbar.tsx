import { User } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { useAppConfig } from "../context/SheetContext";

function Navbar() {

  const { sheets } = useAppConfig();

  return (
    	<nav className="bg-white pt-2 shadow-md">
        <div className="-mb-px flex justify-start container">
          <NavLink to={`/`} className="no-underline text-teal-dark 
              uppercase tracking-wide font-bold 
              text-xs py-3 mr-8">
                <span className="flex align-center">
                  <User size={16} className="mr-2"/>
                  Home
                </span>
              </NavLink>
            {sheets.map(sheet => 
              <NavLink to={`/${sheet.id}`} 
                className="no-underline text-teal-dark 
                  uppercase tracking-wide font-bold 
                  text-xs py-3 mr-8"
                key={sheet.id}
              >
                <span className="flex align-center">
                  <User size={16} className="mr-2"/>
                  {sheet.title}
                </span>
              </NavLink>
            )}
        </div>
      </nav>
  )
}

export default Navbar;