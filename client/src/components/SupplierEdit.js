import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SideBar from './SideBar'

function SupplierEdit() {
	const {id} = useParams()
	const navigate = useNavigate()
	const [sup, setSup] = useState({})

	useEffect(()=>{
		fetch(`/api/suppliers/${id}`)
		.then(res=>{
			if(res.ok){
				res.json().then(console.log)
			}else{
				toast('Something went wrong with your request')
				navigate('/suppliers')
			}
		})
	},[])

	return (
		<div className='row'>
			<SideBar/>
			<div className='col col-sm-10 col-xs-10 col-md-9 col-lg-9 bg-light container'>
				<form className='pt-5'>
					<h2>Edit Supplier</h2>
				  <div className="form-outline mb-4">
				    <input type="text" id="form5Example1" className="form-control" />
				  	  <label className="form-label" htmlFor="form5Example1">Name</label>
			  	</div>


				  <div className="form-outline mb-4">
				    <input type="email" id="form5Example2" className="form-control" />
				  	  <label className="form-label" htmlFor="form5Example2">Email address</label>
			  	</div>

					<div className="form-outline mb-4">
				    <input type="email" id="form5Example2" className="form-control" />
				  	  <label className="form-label" htmlFor="form5Example2">Email address</label>
			  	</div>

					<div className="form-outline mb-4">
				    <input type="email" id="form5Example2" className="form-control" />
				  	  <label className="form-label" htmlFor="form5Example2">Email address</label>
			  	</div>

				  <button type="submit" className="btn btn-primary btn-block mb-4">Subscribe</button>
				</form>
			</div>
		</div>
	)
}

export default SupplierEdit