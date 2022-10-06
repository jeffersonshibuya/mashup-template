import { api } from "../services/api";
import { mashupConfigData } from "../types";

const identity = Math.random().toString(32);
// const jwtEndpoint = 'https://dnikbxehetoshbd63t2hcwdjfm0ocsho.lambda-url.us-east-1.on.aws/'


let QdtConfigData = {
  host: '',
  secure: true,
  port: 443,
  prefix: "",
  appId: '',
  webIntegrationId: '',
  token: ''
}

let configData: mashupConfigData = {} as mashupConfigData; 

async function QdtConfigConnection() {
  let url = window.location.toString();
  const appName = url.split('/')[3];

  if(!appName) {
    window.location.href = 'https://ipc-global.com'
  }

  const configApp = await api.post<mashupConfigData>('app', { 
    action: 'get',
    name: appName
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  QdtConfigData = {
    ...QdtConfigData,
    host: configApp.data.server.serverUrl,
    appId: configApp.data.appId,
  } 

  configData = configApp.data

  return configData;
}

async function GetMashupConfig() {
  if(configData.server.serverUrl !== '' && configData.appId !== '') {
    return configData
  } else {
    await QdtConfigConnection();
  }
}


export {QdtConfigConnection, QdtConfigData, GetMashupConfig}