// import ListGroup from "./components/ListGroup";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import PieChart from "./components/PieChart";
import Fechas from "./components/Fechas";
import SimpleForm from "./components/SimpleForm";
import JsonUploader from "./components/JsonUploader";

function App() {
  return (
    <div>
      <Navbar />
      <Fechas />
      <SimpleForm />
      <JsonUploader />
      <Table />
      <PieChart />
      {/* <ListGroup /> */}
    </div>
  );
}

export default App;
