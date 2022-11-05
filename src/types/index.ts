// import { IconType } from 'react-icons/lib/esm';

export type mashupConfigData = {
  appId: string;
  name: string;
  server: {
    anonUrl: string;
    isCloud: boolean,
    webIntegrationId: string;
    name: string;
    isAnonAccess: boolean,
    serverUrl: string;
  },
  sheets: sheetsResponseData[]
}

export type appContextType = {
  sheets: sheetData[];
  // GetCapabilitiesPromise: any,
  // GetEnginePromise: any,
};

export type sheetsResponseData = {
  sheetId: string;
  title: string;
  sortOrder: number;
}

export type QdtConfigType = {
  host: string;
  secure: boolean;
  port: number;
  prefix: string;
  appId: string;
  identity?: string;
  webIntegrationId?: string;
  token?: string;
}


export type sheetData = {
  id: string;
  title: string;
  cells: Array<Cells>;
  columns: number;
  rows: number;
  sortOrder: number;
  // menuIcon?: IconType | undefined;
  // iconColor?: string;
  // bgImageUrl?: string;
  // bgImagePosition?: string;
  // menuIndex: number;
};

type Cells = {
  bounds: Array<Bounds>;
  col: number;
  colspan: number;
  name: string;
  row: number;
  rowspan: number;
  type: string;
};

type Bounds = {
  height: DoubleRange;
  width: DoubleRange;
  x: number;
  y: number;
};