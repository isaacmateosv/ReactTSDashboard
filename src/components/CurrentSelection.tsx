import React from "react";

interface CurrentSelectionProps {
  source: string;
}

const CurrentSelection: React.FC<CurrentSelectionProps> = ({ source }) => {
  return (
    <div className="container text-center">
      <p>Datos en tabla: {source}</p>
    </div>
  );
};

export default CurrentSelection;
