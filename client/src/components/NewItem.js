import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { toast, ToastContainer } from 'react-toastify'
import Loading from './Loading'

function NewItem({ currentUser }) {
	const navigate = useNavigate()
	const [category, setCategory] = useState([])
	const [supplier, setSupplier] = useState([])
	const [item, setItem] = useState({
		user_id: currentUser.id,
		supplier_id: 0,
		category_id: 0,
		name: '',
		description: '',
		image: '',
		quantity: 0,
		price: 0,
		cost: 0
	})

	useEffect(()=>{
		fetch('/api/auth')
		.then(res=>{
			if(res.status === 401){
				navigate('/')
				toast('User is not authorized')
			}
		})

		fetch('/api/categories')
		.then(res=>{
			if(res.ok){
				res.json().then(setCategory)
			}else{
				toast('Something went wrong with your request')
			}
		})

		fetch('/api/suppliers')
		.then(res=>{
			if(res.ok){
				res.json().then(setSupplier)
			}else{
				toast('Something went wrong with your request')
			}
		})
	// eslint-disable-next-line
	}, [])

	const handleChange = (e) =>{
		setItem({...item, [e.target.id]: e.target.value})
	}

	const addNewItem = (e) =>{
		e.preventDefault()
		fetch('/api/items',{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(item)
		})
		.then(res=>{
			if(res.ok){
				toast('Product has been added successfully')
				setItem({
					user_id: currentUser.id,
					supplier_id: 0,
					category_id: 0,
					name: '',
					description: '',
					image: '',
					quantity: 0,
					price: 0,
					cost: 0
				})
			}else{
				res.json().then(err => toast(err.errors[0]))
			}
		})
	}

	try {
		return (
		<div className='row'>
			<SideBar/>
			<div className='col col-sm-10 col-xs-10 col-md-9 col-lg-9 bg-light container'>
				<form className='pt-5' onSubmit={addNewItem}>
					<h2>Edit Product Details</h2>
				  <div className="form-outline mb-4">
						<label className="form-label" htmlFor="name">Name</label>
						<input type="text" id="name" className="form-control" onChange={handleChange} value={item.name}/>
				  	  
			  	</div>


				  <label className="form-label mb-2" htmlFor="category">Category</label>
						<select className='form-select' id='category_id' value={item.category_id} onChange={handleChange} aria-label='category'>
							<option>Select item</option>
							{
								(Array.isArray(category) ? category : []).map(cat=>{
									return (
										<option value={cat.id} key={cat.id}>{cat.name}</option>
									)
								})
							}
						</select>

					<div className="form-outline mt-4">
						<label className="form-label" htmlFor="description">Description</label>
				    <input type="text" id="description" className="form-control" onChange={handleChange} value={item.description}/>
				  	  
			  	</div>

					<div className="form-outline mt-4">
					<label className="form-label" htmlFor="image">Image</label>
				    <input type="text" id="image" className="form-control" onChange={handleChange} value={item.image}/>
				  	  
			  	</div>

					<label className="form-label mt-4" htmlFor="supplier">Supplier</label>
						<select className='form-select' id='supplier_id' value={item.supplier_id} onChange={handleChange} aria-label='supplier'>
							<option>Select item</option>
							{
								(Array.isArray(supplier) ? supplier : []).map(cat=>{
									return (
										<option value={cat.id} key={cat.id}>{cat.name}</option>
									)
								})
							}
						</select>

					<div className="form-outline mt-4">
						<label className="form-label" htmlFor="cost">Cost</label>
				    <input type="number" id="cost" className="form-control" onChange={handleChange} value={item.cost}/>
				  	  
			  	</div>

					<div className="form-outline mt-4">
						<label className="form-label" htmlFor="price">Price</label>
				    <input type="number" id="price" className="form-control" onChange={handleChange} value={item.price}/>
				  	  
			  	</div>

					<div className="form-outline mt-4">
						<label className="form-label" htmlFor="quantity">Quantity</label>
				    <input type="number" id="quantity" className="form-control" onChange={handleChange} value={item.quantity}/>
				  	  
			  	</div>

					<div className='update-supplier'>
				  	<button type="submit" className="btn btn-primary btn-block mt-4">Submit</button>
					</div>
				</form>
				<ToastContainer/>
			</div>
		</div>
	)
	} catch (error) {
		return <Loading/>
	}
}

export default NewItem