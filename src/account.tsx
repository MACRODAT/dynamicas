import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from './helpers'
import { User } from './types'
import { MdAccountCircle } from "react-icons/md";

const Account: React.FC<States> = (state: States) => {

	let user: User = state.user.user;

	const dispatch = useDispatch();

	return (
		<div>
			<>
				<div className="user-header" style={{margin: '10px'}}>
					{/* <img src={user.avatar} alt={`${user.firstname} ${user.lastname}`} className="user-avatar" /> */}
					<MdAccountCircle size={70} className='inline' />
					<h2 className='inline' >{`${user.firstname} ${user.lastname}`}</h2>
				</div>
				<p style={{margin: '20px'}}><strong>Email:</strong> {user.email}</p>
				<p style={{margin: '20px'}}>
					<strong>Last Login:</strong>  {user.loginDate?.toString()}
				</p>
			</>
		</div>
	)
}

export default connect(allInterfaces)(Account)
