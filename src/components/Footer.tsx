import { Buildings, FacebookLogo, LinkedinLogo, MapPin, Phone, TwitterLogo, YoutubeLogo } from 'phosphor-react'
import logo from '../assets/logo_rbg.png';
import ipcIcon from '../assets/ipcglobe.png'

export function Footer() {
   return (
    <footer id="footer" className="bg-gradient-to-t from-gray-300 to-white border-t border-green-800 
      text-gray-700 py-3"
    >
      <div className="container px-2">
        <div className="grid lg:grid-cols-3 gap-2">
          <div>
              <div className="py-3 mb-6">
                <img src={logo} alt="informed by data logo" 
                  className="w-[100px] sm:w-[160px] h-auto hover:cursor-pointer"
                  onClick={() => window.location.replace('https://www.ipc-global.com/')}
                />
              </div>
              <div className='leading-relaxed text-gray-500'>
                <p className="text-3xl font-bold ">Let's keep in touch!</p>
                <span className="">Find us on any of these platforms.</span>
              </div>
              <ul className="flex py-4">
                <li>
                  <a
                    href="https://www.facebook.com/IPCGlobalServices"
                    target="_blank"
                    rel="noreferrer"
                    role="button"
                    className="bg-white text-blue-500 shadow-lg font-normal 
                      h-15 w-15 items-center justify-center align-center 
                      rounded-full outline-none focus:outline-none mr-2 p-3
                      transition duration-300 ease-in-out hover:scale-125"
                    type="button"
                  >
                    <FacebookLogo size={24}/>
                  </a>
                </li>
                <li>
                <a
                href="https://www.facebook.com/IPCGlobalServices"
                target="_blank"
								rel="noreferrer"
								role="button"
                className="bg-white text-blue-400 shadow-lg font-normal 
                  h-15 w-15 items-center justify-center align-center 
                  rounded-full outline-none focus:outline-none mr-2 p-3
                  transition duration-300 ease-in-out hover:scale-125"
                type="button"
              >
                <TwitterLogo size={24} />
              </a>
                </li>
                <li>
                    <a
                    href="https://www.youtube.com/channel/UC4Ix5E7ni01J99cMa7y9XAg"
                    target="_blank"
                    rel="noreferrer"
                    role="button"
                    className="bg-white text-red-600 shadow-lg font-normal 
                      h-15 w-15 items-center justify-center align-center 
                      rounded-full outline-none focus:outline-none mr-2 p-3
                      transition duration-300 ease-in-out hover:scale-125"
                    type="button"
                  >
                    <YoutubeLogo size={24}/>
                  </a>
                </li>
                <li>
                    <a
                    href="https://www.linkedin.com/company/ipc-global/mycompany/verification/"
                    target="_blank"
                    rel="noreferrer"
                    role="button"
                    className="bg-white text-blue-700 shadow-lg font-normal 
                      h-15 w-15 items-center justify-center align-center 
                      rounded-full outline-none focus:outline-none mr-2 p-3
                      transition duration-300 ease-in-out hover:scale-125"
                    type="button"
                  >
                    <LinkedinLogo size={24}/>
                  </a>
                </li>
                <li>
                    <a
                    href="https://www.ipc-global.com"
                    target="_blank"
                    rel="noreferrer"
                    role="button"
                    className="bg-white text-blue-700 shadow-lg font-normal 
                      h-15 w-15 items-center justify-center align-center 
                      rounded-full outline-none focus:outline-none mr-2 p-3
                      transition duration-300 ease-in-out hover:scale-125"
                    type="button"
                  >
                    <img src={ipcIcon} alt="ipc global icon" style={{width: '24px'}}/>
                  </a>
                </li>
              </ul>
          </div>
          <div>
            <h3 className="py-3 border-b font-semibold border-green-700 mb-3 
            text-green-700">
              What We Do
            </h3>
            <ul className="leading-loose">
              <li>Qlik Data Analytics Platform</li>
              <li>Qlik Data Integration Platform</li>
              <li>Amazon Web Services (AWS)</li>
              <li>DataRobot Enterprise AI</li>
            </ul>
          </div>
          <div className="">
            <h3 className="py-3 border-b font-semibold border-green-700 mb-3
            text-green-700">
              Contact Us
            </h3>
            <ul>
              <li className="flex align-center gap-2 py-2"> 
                <MapPin size={20} className=""/> 
                <span> 4080 McGinnis Ferry Road </span>
              </li>
              <li className="flex align-center gap-2 py-2"> 
                <Buildings size={20} /> 
                Building 100, Suite 103 Alpharetta, GA 30005 
              </li>
              <li className="flex align-center gap-2 py-2"> 
              <Phone size={20} /> Phone: +1 470-407-9100 </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex py-2 mt-4 justify-center w-full border-t 
      border-gray-700">
        <p>Copyright © {new Date().getFullYear()} 
        <a href="https://ipc-global.com" target="_blank" rel="noreferrer"> IPC - Global</a></p>
      </div>
    </footer>
   )
}