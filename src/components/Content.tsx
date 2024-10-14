import React from "react";
import { connect } from "react-redux";
import { toUpper, toUpperList } from "../helpers";
import Airfoil from "./geometry/airfoil";
import ConfigureAirfoil from "./parameters/configureAirfoil";

const mapStateToProps = (state : any) => {

	return state;
}

const Content : React.FC = (state : any) => {

	const selectedMenu = toUpper(state.application.menu);
	const selectedSubMenus = toUpperList(state.application.submenus).join('> ');

	const defaultComponent = (
		<>Still working on this: Not yet implemented.</>
	)

	const renderProperSection = () => {
		if (state.application.submenus.length == 0)
		{
			return defaultComponent;
		}
		switch (state.application.submenus[0].toUpperCase())
		{
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
			case 'PARAMETERS':
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