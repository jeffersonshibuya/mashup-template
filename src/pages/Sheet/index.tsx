import { QdtViz } from 'qdt-components';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppConfig } from '../../context/SheetContext';
import QdtComponent from '../../components/QdtComponent';

import { Content, Chart } from './styles';
import { container, fadeIn, item } from '../../util/animation';
import { motion } from 'framer-motion';

const Sheet: React.FC = () => {
  const [objectSize, setObjectSize] = useState(() => {
    return 75;
  });

  window.onorientationchange = () => {
    if (window.screen.orientation.type === 'portrait-primary') {
      setObjectSize(75);
    } else {
      setObjectSize(140);
    }
  };

  // const { params } = useRouteMatch<RouteParams>();
  const {sheets} = useAppConfig();
  let { sheetId } = useParams();

  const sheet = sheets.find(sheetObj => sheetObj.id === sheetId)!;

  return (
      <motion.div key={sheetId} variants={container} initial="hidden" animate="show">
        <div className="py-4 px-2">
          <div className="">
            <div className="container">
              <strong className="text-3xl dark:text-white">{sheet?.title}</strong>
            </div>
          </div>
          <Content columns={sheet?.columns} rows={sheet?.rows}>
            {sheet?.cells?.map(cell => {
              return (
                <Chart
                  columnStart={cell.col + 1}
                  columnEnd={cell.col + (cell.colspan + 1)}
                  rowStart={cell.row + 1}
                  rowEnd={cell.row + (cell.rowspan + 1)}
                  key={cell.name}
                  type={cell.type}
                  className="border border-gray-300 overflow-hidden bg-white" 
                >
                  <QdtComponent
                    component={QdtViz}
                    properties={{}}
                    options={{
                      id: cell.name,
                      height: `${cell.rowspan * (objectSize / sheet.rows)}vh`,
                    }}
                    appIndex={2}
                  />
                </Chart>
              );
            })}
          </Content>

         
          {/* <Content columns={sheet?.columns} rows={sheet?.rows}>
            {sheet?.cells.map(cell => {
              return (
                <Chart
                  columnStart={cell.col + 1}
                  columnEnd={cell.col + (cell.colspan + 1)}
                  rowStart={cell.row + 1}
                  rowEnd={cell.row + (cell.rowspan + 1)}
                  key={cell.name}
                  type={cell.type}
                >
                  <QdtComponent
                    component={QdtViz}
                    properties={{}}
                    appIndex={2}
                    props={{
                      id: '4b88c18b-4ffb-4c38-8df9-fec7541353ac',
                      height: `${cell.rowspan * (objectSize / sheet.rows)}vh`,
                    }}
                    key={cell.name}
                  />
                </Chart>
              );
            })}
          </Content> */}
        </div>
      </motion.div>
  );
};

export default Sheet;
