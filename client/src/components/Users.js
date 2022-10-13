import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import SideBar from './SideBar'

function Users() {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState({
		name: '',
		password: '',
		is_admin: '',
		email: ''
	})
	const navigate = useNavigate()
	const [idTrack, setIdTrack] = useState(0)

	useEffect(()=>{
		fetch('/api/auth')
		.then(res=>{
			if(res.status === 401){
				navigate('/')
				toast('User is not authorized')
			}
		})

		fetch('/api/users')
		.then(res=>{
			if(res.ok){
				res.json().then(setUsers)
			}else{
				toast('Something went wrong with your request')
			}
		})
	}, [])

	const editUser = (id) =>{
		fetch(`/api/user/${id}`)
		.then(res=>{
			if(res.ok){
				res.json().then(setUser)
				setIdTrack(id)
			}else{
				toast('Something went wrong with your request')
			}
		})
	}

	const updateInfo = (e) =>{
		e.preventDefault()
		fetch(`/api/users/${idTrack}`,{
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(user)
		})
		.then(res=>{
			if(res.ok){
				toast('User has been edited successfully')
				setUser({
					name: '',
					password: '',
					is_admin: '',
					email: ''
				})
			}else{
				toast('Something went wrong with your request')
			}
		})
	}

	const handleChange = (e) =>{
		setUser({...user, [e.target.id]: e.target.value})
	}
	
	const deleteUser = (id) =>{
		fetch(`/api/users/${id}`,{
			method: "DELETE"
		})
		.then(res=>{
			if(res.ok){
				toast('User has been deleted successfully')
				users.filter(user=> user.id !== id)
			}
			// else{
			// 	toast('Something went wrong with your request')
			// }
		})
	}

	const addNew = () =>{
		fetch('/api/users',{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(user)
		})
		.then(res=>{
			if(res.ok){
				toast('User has been added successfully')
				setUser({
					name: '',
					password: '',
					is_admin: '',
					email: ''
				})
			}else{
				toast('Something went wrong with your request')
			}
		})
	}

	return (
		<div className='row'>
			<SideBar/>
			<div className='col col-sm-6 col-md-6 col-lg-3 bg-light'>
				<div className='container'>
					<div className='row px-3'>
						<h2>Users</h2>
						<ol>
							{
								(Array.isArray(users) ? users : []).map(user=>{
								 	return (
										<div className='d-flex user-cont border' key={user.id} title='Click to edit' onClick={()=>editUser(user.id)}>
											<li key={user.id} className=''>{user.name}</li>
											 
											<h5 className='text-danger' title='Click to delete' onClick={()=>deleteUser(user.id)}><AiOutlineDelete/></h5>
										</div>
									)
								})
							}
						</ol>
					
					</div>
				</div>
			</div>
			<div className='col col-sm-3 col-md-3 col-lg-6 bg-white pt-5 text-center'>
					<form onSubmit={updateInfo}>
						<div className="form-outline mb-4">
				  	  <input type="text" id="name" className="form-control" onChange={handleChange} value={user?.name}/>
				  		  <label className="form-label" htmlFor="name">Name</label>
			  		</div>
						<div className="form-outline mb-4">
				  	  <input type="password" id="password" className="form-control" onChange={handleChange} value={user?.password}/>
				  		  <label className="form-label" htmlFor="password">Password</label>
			  		</div>
						<div className="form-outline mb-4">
				  	  <input type="email" id="email" className="form-control" onChange={handleChange} value={user?.email}/>
				  		  <label className="form-label" htmlFor="email">Email</label>
			  		</div>
						
						<label className="form-label mb-2" htmlFor="is_admin">User status</label>
						<select className='form-select' id='is_admin' value={user.is_admin} onChange={handleChange} aria-label='Admin status'>
							<option></option>
							<option value={true}>Admin</option>
							<option value={false}>User</option>
						</select>
						
						<div className='mt-3 category-user-btns'>
							<input type='submit' className="btn btn-warning btn-sm" value='Update'/>
							<button className='btn btn-primary btn-sm' onClick={addNew}>New</button>
						</div>
					</form>
			</div>
			<ToastContainer/>
		</div>
	)
}

export default Users