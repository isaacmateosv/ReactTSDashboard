import { useState, useEffect } from "react";

function MainView({ onJsonParsed }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({}); // State to store the fetched data

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/download-collection");
      const jsonData = await response.json();

      // Trim the "_id" key and continue parsing from "ID_Vulnerabilidad"
      const trimmedData = jsonData[0];

      setData(trimmedData); // Store the data in state
      onJsonParsed(trimmedData); // Call the prop function to pass the data to App
    } catch (error) {
      console.error("Error al traer la data.", error);
    }
    setIsLoading(false);
  };

  const downloadDataAsJsonFile = () => {
    if (data) {
      // Create a Blob with the JSON data
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "Reporte_Colección.json";
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
      &nbsp;
      <form className="d-flex justify-content-center" role="search">
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
          disabled={isLoading || !data}
        >
          Descargar Registro
        </button>
      </form>
      &nbsp;
    </>
  );
}

export default MainView;
