import React from 'react';
import './console.scss'; // Import the CSS file

interface EngineeringConsoleProps {
	datatext: string[]; // Define the prop type to be an array of strings
}

const EngineeringConsole: React.FC<EngineeringConsoleProps> = ({datatext}) => {
  let lines = 0;

  return (
    <div className="console-container">
      {datatext.map((line, index) => (
        <div
          key={index}
          style={{height: '30px'}}
          className={index % 2 === 0 ? 'line-grey' : 'line-white'}
        >
          <p className='inline' style={{opacity: 0.25, borderRight: '2px solid grey', marginRight: '3px'}}>
            {String(index).padStart(3, '0') + " "}
          </p>
          <p className='inline'>
            {" " + line}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EngineeringConsole;
