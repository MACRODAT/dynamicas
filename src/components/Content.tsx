import React from "react";
import { connect } from "react-redux";
import { toUpper, toUpperList } from "../helpers";
import Airfoil from "./geometry/airfoil";

const mapStateToProps = (state : any) => {

	return state;
}

const Content : React.FC = (state : any) => {

	const selectedMenu = toUpper(state.application.menu);
	const selectedSubMenus = toUpperList(state.application.submenus).join('> ');

	const renderProperSection = () => {
		switch (state.application.submenus[0].toUpperCase())
		{
			case 'AIRFOIL':
				return <Airfoil />
			default:
				return <>Error 500</>
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