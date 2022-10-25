import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import SideBar from './SideBar'
import Loading from './Loading'

function Sales({ currentUser }) {
	const [sales, setSales] = useState([])
	const [param, setParam] = useState('')
	const navigate = useNavigate()
	
	const filtered = (Array.isArray(sales) ? sales : []).filter(par=> par.user.name.toLowerCase().includes(param.toLowerCase()))

	useEffect(()=>{
		fetch('/api/auth')
		.then(res=>{
			if(res.status === 401){
				navigate('/')
				toast('User is not authorized')
			}
		})
		
		fetch('/api/sales')
		.then((res)=>{
			if(res.ok){
				res.json().then(setSales)
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
				<input id="search-focus" type="search" className="form-control" placeholder='Filter by user' onChange={handleSearch} value={param}/>
				<table className="table">
				  <thead>
				    <tr>
				      <th scope="col">#</th>
				      <th scope="col">Items</th>
				      <th scope="col">User</th>
				      {/* <th scope="col">Date</th>
				      <th scope="col">Time</th> */}
				      <th scope="col">Total</th>
				    </tr>
				  </thead>
				  <tbody>
						{
						(Array.isArray(filtered) ? filtered : []).reverse().map((item, ind)=>{
							return(
								<tr key={item.id} title='Click to view' className='table-row' onClick={()=>navigate(`/sales/${item.id}`)}>
									<th scope="row">{ind + 1}</th>
    							<td>{item.items_sold}</td>
									<td>{item.user.name}</td>
									{/* <td>{item.created_at.slice(0, 10)}</td>
									<td>{item.created_at.slice(11, 16)}</td> */}
									<td>{item.total}</td>
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

export default Sales