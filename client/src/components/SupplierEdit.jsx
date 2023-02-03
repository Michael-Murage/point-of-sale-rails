import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import SideBar from './SideBar'

function SupplierEdit() {
	const {id} = useParams()
	const navigate = useNavigate()
	const [sup, setSup] = useState({})

	useEffect(()=>{
		fetch('/api/auth')
		.then(res=>{
			if(res.status === 401){
				navigate('/')
				toast('User is not authorized')
			}
		})

		fetch(`/api/suppliers/${id}`)
		.then(res=>{
			if(res.ok){
				res.json().then(setSup)
			}else{
				toast('Something went wrong with your request')
				navigate('/suppliers')
			}
		})
        // eslint-disable-next-line
	},[])

	const updateSupplier = (e) =>{
		e.preventDefault()
		// const method = str === 'patch' ?  : "DELETE"
		// const body = 
		// const headers = 

		fetch(`/api/suppliers/${id}`,{
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(sup)
		})
		.then(res=>{
			if(res.ok){
				toast('Data edited successfully')
				navigate('/suppliers')
			}else{
				toast("Something went wrong with your request")
				navigate('/suppliers')
			}
		})
	}

	const deleteSupplier = (e) =>{
		e.preventDefault()
		fetch(`/api/suppliers/${id}`, {
			method: "DELETE"
		})
		.then(res=>{
			if(res.ok){
				res.json().then(()=>toast("Data deleted successfully"))
				navigate('/suppliers')
			}else{
				toast("Something went wrong with your request")
				navigate('/suppliers')
			}
		})
	}

	const handleChange = (e) =>{
		setSup({...sup, [e.target.id]: e.target.value})
	}

	return (
		<div className='row'>
			<SideBar/>
			<div className='col col-sm-10 col-xs-10 col-md-9 col-lg-9 bg-light container'>
				<form className='pt-5' onSubmit={updateSupplier}>
					<h2>Edit Supplier</h2>
				  <div className="form-outline mb-4">
				    <input type="text" id="name" className="form-control" onChange={handleChange} value={sup.name}/>
				  	  <label className="form-label" htmlFor="form5Example1">Name</label>
			  	</div>


				  <div className="form-outline mb-4">
				    <input type="text" id="image" className="form-control" onChange={handleChange} value={sup.image}/>
				  	  <label className="form-label" htmlFor="form5Example2">image</label>
			  	</div>

					<div className="form-outline mb-4">
				    <input type="text" id="location" className="form-control" onChange={handleChange} value={sup.location}/>
				  	  <label className="form-label" htmlFor="form5Example2">Location</label>
			  	</div>

					<div className="form-outline mb-4">
				    <input type="text" id="schedule" className="form-control" onChange={handleChange} value={sup.schedule}/>
				  	  <label className="form-label" htmlFor="form5Example2">Schedule</label>
			  	</div>

					<div className='update-supplier'>
				  	<button type="submit" className="btn btn-primary btn-block mb-4">Update</button>
						<button className="btn btn-danger btn-block mb-4" onClick={deleteSupplier}>Delete</button>
					</div>
				</form>
				<ToastContainer/>
			</div>
		</div>
	)
}

export default SupplierEdit