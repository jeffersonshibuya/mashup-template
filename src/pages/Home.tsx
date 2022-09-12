import { qdtEnigma } from "qdt-components";
import { useEffect, useState } from "react";
import { Enigma } from "../config/globalApp";
import { api } from "../services/api";

type mashupConfigData = {
  host: string;
  name: string;
  sheets: {
    sheetId: string;
    title: string;
  }[]
}

function Home() {

  const [appConfig, setAppConfig] = useState<mashupConfigData>();

  useEffect(() => {
    api.post<mashupConfigData>('', 
    {
      name: 'nfl',
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      setAppConfig(response.data)

      // for(const sheet of response.data.sheets) {
      //   Enigma().then(global => {
      //     global.openDoc('4575c49b-e07c-4224-8391-0bb4a879e238')
      //     .then((doc: any) => {
      //       console.log(doc.getObject(sheet.sheetId))
      //     })
      //   });
      // }
      const identity = Math.random().toString(32);

      let config = {
        host: 'qap.ipc-global.com',
        secure: true,
        port: 443,
        prefix: "",
        appId: "4575c49b-e07c-4224-8391-0bb4a879e238",
        identity
      }
      // const engineApiAppPromise = qdtEnigma(config);

      for(const sheet of response.data.sheets) {
        qdtEnigma(config).then(app => {
          app.getObject(sheet.sheetId).then((obj: any) => {
            obj.getLayout().then((layout: any) => {
              console.log('layout', layout)
            })
          })
        });
      }
    })
  }, [])

  return <h1 className="text-3xl font-bold underline">Hello World</h1>;
}

export default Home;
