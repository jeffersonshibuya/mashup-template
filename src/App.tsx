import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './index.css'
import Test from './pages/Test';
import { AppConfigProvider } from './context/SheetContext';
import { mashupConfigData } from './types';
import Navbar from './components/Navbar';
import InformedHeader from './components/InformedHeader';
import Sheet from './pages/Sheet';
import { Footer } from './components/Footer';
import ThemeContextWrapper from './context/ThemeContextWrapper';

type Props = {
  appConfigData: mashupConfigData;
}

export function App() {
  return (
    <>
      <InformedHeader />
      <Navbar />
      <div className='dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-900'>
        <div className="container pt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/:sheetId" element={<Sheet />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export function WrappedApp({appConfigData}: Props) {
  return (
    <HashRouter>
      <AppConfigProvider appConfigData={appConfigData}>
        <ThemeContextWrapper>
          <App />
        </ThemeContextWrapper>
      </AppConfigProvider>
    </HashRouter>
  );
}
