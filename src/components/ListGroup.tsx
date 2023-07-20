// import React from "react";
// import { Fragment } from "react";
// import { MouseEvent } from "react";
import { useState } from "react";

function ListGroup() {
  const items = ["Barras", "Pastel"];
  //Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //   items = [];

  //   if (items.length === 0)
  //     return (
  //       <>
  //         <h1>Gráficos</h1>
  //         <p>Sin gráficos disponibles.</p>
  //       </>
  //     );

  //   items.map((item) => <li>{item}</li>);

  const getMessage = () => {
    // return items.length === 0 ? <p>No disponibles.</p> : null;
    return items.length === 0 && <p>No disponible</p>;
  };

  //Event Handler
  //   const handleClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h4>Gráficas</h4>
      <h5>Lista</h5>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      {getMessage()}
      <div className="card" style={{ width: "18rem" }}>
        <img src="vite.svg" className="card-img-top" alt="lol" />
        <div className="card-body">
          <h5 className="card-title">Barras</h5>
          <p className="card-text">Descripción.</p>
          <a href="#" className="btn btn-primary">
            Actualizar
          </a>
        </div>
      </div>
    </>
  );
}

export default ListGroup;
