import { useState } from "react";
import Navbar from "./components/Navbar";
import TenableLoad from "./components/TenableLoad";
import LocalLoad from "./components/LocalLoad";
import JsonTable from "./components/JsonTable";
import PieChart from "./components/PieChart";
import SourceSelector from "./components/SourceSelector";
import BDLoad from "./components/BDLoad";

//const root = createRoot(document.getElementById("root")); // Create the root

function App() {
  const [parsedJson, setParsedJson] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleJsonParsed = (parsedJsonData: any) => {
    // Handle the parsed JSON data by updating the state
    setParsedJson(parsedJsonData);
  };

  const sources = [
    {
      label: "Registro en BD",
      component: <BDLoad onJsonParsed={handleJsonParsed} />,
    },
    {
      label: "Carga Tenable",
      component: <TenableLoad onJsonParsed={handleJsonParsed} />,
    },
    {
      label: "Carga Local",
      component: <LocalLoad onJsonParsed={handleJsonParsed} />,
    },
  ];

  return (
    <div>
      <Navbar /> {/* Pass the handler as a prop */}
      {/* <Fechas /> */}
      <SourceSelector sources={sources} />
      {parsedJson && <JsonTable parsedJson={parsedJson} />}
      <PieChart />
    </div>
  );
}

// root.render(<App />); // Render the App component

export default App;
