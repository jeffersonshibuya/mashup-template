import { useEffect, useRef } from 'react';
import {
  qdtCapabilityApp, qdtCompose, qdtEnigma, QdtViz
} from 'qdt-components';
import { QdtConfigConnection, QdtConfigData } from '../../util/QdtConfig';
import { item } from '../../util/animation';
import { motion } from 'framer-motion';

await QdtConfigConnection();
const config = QdtConfigData;

const capabilityApiAppPromise = qdtCapabilityApp(config);
const engineApiAppPromise = qdtEnigma(config);

function QdtComponent({
  component, properties, options, appIndex,
}: any) {
  const elementRef = useRef(null);

  const init = async () => {

    let app = await engineApiAppPromise;

    if (appIndex === 2) {
      app = await capabilityApiAppPromise;
      QdtViz({
        element: elementRef.current,       
        app,
        options,
      });
    } else {
      qdtCompose({
        element: elementRef.current,
        component,
        app,
        properties,
        options,
      });
    }
  };

  useEffect(() => {
    if (elementRef) init();
  }, [init]);

  

  return (
    <motion.div variants={item} ref={elementRef} />
  );
}

export default QdtComponent;
