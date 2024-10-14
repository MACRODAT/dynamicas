import React, { useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Text, Circle } from 'react-konva';
import { readFileAsText } from '../../helpers';  // Helper function to read DAT file

// Utility function to parse the DAT file format into an array of points
const parseDATFile = (content: string): { x: number, y: number }[] => {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const points = lines.map(line => {
    const [x, y] = line.trim().split(/\s+/).map(Number);
    return { x, y };
  });
  return points;
};

// Canvas component to draw shapes
interface NACADrawerProps {
  points: { x: number, y: number }[];
}

const NACADrawer: React.FC<NACADrawerProps> = ({ points }) => {
  const [datPoints, setDatPoints] = useState<{ x: number, y: number }[]>(points);
  const [gridSize, setGridSize] = useState<number>(20); // Grid size

  // Function to draw a grid
  const drawGrid = (stageWidth: number, stageHeight: number) => {
    const grid: JSX.Element[] = [];
    for (let i = 0; i < stageWidth / gridSize; i++) {
      grid.push(
        <Line
          key={`v-line-${i}`}
          points={[i * gridSize, 0, i * gridSize, stageHeight]}
          stroke="#ddd"
          strokeWidth={0.5}
        />
      );
    }
    for (let i = 0; i < stageHeight / gridSize; i++) {
	  const el = <Line
					key={`h-line-${i}`}
					points={[0, i * gridSize, stageWidth, i * gridSize]}
					stroke="#ddd"
					strokeWidth={0.5}
				/>
      grid.push(el);
    }
    return grid;
  };

  // Handle the DAT file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const content = await readFileAsText(file);
      const parsedPoints = parseDATFile(content);
      setDatPoints(parsedPoints);
    }
  };

  return (
    <div className="naca-drawer-container">
      {/* File upload input */}
      {/* <input type="file" accept=".dat" onChange={handleFileUpload} /> */}

      {/* Canvas with Konva */}
      

	  <Stage width={window.innerWidth} height={window.innerHeight}>
		<Layer>
			<Text text="Some text on canvas" fontSize={15} />
			<Rect
				x={20}
				y={50}
				width={100}
				height={100}
				fill="red"
				shadowBlur={10}
			/>
			<Circle x={200} y={100} radius={50} fill="green" />
			<Line
				x={20}
				y={200}
				points={[0, 0, 100, 0, 100, 100]}
				tension={0.5}
				closed
				stroke="black"
				fillLinearGradientStartPoint={{ x: -50, y: -50 }}
				fillLinearGradientEndPoint={{ x: 50, y: 50 }}
				fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
			/>
		</Layer>
		</Stage>
    </div>
  );
};

export default NACADrawer;
