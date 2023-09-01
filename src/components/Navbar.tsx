import React, { useState, useEffect } from "react";

function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  const [jsonMongoCollection, setJsonMongoCollection] = useState(null); // Renamed state variable

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/download-collection");
      const data = await response.json();
      console.log(data);
      setJsonMongoCollection(data); // Updated state variable name
    } catch (error) {
      console.error("Error al traer la data:", error);
    }
    setIsLoading(false);
  };

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
          </form>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
