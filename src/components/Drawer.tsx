import React, { useContext } from "react";
import { X } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { useAppConfig } from "../context/SheetContext";

interface Props {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
}
export default function Drawer({ isOpen, setIsOpen }: Props) {

  const { sheets } = useAppConfig();

  const links = sheets.map((sheetLink: any) => (
    <li key={sheetLink.id}>
      <NavLink onClick={() => setIsOpen(false)} to={`/${sheetLink.id}`}  
        className="flex align-center text-gray-900 p-2 m-2 rounded 
          bg-gray-400 my-1 font-semibold"
        >
        {/* <sheetLink.menuIcon size={14}/> */}
        <span className="text-sm">{sheetLink.title}</span>
      </NavLink>
    </li>
  ));
  
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-50 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-200 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          "w-[70vw] max-w-lg right-0 absolute bg-gray-800 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <header className="flex flex-row align-center justify-between p-4">
          <span className="font-bold text-lg">Menu</span>
          <button className="font-bold text-lg" onClick={() => setIsOpen(false)}>
            <X size={12} className="bg-gray-900 rounded text-white"/>
          </button>
        </header>
        <article className="relative max-w-lg flex flex-col 
           overflow-y-scroll h-full
          ">
            <ul>
              {links}
            </ul>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}