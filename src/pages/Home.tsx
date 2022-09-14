import { QdtViz } from "qdt-components";
import QdtComponent from "../components/QdtComponent";
import { useAppConfig } from "../context/SheetContext";

function Home() {

  const { sheets } = useAppConfig();

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      {/* <ul>
        {sheets.map(sheet => <li key={sheet.id}>{JSON.stringify(sheet)}</li>)}
      </ul> */}

      {/* <QdtComponent
        component={QdtViz}
        properties={{}}
        options={{
          id: '4b88c18b-4ffb-4c38-8df9-fec7541353ac',
          height: `600px`,
        }}
        appIndex={2}
      /> */}
    </>
  )
}

export default Home;
