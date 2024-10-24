import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'


const ViewFolder: React.FC<States> = (state: States) => {

	let [dir, setDir] = useState<Map<string, string[]>>(new Map<string, string[]>())

	const dispatch = useDispatch();

	const getMyFolder = async () => {
		try {
			const response = await 
				fetch(`http://127.0.0.1:5000/user/
					${state.user.user.avatar}/dir`);
			if (response.ok)
			{
				const data = await response.json();
				return data;
			}
		}
		catch (err: any)
		{
			console.log(err);
		}
	}
	useEffect( () => {
		getMyFolder().then((v: any) => {
			setDir(v);
		});
	}, [state.user.user.avatar])

	let padding_ = 0;

	return (
		<div>
			<h5>
				View my folder structure:
			</h5>
			<ul id="" style={{listStyle: 'none', padding: '8px', border: '1px solid black'}}>
				{
					Object.entries(dir).map((e, i, _) => {
						padding_ = e[0].split('/').length * 40 + 4;
						return (
							<ul key={e[0]} style={{marginLeft: padding_ + 'px'}}>
								<em style={{fontSize: '1.1em', fontWeight: 800}}>{e[0]}</em>
								{
									e[1].map((s: any) => {
										return <li key={s}>....{s}</li>
									})
								}
							</ul>
						)
					})
				}
				<li className=''></li>
			</ul>
		</div>
	)
}

export default connect(allInterfaces)(ViewFolder)
