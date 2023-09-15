import { useState } from "react";
import Navbar from "./components/Navbar";
import SimpleForm from "./components/TenableLoad";
import LocalLoad from "./components/LocalLoad";
import JsonTable from "./components/JsonTable";
import PieChart from "./components/PieChart";
import SourceSelector from "./components/SourceSelector";
import MainView from "./components/MainView";

//const root = createRoot(document.getElementById("root")); // Create the root

function App() {
  const [parsedJson, setParsedJson] = useState(null);

  const handleJsonParsed = (parsedJsonData: any) => {
    // Handle the parsed JSON data by updating the state
    setParsedJson(parsedJsonData);
  };

  const sources = [
    {
      label: "Registro en BD",
      component: <MainView onJsonParsed={handleJsonParsed} />,
    },
    {
      label: "Carga Tenable",
      component: <SimpleForm />,
    },
    {
      label: "Carga local",
      component: <LocalLoad onJsonParsed={handleJsonParsed} />,
    },
  ];

  return (
    <div>
      <Navbar onJsonParsed={handleJsonParsed} />{" "}
      {/* Pass the handler as a prop */}
      {/* <Fechas /> */}
      <SourceSelector sources={sources} />
      {parsedJson && <JsonTable parsedJson={parsedJson} />}
      <PieChart />
    </div>
  );
}

// root.render(<App />); // Render the App component

export default App;
