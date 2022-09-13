import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';
import { api } from './services/api';
import { mashupConfigData, sheetData, sheetsResponseData } from './types';

function loadPage(appConfigData: mashupConfigData): void {

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <WrappedApp appConfigData={appConfigData}/>
    </React.StrictMode>
  );
}

(async function getApp() {
  const sheets: sheetData[] = [];
  
  const configApp = await api.post<mashupConfigData>('', { name: 'nfl'}, {
    headers: {
      "Content-Type": "application/json",
    },
  })



    // if (qDoc) {

    //   for(const sheet of sheetsList) {
    //     const iconName: string = sheet.iconName || 'FiLink';

    //     const obj = await qDoc.getObject(sheet.sheetid);
    //     const layout = await obj.getLayout();

    //     sheets.push({
    //       id: String(sheet.sheetid),
    //       title: sheet.tabName ? sheet.tabName : layout.qMeta.title,
    //       cells: layout.cells,
    //       columns: layout.columns,
    //       rows: layout.rows,
    //       bgImageUrl: sheet.bgImageUrl || '',
    //       bgImagePosition: sheet.bgImageUrlPosition || 'center',
    //       menuIcon: (FeatherIcons as any)[iconName],
    //       iconColor: sheet.iconColor
    //     })
    //   }
    // }
    loadPage(configApp.data);
})();