import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";

// SourceSelector.tsx
interface SourceSelectorProps {
  sources: Array<{
    label: string;
    component: React.ReactNode;
  }>;
  activeSource: string; // Define activeSource as a string
  onSourceChange: (sourceLabel: string) => void;
}

const SourceSelector: React.FC<SourceSelectorProps> = ({ sources }) => {
  const [activeSource, setActiveSource] = useState(0);

  const handleSourceChange = (index: number) => {
    setActiveSource(index);
  };

  return (
    <div>
      <Nav fill variant="tabs" defaultActiveKey={0}>
        {sources.map((source, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              eventKey={index}
              onClick={() => handleSourceChange(index)}
              style={{
                fontWeight: index === activeSource ? "bold" : "normal",
                color: index === activeSource ? "black" : "gray",
                fontSize: index === activeSource ? "20px" : "18px", // Adjust the font size here
              }}
            >
              {source.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {sources.map((source, index) => (
        <div
          key={index}
          style={{ display: index === activeSource ? "block" : "none" }}
        >
          {source.component}
        </div>
      ))}
    </div>
  );
};

export default SourceSelector;
