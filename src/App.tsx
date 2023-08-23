// import ListGroup from "./components/ListGroup";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import PieChart from "./components/PieChart";
import Fechas from "./components/Fechas";
import SimpleForm from "./components/SimpleForm";
import UploadJSONFile from "./components/UploadJSONFile";

function App() {
  const handleJsonParsed = (parsedJson) => {
    // Handle the parsed JSON data here
    console.log("Parsed JSON data:", parsedJson);
    // You can use this data to update your state or perform other actions
  };

  return (
    <div>
      <Navbar />
      <Fechas />
      <SimpleForm />
      <UploadJSONFile onJsonParsed={handleJsonParsed} />
      <Table />
      <PieChart />
      {/* <ListGroup /> */}
    </div>
  );
}

export default App;
