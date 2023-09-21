import { useState, useEffect } from "react";

interface ParsedJson {
  // Define the structure of ParsedJson if it's not already defined
  keys: string[];
  data: object;
}

interface BDLoadProps {
  BDJsonParsed: (parsedJsonData: ParsedJson) => void;
}

//BD LOAD
function BDLoad({ BDJsonParsed }: BDLoadProps) {
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
      BDJsonParsed(trimmedData); // Call the prop function to pass the data to App
    } catch (error) {
      console.error("Error al traer la data.", error);
    }
    setIsLoading(false);
  };

  const downloadDataAsJsonFile = () => {
    if (data) {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const year = currentDate.getFullYear();
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");
      const period = currentDate.getHours() < 12 ? "AM" : "PM";

      const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}_${period}`;
      const fileName = `Reporte_Coleccion_${formattedDate}.json`;

      // Create a Blob with the JSON data
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();

      // Revoke the URL to free up memory
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      &nbsp;
      <div className="container text-center">
        <h5>Cargar desde Base de Datos</h5>
        &nbsp;
        <form className="d-flex justify-content-center">
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
            style={{ borderColor: "blue" }}
          >
            Descargar Registro
          </button>
        </form>
      </div>
      &nbsp;
    </>
  );
}

export default BDLoad;
