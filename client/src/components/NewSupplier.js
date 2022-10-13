import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { toast, ToastContainer } from 'react-toastify'

function NewSupplier({ currentUser }) {
	const [sup, setSup] = useState({
		location: '',
		name: '',
		schedule: '',
		image: '',
		user_id: currentUser.id
	})
	const navigate = useNavigate()

	const handleChange = (e) =>{
		setSup({...sup, [e.target.id]: e.target.value})
	}

	const addNewSup = (e) =>{
		e.preventDefault()
		fetch('/api/suppliers',{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(sup)
		})
		.then(res=>{
			if(res.ok){
				toast('Supplier has been added successfully')
				navigate('/suppliers')
			}else{
				toast('Something went wrong with your request')
			}
		})
	}

	return (
		<div className='row'>
			<SideBar/>
			<div className='col col-sm-9 col-xs-10 col-md-9 col-lg-9 bg-light'>
				<div className='container'>
					<div className='row px-3'>
						<h2>Add a new Supplier</h2>

						<form onSubmit={addNewSup}>
						<div className="form-outline mb-4">
				  	  <input type="text" id="name" placeholder='Name of the supplier?' className="form-control" onChange={handleChange} value={sup?.name}/>
				  		  <label className="form-label" htmlFor="name">Name</label>
			  		</div>
						<div className="form-outline mb-4">
				  	  <input type="text" id="location" placeholder='Where is the supplier from?' className="form-control" onChange={handleChange} value={sup?.location}/>
				  		  <label className="form-label" htmlFor="location">Location</label>
			  		</div>
						<div className="form-outline mb-4">
				  	  <input type="text" id="schedule" placeholder='e.g Mondays, Wednesdays, weekends etc' className="form-control" onChange={handleChange} value={sup?.schedule}/>
				  		  <label className="form-label" htmlFor="schedule">Schedule</label>
			  		</div>

						<div className="form-outline mb-4">
				  	  <input type="text" id="image" placeholder='image url' className="form-control" onChange={handleChange} value={sup?.image}/>
				  		  <label className="form-label" htmlFor="image">Image</label>
			  		</div>
						
							<input type='submit' className="btn btn-primary btn-lg mt-3" />
					</form>
					<ToastContainer/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewSupplier