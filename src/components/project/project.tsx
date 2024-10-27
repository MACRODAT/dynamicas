import React, { useEffect, useState } from 'react'
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
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${state.user.jwt_token_}`
			}
		}).then((val) => {
			val.json().then((json) => {
				// console.log(json)
				if (json.success)
				{
					setProjects(json.projects)
				}
			})
		}).catch((err) => {
			
		})
	}

	useEffect(() => {
		fetchProjects()	
	}, [state.user.user.avatar])

	return (
		<div className='' id="projectsList">
			<h6>
				My projects
			</h6>
			{
				projects.length > 0 ?
				<div> </div>
				:
				<h6>No project found</h6>
			}
			<hr />

		</div>
	)
}

export default connect(allInterfaces)(Projects)
