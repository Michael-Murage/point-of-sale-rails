import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loading from './Loading'
import SideBar from './SideBar'

function SaleView() {
	const {id} = useParams()
	const navigate = useNavigate()
	const [record, setRecord] = useState({})

	useEffect(()=>{
		fetch('/api/auth')
		.then(res=>{
			if(res.status === 401){
				navigate('/')
				toast('User is not authorized')
			}
		})
		
		fetch(`/api/sales/${id}`)
		.then(res=>{
			if(res.ok){
				res.json().then(setRecord)
			}else{
				toast("Something went wrong")
			}
		}).catch(err=>toast(err.message))
	},[id])

	const deleteRecord = (id) =>{
		fetch(`/api/sales/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res=>{
			if(res.ok){
				navigate('/sales')
				toast('Record has been deleted successfully')
			}else{
				navigate('/sales')
				toast('Your request could not be processed')
			}
		})
		// .then(()=>navigate('/sales'))
	}
	// console.log(id);

	try {
		return (
		<div className='row'>
			<SideBar/>
			<div className='col'>
				<div className='sale-views'>
					<h1 className='text-center'><FaUserAlt/></h1>
					<h3 className='text-center'>{record?.user.name}</h3>
					<br/>
					<p className='ml-2'><strong>Products sold:</strong> {record?.items_sold.split(',').join(', ')}</p>
					<p><strong>Category:</strong> {record?.customer.name}</p>
					<p><strong>Date sold:</strong> {record?.created_at.slice(0, 10)}</p>
					<p><strong>Time sold:</strong> {record?.created_at.slice(11, 16)}</p>
					<p><strong>Total amount:</strong> {record?.total}</p>
					<div className='sale-view-btn'>
						<button className='btn btn-danger btn-sm' onClick={()=>deleteRecord(id)}>Delete record</button>
						<button className='btn btn-dark btn-sm' onClick={()=>navigate('/sales')}><AiOutlineArrowLeft/> Go back</button>
					</div>
				</div>
				<ToastContainer/>
			</div>
		</div>
		)
	} catch (error) {
		return <Loading/>
	}
	
	
}

export default SaleView