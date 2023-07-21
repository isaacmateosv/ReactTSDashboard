import ListGroup from "./components/ListGroup";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import PieChart from "./components/PieChart";
import Fechas from "./components/Fechas";

function App() {
  return (
    <div>
      <Navbar />
      <Fechas />
      <Table />
      <PieChart />
      <ListGroup />
    </div>
  );
}

export default App;
