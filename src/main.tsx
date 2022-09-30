import React from 'react';
import enigma from 'enigma.js';
import schema from 'enigma.js/schemas/12.936.0.json';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';
import { api } from './services/api';
import { mashupConfigData, sheetData, sheetsResponseData } from './types';
import { GetMashupConfig, QdtConfigConnection, QdtConfigData } from './util/QdtConfig';


import { Auth, AuthType, Config } from '@qlik/sdk';
import { qdtEnigma } from 'qdt-components';

function loadPage(appConfigData: mashupConfigData, sheetsList: sheetData[]): void {

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <WrappedApp appConfigData={appConfigData} sheetsList={sheetsList}/>
    </React.StrictMode>
  );
}


const jwtEndpoint = 'https://dnikbxehetoshbd63t2hcwdjfm0ocsho.lambda-url.us-east-1.on.aws/'

async function getJWTToken() {
  console.log('Generating JWT token...');
  // try {
    return await fetch(jwtEndpoint, {
      mode: 'cors',
      method: 'GET',
    })
  // } catch (error) {
  //   console.log('---- ERROR', error)
  // }
}

async function sheetsListFormatCloud(authInstance: Auth, app: any) {
  // Sheets config
  const sheetsList: sheetData[] = [];

  const wssUrl = await authInstance.generateWebsocketUrl(app.appId);
  const enigmaGlobal: any = await enigma.create({ schema, url: wssUrl }).open();
  const qDoc = await enigmaGlobal.openDoc(app.appId)

  const qOptionsSheet = {
    qOptions: {
      qTypes: ["sheet"],
      qIncludeSessionObjects: false,
      qData: {},
    },
  };

  const objs: any = await qDoc?.getObjects(qOptionsSheet.qOptions);

  for(const sheet of objs) {

    const obj = await qDoc.getObject(sheet.qInfo.qId);
    const layout = await obj.getLayout();

    sheetsList.push({
      id: String(sheet.qInfo.qId),
      title: layout.qMeta.title,
      cells: layout.cells,
      columns: layout.columns,
      rows: layout.rows,
    })
  }

  return sheetsList;
}

async function sheetsListFormat(configApp: mashupConfigData) {
  // Sheets config
  const sheetsListFormatted: sheetData[] = [];
  const sheetsList: sheetsResponseData[] = configApp.sheets;

  const qDoc = await qdtEnigma({
    ...configApp,
    host: configApp.server
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
    })
  }

  return sheetsListFormatted;
}

(async function getApp() {

  // const isAnon = true;
  const sheetsList: sheetData[] = [];

  const configApp = await GetMashupConfig();

  if(configApp) {
    const sheetsListFormatted = await sheetsListFormat(configApp)
    sheetsList.push(...sheetsListFormatted)
  }

  // const app = {
  //   url: 'ipc-lab.us.qlikcloud.com',
  //   webIntegrationId: 'JqbUeBR8thgedYXpOJOsarV8n_mALCYG',
  //   appId: 'c8242e68-f4d4-47b0-be6b-e01397d614a1',
  //   sheets: []
  // };

  // -----------------------------------------------------------------------------
  // Check anon and get sheets list

  // if(isAnon) {
  //   console.log('anon user')

  //   const userLogged = await fetch(`https://${app.url}/api/v1/users/me`, {
  //     method: 'GET',
  //     mode: 'cors',
  //     credentials: 'include',
  //     headers: {
  //       'qlik-web-integration-id': app.webIntegrationId
  //     },
  //   })

  //   console.log(userLogged)


  //   if(userLogged.status === 401) {
  //     console.log('user not connected')
  //     // Login
  //     const response = await getJWTToken()
  //     const token = await response.json()
  //     await fetch(`https://${app.url}/login/jwt-session?qlik-web-integration-id=${app.webIntegrationId}/`, {
  //       method: 'POST',
  //       credentials: 'include',
  //       mode: 'cors',
  //       headers: {
  //         'authorization': `Bearer ${token}`,
  //         'qlik-web-integration-id': app.webIntegrationId
  //       },
  //     })

  //     window.location.href = 'http://localhost:3000/twitter'
  //   } else {
  //     console.log(await userLogged.json())

  //     const authInstance = new Auth({
  //       webIntegrationId: app.webIntegrationId,
  //       autoRedirect: false,
  //       authType: AuthType.WebIntegration,
  //       host: app.url.replace(/^https?:\/\//, '').replace(/\/?/, ''),
  //     });

  //     const sheetsListFormatted = await sheetsListFormat(authInstance, app)
  //     sheetsList.push(...sheetsListFormatted)
  //   }
  // } else {
  //   const authInstance = new Auth({
  //     webIntegrationId: app.webIntegrationId,
  //     autoRedirect: true,
  //     authType: AuthType.WebIntegration,
  //     host: app.url.replace(/^https?:\/\//, '').replace(/\/?/, ''),
  //   });

  //   if (!authInstance.isAuthenticated()) {
  //     authInstance.authenticate();
  //   } else {
  //     console.log('user authenticate', await authInstance.rest('/users/me'))
  //     const sheetsListFormatted = await sheetsListFormat(authInstance, app)
  //     sheetsList.push(...sheetsListFormatted)
  //   }
  // }

  // -----------------------------------------------------------------------------

  
  /**  Config APP  */
  // console.log('config app')

  if(configApp) loadPage(configApp, sheetsList);
})();