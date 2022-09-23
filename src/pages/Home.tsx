import { motion } from "framer-motion";
import { QdtViz } from "qdt-components";
import { useParams } from "react-router-dom";
import QdtComponent from "../components/QdtComponent";
import { useAppConfig } from "../context/SheetContext";
import { container, item, slideUp } from "../util/animation";

function Home() {

  const { sheets } = useAppConfig();
  let { appName } = useParams();
  

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {appName}
      {/* <div className="h-screen">
        <motion.ul
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {[0, 1, 2, 3].map((index) => (
            <motion.li key={index} variants={item}>ITEM</motion.li>
          ))}
        </motion.ul>
      </div> */}
      <motion.h1 variants={item}  className="text-3xl font-bold underline">Hello World</motion.h1>
      <motion.h1 variants={item}  className="text-3xl font-bold underline">Hello World</motion.h1>
      <motion.h1 variants={item}  className="text-3xl font-bold underline">Hello World</motion.h1>
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
    </motion.div>
  )
}

export default Home;
