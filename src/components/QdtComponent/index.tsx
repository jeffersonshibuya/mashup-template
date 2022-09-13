import { useEffect, useRef } from 'react';
import {
  qdtCapabilityApp, qdtCompose, qdtEnigma, QdtViz
} from 'qdt-components';
import { useAppConfig } from '../../context/SheetContext';

// const identity = Math.random().toString(32);

// export const config = {
//   host: "qap.ipc-global.com",
//   secure: true,
//   port: 443,
//   prefix: "",
//   appId: "4575c49b-e07c-4224-8391-0bb4a879e238",
//   identity
// }

// const capabilityApiAppPromise = qdtCapabilityApp(config);
// const engineApiAppPromise = qdtEnigma(config);


function QdtComponent({
  component, properties, options, appIndex,
}: any) {
  const elementRef = useRef(null);
  const {GetCapabilitiesPromise, GetEnginePromise} = useAppConfig();

  const init = async () => {
    
    let app = await GetEnginePromise();

    if (appIndex === 2) {
      app = await GetCapabilitiesPromise();
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
    <>
      {elementRef.current === null && <div>LOADING...</div>}
      <div ref={elementRef} />
    </>
  );
}

export default QdtComponent;
