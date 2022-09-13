import QdtComponent from "../components/QdtComponent";
import { QdtViz } from "qdt-components";

function Test() {
  return (
    <>
      <h1>Test Page</h1>
      <QdtComponent
        component={QdtViz}
        properties={{}}
        options={{
          id: 'SNPNH',
          height: `600px`,
        }}
        appIndex={2}
      />
    </>
  )
}

export default Test;