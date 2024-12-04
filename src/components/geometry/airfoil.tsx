import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { BsCheckLg } from "react-icons/bs";
import './airfoil.scss'
import AirfoilPlot from "../airfoilPlot";
import { geometrySetAirfoilName } from "../../store/logic/geometryLogic";
import { GeometryState } from "../../store/reducers/geometry_reducer";
import { remote_addr } from "../../firebase";


export type airfoilData = {name: string, screenshot: string, description: string};

const mapStateToProps = (state : any) : {state: any, geoState: GeometryState} => {
    const geoState: GeometryState = state.geometry;
	return {state: state, geoState: geoState};
}

const Airfoil : React.FC = (params: any) => {
    let geo: GeometryState = params.geoState;

    const [selectedAirfoil, setSelectedAirfoil] = useState<airfoilData>
            (geo.geometrySelectedAirfoil);


	// State to hold airfoils and their screenshots
    const [airfoils, setAirfoils] = useState<airfoilData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();

    const handleSelect = (airfoil: airfoilData) => {
        setSelectedAirfoil(airfoil);
        dispatch(geometrySetAirfoilName(airfoil, []) as any);
    }

	// Fetch airfoils from the server
    useEffect(() => {
        const fetchAirfoils = async () => {
            try {
                const response = await fetch("http://" + remote_addr + "/airfoils"); // Adjust the URL if necessary
                if (!response.ok) {
                    throw new Error("Failed to fetch airfoils");
                }
                const data = await response.json();
                const airfoilData = await Promise.all(data.map(async (airfoil: string) => {
					const screenshotResponse= await fetch(`http://${remote_addr}/airfoil/${airfoil}/screenshot`);
					const screenshotDescRes: any = await (await fetch(`http://${remote_addr}/airfoil/${airfoil}/description`)).json();
                    
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
    }, [selectedAirfoil]);

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
                                (selectedAirfoil.name == airfoil.name) ?
                                    "airfoil-grid-item m-2 selected":
                                    "airfoil-grid-item m-2"
                            }
							style={{
								backgroundImage: `url(${airfoil.screenshot})`,
								backgroundSize: "cover", // Cover the entire div
								backgroundPosition: "center", // Center the image
								border: "1px solid #ccc", // Optional: border for visibility
                                color: "variables.$front-100 !important"
							}}
							key={airfoil.name}
                            onClick={() => handleSelect(airfoil)}
                            >
                            {
                                (selectedAirfoil.name == airfoil.name) ?
                                <h6> <BsCheckLg /> {airfoil.name}</h6>
                                :
                                <h6>{airfoil.name}</h6>
                            }
                            {/* <p>{airfoil.description}</p> */}
                        </div>
                    ))}
                </div>
                <div className="back-200" id="airfoilSideBar">
                    <h4>Airfoil information ({selectedAirfoil.name})</h4>
                    <hr />
                    <h5>Description:</h5>
                    <p>
                        {
                            selectedAirfoil.description
                        }
                    </p>
                    <h5>Plot of the airfoil:</h5>
                    <AirfoilPlot airfoilName={selectedAirfoil.name} />
                </div>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(Airfoil);