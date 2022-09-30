import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './index.css'
import Test from './pages/Test';
import { AppConfigProvider } from './context/SheetContext';
import { mashupConfigData, sheetData } from './types';
import Navbar from './components/Navbar';
import InformedHeader from './components/InformedHeader';
import Sheet from './pages/Sheet';
import { Footer } from './components/Footer';
import ThemeContextWrapper from './context/ThemeContextWrapper';
import QdtComponent from './components/QdtComponent';
import { QdtSelections } from 'qdt-components';

type Props = {
  appConfigData: mashupConfigData;
  sheetsList: sheetData[];
}

export function App() {
  return (
    <>
      <InformedHeader />
      <Navbar />
      <div className='dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-900'>
        <div className="container pt-3">
          <QdtComponent
            component={QdtSelections}
            properties={{
              qSelectionObjectDef: {},
            }}
          />
          <Routes>
            <Route path={`/:appName`} element={<Home />} />
            <Route path="/:appName/test" element={<Test />} />
            <Route path="/:appName/:sheetId" element={<Sheet />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export function WrappedApp({appConfigData, sheetsList}: Props) {
  return (
    <BrowserRouter>
      <AppConfigProvider appConfigData={appConfigData} sheetsList={sheetsList}>
        <ThemeContextWrapper>
          <App />
        </ThemeContextWrapper>
      </AppConfigProvider>
    </BrowserRouter>
  );
}
