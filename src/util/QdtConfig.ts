import { api } from "../services/api";
import { mashupConfigData } from "../types";

const identity = Math.random().toString(32);

let QdtConfigData = {
  host: '',
  secure: true,
  port: 443,
  prefix: "",
  appId: '',
  identity
}

let configData: mashupConfigData = {} as mashupConfigData; 

async function QdtConfigConnection() {

  const configApp = await api.post<mashupConfigData>('', { name: 'nfl'}, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  QdtConfigData = {
    ...QdtConfigData,
    host: configApp.data.host,
    appId: configApp.data.appId,
  } 

  configData = configApp.data

  return configData;
}

function GetMashupConfig() {
  if(configData.host !== '' && configData.appId !== '') {
    return configData
  } else {
    QdtConfigConnection();
  }
}


export {QdtConfigConnection, QdtConfigData, GetMashupConfig}