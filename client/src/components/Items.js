import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import SideBar from './SideBar'
import Loading from './Loading'

function Items() {
	const [items, setItems] = useState([])
	const [param, setParam] = useState('')
	const navigate = useNavigate()
	
	const filtered = (Array.isArray(items) ? items : []).filter(par=> par.name.split('_').join(' ').toLowerCase().includes(param.toLowerCase()))

	useEffect(()=>{
		fetch('/api/auth')
		.then(res=>{
			if(res.status === 401){
				navigate('/')
				toast('User is not authorized')
			}
		})
		
		fetch('/api/items')
		.then((res)=>{
			if(res.ok){
				res.json().then(setItems)
			}else{
				toast("Something went wrong")
			}
		})
		.catch((err)=>toast(err.message))
	},[])

	const handleSearch = (e) =>{
		setParam(e.target.value)
	}

	try {
		return (
		<div className='row'>
			<SideBar/>
			<div className='col col-sm-9 col-md-9 col-lg-9 bg-light vh-100'>
				<div className='container'>
					<div className='row'>
				<input id="search-focus" type="search" className="form-control" placeholder='Filter by product name' onChange={handleSearch} value={param}/>
				<table className="table">
				  <thead>
				    <tr>
				      <th scope="col">#</th>
				      <th scope="col">Name</th>
				      <th scope="col">Category</th>
				      <th scope="col">Image</th>
				      <th scope="col">Supplier</th>
				      <th scope="col">Quantity</th>
				      <th scope="col">Cost</th>
				      <th scope="col">Price</th>
				    </tr>
				  </thead>
				  <tbody>
						{
						(Array.isArray(filtered) ? filtered : []).map((item, ind)=>{
							return(
								<tr key={item.id} title='Click to view' className='table-row' onClick={()=>navigate(`/items/${item.id}`)}>
									<th scope="row">{ind + 1}</th>
    							<td>{item.name}</td>
									<td>{item.category.name}</td>
									<td>{!item.image ? "No image" : item.image.slice(0, 20)}</td>
									<td>{item.supplier.name}</td>
									<td>{item.quantity}</td>
									<td>{item.cost}</td>
									<td>{item.price}</td>
								</tr>
							)
						})
					}
				  </tbody>
				</table>
					
					</div>
				</div>
			</div>
			<ToastContainer/>
		</div>
	)
	} catch (error) {
		return <Loading/>
	}
}

export default Items