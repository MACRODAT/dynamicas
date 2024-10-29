import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import "../../styles/project.scss"
import { Button, Form } from 'react-bootstrap'
import { SET_PROJECT, SET_USER_DISCONNECT } from '../../store/user'
import { setMenu } from '../../store/logic/actionLogic'
import { afterRequest } from '../../firebase'


const Projects: React.FC<States> = (state: States) => {
	let [projects, setProjects] = useState([])
	
	let [projectName, setProjectName] = useState("")
	let [projectDesc, setProjectDesc] = useState("")

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
				afterRequest(json)
				if (json.success)
				{
					setProjects(json.projects)
				}
			})
		}).catch((err) => {
			
		})
	}

	let createNewProject = () => {
		fetch('http://127.0.0.1:5000/myprojects/new', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${state.user.jwt_token_}`
			},
			body: JSON.stringify({
				name: projectName,
			    description: projectDesc
			})
		}).then((val) => {
			console.log(val)
			val.json().then((json) => {
				afterRequest(json)
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

	// console.log(projects)

	return (
		<>
			<div className='' id="projectsList">
				<h4>
					My projects
				</h4>
				<hr />
				{
					projects.length > 0 ?
					<div> 
						{
							projects.map((project_: any) => 
								// <h6>- {project}</h6>
								{
									
									// console.log(project_)
									return (
										<li className='link' 
											key={project_?.name}
											onClick={() => {
												dispatch(
													{
														type: SET_PROJECT, 
														payload: project_.name
													}
												)
												
												dispatch(setMenu("process") as any)
									
											}
											}
											style={{listStyleType: 'none', fontSize: '16px'}}>
											{project_?.name}
											<p style={{fontSize: '12px'}}>
												{project_.description}	
											</p>	
										</li>)

								}
							)
						}
					</div>
					:
					<h6 className='italic'>No projects found.</h6>
				}

			</div>
			<div className='projectCreate'>
				<h6>Create a project:</h6>
				<Form>
					<Form.Group>
						<Form.Label>Project name:</Form.Label>
						<Form.Control 
							as="input"
							value={projectName}
							onChange={(e) => setProjectName( e.target.value )}
							placeholder='Enter name.' 
							/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Project description:</Form.Label>
						<Form.Control 
							as="textarea"
							rows={5}
							value={projectDesc}
							onChange={(e) => setProjectDesc( e.target.value )}
							placeholder='Enter project description.' 
							/>
					</Form.Group>
					<Form.Group>
					<Button variant="primary" 
							type="submit" 
							style={{margin: '10px'}}
							onClick={() => createNewProject()}
							>
						Create
					</Button>
					</Form.Group>
				</Form>
			</div>
		</>
	)
}

export default connect(allInterfaces)(Projects)
