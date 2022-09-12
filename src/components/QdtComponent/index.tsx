import { useEffect, useRef } from 'react';
import {
  qdtCapabilityApp, qdtCompose, qdtEnigma, QdtViz
} from 'qdt-components';

const identity = Math.random().toString(32);

export const config = {
  host: "qap.ipc-global.com",
  secure: true,
  port: 443,
  prefix: "",
  appId: "6784659c-35b0-4f39-8389-8923ceafad1f",
  identity
}

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
    <div ref={elementRef} />
  );
}

export default QdtComponent;
