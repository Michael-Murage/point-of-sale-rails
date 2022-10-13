import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import SideBar from './SideBar'

function Categories() {
	const [cats, setCats] = useState([])
	const [cat, setCat] = useState({
		name: ''
	})
	const [idTrack, setIdTrack] = useState(0)

	useEffect(()=>{
		fetch('/api/categories')
		.then(res=>{
			if(res.ok){
				res.json().then(setCats)
			}else{
				toast('Something went wrong with your request')
			}
		})
	}, [])

	const editCat = (id) =>{
		fetch(`/api/categories/${id}`)
		.then(res=>{
			if(res.ok){
				res.json().then(setCat)
				setIdTrack(id)
			}else{
				toast('Something went wrong with your request')
			}
		})
	}

	const updateInfo = (e) =>{
		e.preventDefault()
		fetch(`/api/categories/${idTrack}`,{
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(cat)
		})
		.then(res=>{
			if(res.ok){
				toast('Category has been edited successfully')
				setCat({
					name: ''
				})
			}else{
				toast('Something went wrong with your request')
			}
		})
	}

	const handleChange = (e) =>{
		setCat({...cat, [e.target.id]: e.target.value})
	}
	
	const deleteCat = (id) =>{
		fetch(`/api/categories/${id}`,{
			method: "DELETE"
		})
		.then(res=>{
			if(res.ok){
				toast('Category has been deleted successfully')
				setCats(cats.filter(cat=> cat.id !== id))
			}
			else{
				toast('Something went wrong with your request')
			}
		})
	}

	const addNew = (e) =>{
		e.preventDefault()
		fetch('/api/categories',{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(cat)
		})
		.then(res=>{
			if(res.ok){
				toast('Category has been added successfully')
				setCat({
					name: ''
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
						<h2>Categories</h2>
						<ol>
							{
								(Array.isArray(cats) ? cats : []).map(user=>{
								 	return (
										<div className='d-flex user-cont border' key={user.id} title='Click to edit' onClick={()=>editCat(user.id)}>
											<li key={user.id} className=''>{user.name}</li>
											 
											<h5 className='text-danger' title='Click to delete' onClick={()=>deleteCat(user.id)}><AiOutlineDelete/></h5>
										</div>
									)
								})
							}
						</ol>
					
					</div>
				</div>
			</div>
			<div className='col col-sm-3 col-md-3 col-lg-6 bg-white pt-5 text-center'>
					<form>
						<div className="form-outline mb-4">
				  	  <input type="text" id="name" className="form-control" onChange={handleChange} value={cat?.name}/>
				  		  <label className="form-label" htmlFor="name">Name</label>
			  		</div>
						
						<div className='mt-3 category-user-btns'>
							<input type='button' onClick={updateInfo} className="btn btn-warning btn-sm" value='Update'/>
							<button className='btn btn-primary btn-sm' onClick={addNew}>New</button>
						</div>
					</form>
			</div>
			<ToastContainer/>
		</div>
	)
}

export default Categories