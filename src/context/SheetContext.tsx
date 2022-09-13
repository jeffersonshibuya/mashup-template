import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { qdtCapabilityApp } from 'qdt-components';
import {qdtEnigma} from 'qdt-components';
import { appContextType, mashupConfigData, QdtConfigType, sheetData } from '../types';

type Props = {
  children: ReactNode;
  appConfigData: mashupConfigData;
};

const appContextDefaultValues: appContextType = {
  sheets: [],
  GetCapabilitiesPromise: () => {},
  GetEnginePromise: () => {},
};

export const AppConfigContext = createContext<appContextType>(
  appContextDefaultValues
);

export function useAppConfig() {
  return useContext(AppConfigContext);
}

export function AppConfigProvider({children, appConfigData}: Props) {
  const [sheets, setSheets] = useState<sheetData[]>([]);
 
  const identity = Math.random().toString(32);

  const connectionConfig: QdtConfigType = {
    host: appConfigData.host,
    secure: true,
    port: 443,
    prefix: "",
    appId: appConfigData.appId,
    identity
  }

  function GetCapabilitiesPromise() {
    return qdtCapabilityApp(connectionConfig);
  }

  function GetEnginePromise() {
    return qdtEnigma(connectionConfig);
  }

  useEffect(() => {
    async function init() {

      const app = await qdtEnigma(connectionConfig);

      const sheetsList: sheetData[] = [];

      for(const sheet of appConfigData.sheets) {
  
        const obj = await app.getObject(sheet.sheetId);
        const layout = await obj.getLayout();
  
        sheetsList.push({
          id: String(sheet.sheetId),
          title: sheet.title ? sheet.title : layout.qMeta.title,
          cells: layout.cells,
          columns: layout.columns,
          rows: layout.rows,
        })
      }

      setSheets(sheetsList);
    }

    init();
  }, [])

  const value = {
    sheets: sheets,
    GetCapabilitiesPromise,
    GetEnginePromise
  };

  return (
    <AppConfigContext.Provider value={value}>{children}</AppConfigContext.Provider>
  );
}