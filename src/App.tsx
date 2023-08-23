// import React from "react";
import Navbar from "./components/Navbar";
import Fechas from "./components/Fechas";
import SimpleForm from "./components/SimpleForm";
import UploadJSONFile from "./components/UploadJSONFile";
import Table from "./components/Table";
import PieChart from "./components/PieChart";

function App() {
  const handleFileUpload = (file: File) => {
    // Process the uploaded file as needed
    console.log("Uploaded file:", file.name);
    // You can also store it in the state if necessary
  };

  return (
    <div>
      <Navbar />
      <Fechas />
      <SimpleForm />
      <UploadJSONFile onFileUpload={handleFileUpload} />
      <Table />
      <PieChart />
    </div>
  );
}

export default App;
