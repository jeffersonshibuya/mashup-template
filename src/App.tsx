import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './index.css'
import Test from './pages/Test';
import { AppConfigProvider } from './context/SheetContext';
import { mashupConfigData, sheetData, sheetsResponseData } from './types';
import Navbar from './components/Navbar';
import InformedHeader from './components/InformedHeader';

type Props = {
  appConfigData: mashupConfigData;
}

export function App() {
  return (
    <>
      <InformedHeader />
      <Navbar />
      <div className="container pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export function WrappedApp({appConfigData}: Props) {
  return (
    <HashRouter>
      <AppConfigProvider appConfigData={appConfigData}>
        <App />
      </AppConfigProvider>
    </HashRouter>
  );
}
