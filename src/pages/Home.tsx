import { useAppConfig } from "../context/SheetContext";

function Home() {

  const { sheets } = useAppConfig();

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <ul>
        {sheets.map(sheet => <li key={sheet.id}>{sheet.id}</li>)}
      </ul>
    </>
    )
}

export default Home;
