import React from "react";
import { connect } from "react-redux";
import { toUpper, toUpperList } from "../helpers";
import Airfoil from "./geometry/airfoil";
import TDPrint  from "./process/3dprint";
import ConfigureAirfoil from "./parameters/configureAirfoil";
import Solver from "./solver.ts/solver";
import ViewFolder from "./results/viewFolder";
import DefaultResult from "./results/defaultResult";
import GeneralGeo from "./geometry/generalGeo";
import Fixedwingspecs from "./process/fixedwingspecs";
import Generator from "./geometry/generator";
import Account from "../account";
import Project from "./project/project";
import Priorities from "./priority/priorities";
import PriorityDetails from "./priority/priorityDetails";
import PredictionReport from "./prediction/predictionReport";
import PredictionPlot from "./prediction/predictionPlot";
import PredictionIntro from "./prediction/predictionIntro";
import PredictionCalc from "./prediction/predictionCalc";

const mapStateToProps = (state : any) => {

	return state;
}

const Content : React.FC = (state : any) => {

	const selectedMenu = toUpper(state.application.menu);
	const selectedSubMenus = toUpperList(state.application.submenus).join('> ');

	// console.log("Updated:", state.application.submenus)

	const defaultComponent = (
		<>Still working on this: Not yet implemented.</>
	)

	const renderProperSection = () => {
		// console.log(state.application.submenus)
		if (state.application.submenus.length == 0)
		{
			return defaultComponent;
		}
		if (selectedMenu == "Account")
		{
			return <Account />
		}
		if (selectedMenu == "Projects")
		{
			return <Project />
		}
		if (selectedMenu == "Priorities")
		{
			return <PriorityDetails />
		}
		if (selectedMenu == "Prediction")
		{
			if (state.application.submenus[0].toUpperCase() == "AIRFOIL REPORT")
			{
				return <PredictionReport />
			}
			if (state.application.submenus[0].toUpperCase() == "AIRFOIL INTRO")
			{
				return <PredictionIntro />
			}
			if (state.application.submenus[0].toUpperCase() == "AIRFOIL RECALC")
			{
				return <PredictionCalc />
			}
			if (state.application.submenus[0].toUpperCase() == "AIRFOIL PLOT")
			{
				return <PredictionPlot />
			}
			return defaultComponent
		}
		if (selectedMenu == "Solver")
		{
			return <Solver />
		}
		if (selectedMenu == "Results")
		{
			switch (state.application.submenus[0].toUpperCase())
			{
				case 'FOLDER':
					return <ViewFolder />
				default:
					return <DefaultResult />
			}
		}
		// if (selectedMenu == "Geometry")
		// {
		// 	switch (state.application.submenus[0].toUpperCase())
		// 	{
		// 		case 'FIXED WING':
		// 			if (state.application.submenus.length > 1
		// 				&& state.application.submenus[1].toUpperCase() == "PROVIDED")
		// 			{
		// 				return <Airfoil />
		// 			}
		// 			else if (state.application.submenus.length > 1
		// 				&& state.application.submenus[1].toUpperCase() == "OWNGENERATOR")
		// 			{
		// 				return <Generator />	
		// 			}
		// 			else
		// 			{
		// 				return defaultComponent
		// 			}
		// 		case '':
		// 			return 
		// 		case '2D':
		// 			return <ConfigureAirfoil />
		// 		default:
		// 			return <GeneralGeo />
		// 	}
		// }
		if (selectedMenu == "Geometry")
		{
			// console.log(state.application.submenus)
			switch (state.application.submenus.length > 1 &&
				state.application.submenus[1].toUpperCase())
			{
				case 'PROVIDED':
					return <Airfoil />
				case 'OWNGENERATOR':
					return <Generator /> 
				case '2D':
					return <ConfigureAirfoil />
				default:
					return <GeneralGeo />
			}
		}
		if (selectedMenu == "Process")
		{
			switch (state.application.submenus[0].toUpperCase())
			{
				case '3D PRINT':
					return <TDPrint />
				case 'FIXED WING SPECS':
					return <Fixedwingspecs />
				default:
					return defaultComponent
			}
		}
		return defaultComponent
	}

	return (
		<div className="p-1 h-100" id="Contenter">
			<h5 className="front-400">{selectedMenu} {">"} {selectedSubMenus}</h5>
			

			<div id="ContentLayer" className="h-100">
				{renderProperSection()}
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(Content);