import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loading from './Loading'
import SideBar from './SideBar'

function Suppliers(){
	const [sup, setSup] = useState([])
	const navigate = useNavigate()

	useEffect(()=>{
		fetch('/api/auth')
		.then(res=>{
			if(res.status === 401){
				navigate('/')
				toast('User is not authorized')
			}
		})
		
		fetch('/api/suppliers')
		.then(res=>{
			if(res.ok){
				res.json().then(setSup)
			}else{
				toast('Something went wrong with your request')
			}
		})
        // eslint-disable-next-line
	},[])


	try{
		return (
			<div className='row'>
				<SideBar/>
				<div className='col col-sm-10 col-xs-10 col-md-9 col-lg-9 bg-light supplier-cont container'>
					{
						(Array.isArray(sup) ? sup : []).map((per)=>{
							return (
								<div key={per.id} className='card mx-2 my-2 supplier-card'>
									<img src={!per.image ? '../assets/dummy-img.png' : per.image} alt={per.name} className='supplier-img img-fluid'/>
									<p className='px-3 mb-0'><strong>Name:</strong> {per.name}</p>
									<p className='px-3 mb-0'><strong>From:</strong> {per.location}</p>
									<p className='px-3 mb-0'><strong>Schedule:</strong> {per.schedule}</p>
									<div className=' mb-1 supplier-btn'>
										<button className='btn btn-sm update-btn mt-2' onClick={()=>navigate(`/supplier/${per.id}`)}>Update details</button>
										<button className='btn btn-sm my-1 btn-primary text-black newsupplier-btn' onClick={()=>navigate(`/new-supplier`)}>New Supplier</button>
									</div>
									<ToastContainer/>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}catch(error){
		return <Loading />
	}
}

export default Suppliers;
