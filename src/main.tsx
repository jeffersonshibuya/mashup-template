import React from 'react';
import enigma from 'enigma.js';
import schema from 'enigma.js/schemas/12.936.0.json';
import { qdtEnigma } from 'qdt-components';
import ReactDOM from 'react-dom/client';
import { Auth, AuthType } from '@qlik/sdk';

import { WrappedApp } from './App';
import { mashupConfigData, sheetData, sheetsResponseData } from './types';
import { GetMashupConfig } from './util/QdtConfig';
import LoadingPage from './components/LoadingPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

function loadPage(appConfigData: mashupConfigData, sheetsList: sheetData[]): void {
  sheetsList = sheetsList.sort((a, b) => (a.sortOrder || 1) - (b.sortOrder || 0))
  root.render(
    <React.StrictMode>
      <WrappedApp appConfigData={appConfigData} sheetsList={sheetsList}/>
    </React.StrictMode>
  );
}

const defaultAnonUrl = 'https://dnikbxehetoshbd63t2hcwdjfm0ocsho.lambda-url.us-east-1.on.aws/'

async function getJWTToken(jwtEndpoint: string) {
  return await fetch(jwtEndpoint, {
    mode: 'cors',
    method: 'GET',
  })
}

async function sheetsListFormatCloud(authInstance: Auth, configApp: any) {
  // Sheets config
  const sheetsListFormatted: sheetData[] = [];
  const sheetsList: sheetsResponseData[] = configApp.sheets;

  const wssUrl = await authInstance.generateWebsocketUrl(configApp.appId);
  const enigmaGlobal: any = await enigma.create({ schema, url: wssUrl }).open();
  const qDoc = await enigmaGlobal.openDoc(configApp.appId)
  
  const qOptionsSheet = {
    qOptions: {
      qTypes: ["sheet"],
      qIncludeSessionObjects: false,
      qData: {},
    },
  };

  // No sheets specified, get all sheets from the APP
  if(sheetsList.length === 0) {
    const appSheets: any = await qDoc.getObjects(qOptionsSheet.qOptions);
    sheetsList.push(...appSheets
      .filter((sheetInfo: any) => sheetInfo.qMeta.published === true)
      .map((sheet: any) => {
        return {
          sheetId: sheet.qInfo.qId,
          title: sheet.qMeta.title,
        }
    }))
  }

  for(const sheet of sheetsList) {

    const obj = await qDoc.getObject(sheet.sheetId);
    const layout = await obj.getLayout();

    sheetsListFormatted.push({
      id: String(sheet.sheetId),
      title: sheet.title,
      cells: layout.cells,
      columns: layout.columns,
      rows: layout.rows,
      sortOrder: sheet.sortOrder
    })
  }

  return sheetsListFormatted;
}

async function sheetsListFormat(configApp: mashupConfigData) {
  // Sheets config
  const sheetsListFormatted: sheetData[] = [];
  const sheetsList: sheetsResponseData[] = configApp.sheets;

  const qDoc = await qdtEnigma({
    ...configApp,
    host: configApp.server.serverUrl
  });

  const qOptionsSheet = {
    qOptions: {
      qTypes: ["sheet"],
      qIncludeSessionObjects: false,
      qData: {},
    },
  };

  // No sheets specified, get all sheets from the APP
  if(sheetsList.length === 0) {
    const appSheets: any = await qDoc.getObjects(qOptionsSheet.qOptions);
    sheetsList.push(...appSheets.map((sheet: any) => {
      return {
        sheetId: sheet.qInfo.qId,
        title: sheet.qMeta.title,
      }
    }))
  }

  for(const sheet of sheetsList) {

    const obj = await qDoc.getObject(sheet.sheetId);
    const layout = await obj.getLayout();

    sheetsListFormatted.push({
      id: String(sheet.sheetId),
      title: sheet.title,
      cells: layout.cells,
      columns: layout.columns,
      rows: layout.rows,
      sortOrder: sheet.sortOrder
    })
  }

  return sheetsListFormatted;
}


(async function getApp() {

  root.render(
    <React.StrictMode>
     <LoadingPage />
    </React.StrictMode>
  )

  const sheetsList: sheetData[] = [];

  const configApp = await GetMashupConfig();

  console.log(configApp)
  if(!configApp?.server.isCloud) {
    if(configApp) {
      const sheetsListFormatted = await sheetsListFormat(configApp)
      sheetsList.push(...sheetsListFormatted)
    }
  } else {
    if(configApp.server.isAnonAccess) {
      const userLogged = await fetch(`https://${configApp.server.serverUrl}/api/v1/users/me`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'qlik-web-integration-id': configApp.server.webIntegrationId!
        },
      })

      if(userLogged.status === 401) {
        // Login
        const response = await getJWTToken(configApp.server.anonUrl || defaultAnonUrl)
        const token = await response.json()
        const res = await fetch(`https://${configApp.server.serverUrl}/login/jwt-session?qlik-web-integration-id=${configApp.server.webIntegrationId}/`, {
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
            'qlik-web-integration-id': configApp.server.webIntegrationId!
          },
        })

        // refresh the page to the same url request
        window.location.href = window.location.href; 
      } else {
        const authInstance = new Auth({
          webIntegrationId: configApp.server.webIntegrationId,
          autoRedirect: false,
          authType: AuthType.WebIntegration,
          host: configApp.server.serverUrl.replace(/^https?:\/\//, '').replace(/\/?/, ''),
        });

        const sheetsListFormatted = await sheetsListFormatCloud(authInstance, configApp)
        sheetsList.push(...sheetsListFormatted)
      }
      
    } else {
      const authInstance = new Auth({
        webIntegrationId: configApp.server.webIntegrationId,
        autoRedirect: true,
        authType: AuthType.WebIntegration,
        host: configApp.server.serverUrl.replace(/^https?:\/\//, '').replace(/\/?/, ''),
      });

      if (!authInstance.isAuthenticated()) {
        authInstance.authenticate();
      } else {
        const sheetsListFormatted = await sheetsListFormatCloud(authInstance, configApp)
        sheetsList.push(...sheetsListFormatted)
      }
    }
  }
  
  if(configApp) loadPage(configApp, sheetsList);
})();