import React from "react";
import { connect } from "react-redux";
import { toUpper, toUpperList } from "../helpers";
import Airfoil from "./geometry/airfoil";
import TDPrint  from "./process/3dprint";
import ConfigureAirfoil from "./parameters/configureAirfoil";
import Solver from "./solver.ts/solver";

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
		if (state.application.submenus.length == 0)
		{
			return defaultComponent;
		}
		if (selectedMenu == "Solver")
		{
			return <Solver />
		}
		switch (state.application.submenus[0].toUpperCase())
		{
			case '3D PRINT':
				return <TDPrint />
			case 'AIRFOIL':
				if (state.application.submenus.length > 1
					&& state.application.submenus[1].toUpperCase() == "PROVIDED")
				{
					return <Airfoil />
				}
				else
				{
					return defaultComponent
				}
			case '2D':
				return <ConfigureAirfoil />
			default:
				return defaultComponent
		}
	}

	return (
		<div className="p-1 h-100">
			<h5 className="front-400">{selectedMenu} {">"} {selectedSubMenus}</h5>
			

			<div id="ContentLayer" className="h-100">
				{renderProperSection()}
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(Content);