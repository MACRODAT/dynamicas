import React, { useState, useEffect } from 'react';
import { parseDatFile } from '../helpers';
import Plot from 'react-plotly.js';

const AirfoilPlot = ({ airfoilName }: { airfoilName: string }) => {
    const [airfoilData, setAirfoilData] = useState<{ x: number; y: number }[]>([]);

	
    useEffect(() => {
        const fetchAndPlotAirfoil = async () => {
            try {
				if (airfoilName.trim() == "") return;
                const response = await fetch(`http://127.0.0.1:5000/airfoil/${airfoilName}/dat`);
                const content = await response.text();
                const parsedData = parseDatFile(content);
                setAirfoilData(parsedData);
            } catch (error) {
                console.error("Error fetching airfoil .dat file:", error);
            }
        };

        fetchAndPlotAirfoil();
    }, [airfoilName]);

	if (airfoilName.trim() == "")
	{
		return <></>
	}

    // Prepare data for Plotly
    const xValues = airfoilData.map(point => point.x);
    const yValues = airfoilData.map(point => point.y);

    return (
        <div>
            <h6>Airfoil Plot: {airfoilName}</h6>
            <Plot
                data={[
                    {
                        x: xValues,
                        y: yValues,
                        type: 'scatter',
                        mode: 'lines',
                        marker: { color: 'blue' },
                    },
                ]}
                layout={{
                    title: `${airfoilName} Airfoil Plot`,
                    xaxis: { title: '', showgrid: false, autorange: false, range: [0, 1] },
                    yaxis: { title: '', showgrid: false, range: [-1, 1] },
					width: 400,
					height: 300,
                    margin: { l: 0, r: 0, b: 0, t: 0 },  // Remove margins
                    showlegend: false,  // No legend

                }}
                config={{
                    displayModeBar: false,  // Hide the action bar,
					staticPlot: true,
                }}
            />
        </div>
    );
};

export default AirfoilPlot;