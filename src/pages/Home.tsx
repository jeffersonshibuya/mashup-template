import { useEffect } from "react";
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

  useEffect(() => {
    api.post<mashupConfigData>('', 
    {
      name: 'nfl',
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => console.log(response.data))
  }, [])

  return <h1 className="text-3xl font-bold underline">Hello World</h1>;
}

export default Home;
