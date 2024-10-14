import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toUpper, toUpperList } from "../../helpers";
import NACADrawer from "./drawer";
import './airfoil.scss'

const mapStateToProps = (state : any) => {

	return state;
}

const Airfoil : React.FC = (state : any) => {

    const [selectedAirfoil, setSelectedAirfoil] = useState("");

	const selectedMenu = toUpper(state.application.menu);
	const selectedSubMenus = toUpperList(state.application.submenus).join('> ');

	// State to hold airfoils and their screenshots
    const [airfoils, setAirfoils] = useState<{ name: string, screenshot: string, description: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

	// Fetch airfoils from the server
    useEffect(() => {
        const fetchAirfoils = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/airfoils"); // Adjust the URL if necessary
                if (!response.ok) {
                    throw new Error("Failed to fetch airfoils");
                }
                const data = await response.json();
                const airfoilData = await Promise.all(data.map(async (airfoil: string) => {
					const screenshotResponse= await fetch(`http://127.0.0.1:5000/airfoil/${airfoil}/screenshot`);
					const screenshotDescRes: any = (await fetch(`http://127.0.0.1:5000/airfoil/${airfoil}/description`)).json();
                    
					const screenshotBlob = await screenshotResponse.blob();
                    const screenshotUrl = URL.createObjectURL(screenshotBlob);
                    return { name: airfoil, screenshot: screenshotUrl, description: screenshotDescRes.description};
                }));
                setAirfoils(airfoilData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAirfoils();
    }, []);

    // Render loading state or error message
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

	return (
        <>
            <h3>Airfoil (NACA)</h3>
            <h5>Please select an airfoil from the NACA profiles below:</h5>
            <div className="back-100" id="naca">
                <div className="airfoil-grid-container p-2">
                    {airfoils.map((airfoil) => (
                        <div 
                            className = {
                                (selectedAirfoil == airfoil.name) ?
                                    "airfoil-grid-item m-2 selected":
                                    "airfoil-grid-item m-2"
                            }
							style={{
								backgroundImage: `url(${airfoil.screenshot})`,
								backgroundSize: "cover", // Cover the entire div
								backgroundPosition: "center", // Center the image
								border: "1px solid #ccc", // Optional: border for visibility
							}}
							key={airfoil.name}
                            onClick={() => {setSelectedAirfoil(airfoil.name); console.log(airfoil)}}
                            >
                            <h6>{airfoil.name}</h6>
                            <p>{airfoil.description}</p>
                            {/* <img 
								src={airfoil.screenshot} 
								alt={`${airfoil.name} screenshot`}/> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(Airfoil);