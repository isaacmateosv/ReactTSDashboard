import { useState } from "react";
import JsonTable from "./components/JsonTable";
import PieChart from "./components/PieChart";
import SourceSelector from "./components/SourceSelector";
import CurrentSelection from "./components/CurrentSelection";
import BDLoad from "./components/BDLoad";
import TenableLoad from "./components/TenableLoad";
import LocalLoad from "./components/LocalLoad";
import Navbar from "./components/Navbar";

interface ParsedJson {
  keys: string[];
  data: object;
}

function App() {
  const [parsedJson, setParsedJson] = useState<ParsedJson | null>(null);
  const [selectedSource, setSelectedSource] = useState("Registro en BD"); // Initialize with the default source label

  const handleJsonParsed = (
    parsedJsonData: ParsedJson,
    sourceLabel: string
  ) => {
    // Handle the parsed JSON data by updating the state
    setParsedJson(parsedJsonData);
    setSelectedSource(sourceLabel); // Update the selected source based on the method
  };

  const sources = [
    {
      label: "Registro en BD",
      component: (
        <BDLoad
          BDJsonParsed={(parsedJsonData) =>
            handleJsonParsed(parsedJsonData, "Registro en BD")
          }
        />
      ),
    },
    {
      label: "Carga Tenable",
      component: (
        <TenableLoad
          TenableJsonParsed={(parsedJsonData) =>
            handleJsonParsed(parsedJsonData, "Carga Tenable")
          }
        />
      ),
    },
    {
      label: "Carga Local",
      component: (
        <LocalLoad
          LocalJsonParsed={(parsedJsonData) =>
            handleJsonParsed(parsedJsonData, "Carga Local")
          }
        />
      ),
    },
  ];

  const appStyle = {
    border: "5% solid #000", // 5% border with black color
    padding: "10px", // Optional: Add padding inside the border
    paddingTop: "5rem", // Optional: Add padding inside the border
  };

  return (
    <div style={appStyle}>
      <div className="navbar-container">
        <Navbar /> {/* Pass the handler as a prop */}
      </div>
      {/* <Fechas /> */}
      <SourceSelector
        sources={sources}
        activeSource={selectedSource}
        onSourceChange={setSelectedSource}
      />
      <CurrentSelection source={selectedSource} />
      {parsedJson && <JsonTable parsedJson={parsedJson} />}
      <PieChart />
    </div>
  );
}

export default App;
