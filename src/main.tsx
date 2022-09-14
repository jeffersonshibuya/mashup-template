import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';
import { api } from './services/api';
import { mashupConfigData, sheetData, sheetsResponseData } from './types';
import { GetMashupConfig, QdtConfigConnection } from './util/QdtConfig';

function loadPage(appConfigData: mashupConfigData): void {

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <WrappedApp appConfigData={appConfigData}/>
    </React.StrictMode>
  );
}

(async function getApp() {
  const configApp = GetMashupConfig();

  if(configApp) loadPage(configApp);
})();