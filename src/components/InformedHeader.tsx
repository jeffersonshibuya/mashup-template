import { HouseLine, Info } from 'phosphor-react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/logo_rgb.png';
import logo_white from '../assets/logo_white.png';
import ThemeContext from '../context/ThemeContext';

function InformedHeader() {
  const { currentTheme } = useContext(ThemeContext)
  let url = window.location.toString();
  const appName = url.split('/')[3];

  return (
    <header
      className="bg-white dark:bg-gray-900 border-b border-green-800 
      flex-1 flex-column h-[170px] py-2 px-8 md:h-16 
      "
    >
      <div className="container xs:justify-center justify-between align-center
        md:flex text-center">
        <div className="flex">
          <a
            href="http://www.ipc-global.com/"
            className="flex w-full justify-center"
          >
            <img
              src={currentTheme === 'light' ? logo : logo_white}
              alt="informed by data logo"
              className="h-16 md:h-12"
            />
          </a>
        </div>
        <div className="font-bold text-2xl md:text-xl pt-2 uppercase dark:text-white">
          {appName}
        </div>
        
        <div className="text-green-600 flex min-w-fit pt-3 text-xs md:text-md 
          justify-between">
          <a href="http://www.ipc-global.com/" className="flex align-center 
          hover:underline justify-center pt-1 flex-1 gap-2 text-green-800 
          dark:text-green-600
          ">
            <Info size={18} />
            Learn more about inFormed by Data at IPC Global
          </a>
          <div className="mr-4 ml-2 hidden lg:block">
            <a href="http://www.ipc-global.com/" className="dark:text-white text-[#002f67]">
              <HouseLine size={22}  />
            </a>
          </div>
			  </div>
      </div>
    </header>
  );
}

export default InformedHeader;