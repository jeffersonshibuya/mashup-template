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
};

export const AppConfigContext = createContext<appContextType>(
  appContextDefaultValues
);

export function useAppConfig() {
  return useContext(AppConfigContext);
}

export function QdtConfig(config: QdtConfigType) {
  const capabilityApiAppPromise = qdtCapabilityApp(config);
  const engineApiAppPromise = qdtEnigma(config);

  return {capabilityApiAppPromise, engineApiAppPromise}
}

export function AppConfigProvider({children, appConfigData}: Props) {
  const [sheets, setSheets] = useState<sheetData[]>([]);
  const [config, setConfig] = useState<QdtConfigType>();
  


  const identity = Math.random().toString(32);

  const connectionConfig: QdtConfigType = {
    host: appConfigData.host,
    secure: true,
    port: 443,
    prefix: "",
    appId: "4575c49b-e07c-4224-8391-0bb4a879e238",
    identity
  }

  const {capabilityApiAppPromise, engineApiAppPromise} = QdtConfig(connectionConfig)

  useEffect(() => {
    async function init() {

      setConfig(connectionConfig)      
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
    sheets: sheets
  };

  return (
    <AppConfigContext.Provider value={value}>{children}</AppConfigContext.Provider>
  );
}



// export const SheetContext = React.createContext<sheetData[]>([]);