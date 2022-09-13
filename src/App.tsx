import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './index.css'
import Test from './pages/Test';
import { AppConfigProvider } from './context/SheetContext';
import { mashupConfigData, sheetData, sheetsResponseData } from './types';

type Props = {
  appConfigData: mashupConfigData;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
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
