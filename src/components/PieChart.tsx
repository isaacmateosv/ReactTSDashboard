import React from "react";
import Plot from "react-plotly.js";

const SamplePlot: React.FC = () => {
  // Sample data
  const data = [
    {
      x: [1, 2, 3, 4, 5],
      y: [10, 11, 12, 13, 14],
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "red" },
      name: "Line Plot",
    },
    {
      x: [1, 2, 3, 4, 5],
      y: [5, 4, 3, 2, 1],
      type: "bar",
      name: "Bar Chart",
    },
  ];

  // Layout configuration
  const layout = {
    title: "Sample Plot",
    xaxis: {
      title: "X Axis",
    },
    yaxis: {
      title: "Y Axis",
    },
  };

  return (
    <div className="container text-center">
      <h4>Gráficos</h4>
      <Plot data={data} layout={layout} />;
    </div>
  );
};

export default SamplePlot;
