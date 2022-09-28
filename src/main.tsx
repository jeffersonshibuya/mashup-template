import { qdtEnigma } from 'qdt-components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';
import { api } from './services/api';
import { mashupConfigData, sheetData, sheetsResponseData } from './types';
import { GetMashupConfig, QdtConfigConnection, QdtConfigData } from './util/QdtConfig';

function loadPage(appConfigData: mashupConfigData): void {

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <WrappedApp appConfigData={appConfigData}/>
    </React.StrictMode>
  );
}

(async function getApp() {
  const configApp = GetMashupConfig();

  if(configApp?.sheets.length === 0) {

    const config = QdtConfigData;
    const qDoc = await qdtEnigma(config);
    
    const qOptionsSheet = {
      qOptions: {
        qTypes: ["sheet"],
        qIncludeSessionObjects: false,
        qData: {},
      },
    };

    const objs: any = await qDoc?.getObjects(qOptionsSheet.qOptions);
    const myList: sheetsResponseData[] = objs.map((sheet: any) =>  {
      return {
        sheetId: sheet.qInfo.qId, 
        title: sheet.qMeta.title
      }
    })

    configApp.sheets = myList;
  }

  if(configApp) loadPage(configApp);
})();