import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loading from './Loading'
import SideBar from './SideBar'

function ItemEdit() {
	const {id} = useParams()
	const navigate = useNavigate()
	const [category, setCategory] = useState([])
	const [supplier, setSupplier] = useState([])
	const [item, setItem] = useState({})

	useEffect(()=>{
		fetch('/api/auth')
		.then(res=>{
			if(res.status === 401){
				navigate('/')
				toast('User is not authorized')
			}
		})

		fetch(`/api/items/${id}`)
		.then(res=>{
			if(res.ok){
				res.json().then(setItem)
			}else{
				toast('Something went wrong with your request')
				navigate('/items')
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
	},[])

	const updateItem = (e) =>{
		e.preventDefault()

		fetch(`/api/items/${id}`,{
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(item)
		})
		.then(res=>{
			if(res.ok){
				toast('Product edited successfully')
				navigate('/items')
			}else{
				toast("Something went wrong with your request")
				navigate('/items')
			}
		})
	}

	const deleteItem = (e) =>{
		e.preventDefault()
		fetch(`/api/items/${id}`, {
			method: "DELETE"
		})
		.then(res=>{
			if(res.ok){
				res.json().then(()=>toast("Product deleted successfully"))
				navigate('/items')
			}else{
				toast("Something went wrong with your request")
				navigate('/items')
			}
		})
	}

	const handleChange = (e) =>{
		setItem({...item, [e.target.id]: e.target.value})
		// setCategory({...category, [e.target.id]: e.target.value})
		// setSupplier({...supplier, [e.target.id]: e.target.value})
	}

	try {
		return (
		<div className='row'>
			<SideBar/>
			<div className='col col-sm-10 col-xs-10 col-md-9 col-lg-9 bg-light container'>
				<form className='pt-5' onSubmit={updateItem}>
					<h2>Edit Product Details</h2>
				  <div className="form-outline mb-4">
						<label className="form-label" htmlFor="name">Name</label>
						<input type="text" id="name" className="form-control" onChange={handleChange} value={item.name}/>
				  	  
			  	</div>


				  <label className="form-label mb-2" htmlFor="category">Category</label>
						<select className='form-select' id='category_id' value={item.category_id} onChange={handleChange} aria-label='category'>
							
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
				  	<button type="submit" className="btn btn-primary btn-block mt-4">Update</button>
						<button className="btn btn-danger btn-block mt-4" onClick={deleteItem}>Delete</button>
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

export default ItemEdit