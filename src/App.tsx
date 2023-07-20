import ListGroup from "./components/ListGroup";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import PieChart from "./components/PieChart";
import DatePicker from "./components/DatePicker";

function App() {
  return (
    <div>
      <Navbar />
      <DatePicker />
      <Table />
      <PieChart />
      <ListGroup />
    </div>
  );
}

export default App;
