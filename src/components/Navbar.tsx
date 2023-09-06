import React, { useState, useEffect } from "react";

function Navbar({ onJsonParsed }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]); // State to store the fetched data

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/download-collection");
      const jsonData = await response.json();

      // Trim the "_id" key and continue parsing from "ID_Vulnerabilidad"
      const trimmedData = jsonData.map((item) => {
        const { _id, ...rest } = item;
        return rest;
      });

      setData(trimmedData); // Store the data in state
      onJsonParsed(trimmedData); // Call the prop function to pass the data to App
    } catch (error) {
      console.error("Error al traer la data:", error);
    }
    setIsLoading(false);
  };

  const downloadDataAsJsonFile = () => {
    if (data.length > 0) {
      // Create a Blob with the JSON data
      const blob = new Blob([JSON.stringify(data[0], null, 2)], {
        type: "application/json",
      });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.json";
      a.click();

      // Revoke the URL to free up memory
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand fs-2 fw-bold">Tenable Dashboard</a>
          <form className="d-flex" role="search">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={fetchData}
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Cargar Registro"}
            </button>
            <button
              className="btn btn-outline-primary ms-2"
              type="button"
              onClick={downloadDataAsJsonFile}
              disabled={isLoading || data.length === 0}
            >
              Descargar JSON
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
