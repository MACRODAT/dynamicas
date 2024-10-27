import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import "../../styles/project.scss"


const Projects: React.FC<States> = (state: States) => {
	let [projects, setProjects] = useState([])
	const dispatch = useDispatch();

	let fetchProjects = () => {
		fetch('http://127.0.0.1:5000/myprojects', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((val) => {
			val.json().then((json) => {
				console.log(json)
			})
		})
	}

	fetchProjects()

	return (
		<div className='' id="projectsList">
			<h6>
				My projects
			</h6>
			<hr />

		</div>
	)
}

export default connect(allInterfaces)(Projects)
