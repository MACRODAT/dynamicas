import React from 'react';
import './console.scss'; // Import the CSS file

interface EngineeringConsoleProps {
	datatext: string[]; // Define the prop type to be an array of strings
}

const EngineeringConsole: React.FC<EngineeringConsoleProps> = ({datatext}) => {
  return (
    <div className="console-container">
      {datatext.map((line, index) => (
        <div
          key={index}
          className={index % 2 === 0 ? 'line-grey' : 'line-white'}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default EngineeringConsole;
