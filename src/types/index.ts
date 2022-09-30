// import { IconType } from 'react-icons/lib/esm';

export type mashupConfigData = {
  server: string;
  name: string;
  appId: string;
  isCloud?: boolean;
  isAnonAccess?: boolean;
  webIntegrationId?: string;
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