// import ListGroup from "./components/ListGroup";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import PieChart from "./components/PieChart";
import Fechas from "./components/Fechas";
import SimpleForm from "./components/SimpleForm";

function App() {
  return (
    <div>
      <Navbar />
      <Fechas />
      <SimpleForm />
      <Table />
      <PieChart />
      {/* <ListGroup /> */}
    </div>
  );
}

export default App;
