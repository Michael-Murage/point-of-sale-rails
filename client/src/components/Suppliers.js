import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loading from './Loading'
import SideBar from './SideBar'

function Suppliers(){
	const [sup, setSup] = useState([])
	const navigate = useNavigate()

	useEffect(()=>{
		fetch('/api/suppliers')
		.then(res=>{
			if(res.ok){
				res.json().then(setSup)
			}else{
				toast('Something went wrong with your request')
			}
		})
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
									<img src={require('../assets/dummy-img.png')} alt={per.name} className='supplier-img img-fluid'/>
									<p className='px-3 mb-0'><strong>Name:</strong> {per.name}</p>
									<p className='px-3 mb-0'><strong>From:</strong> {per.location}</p>
									<p className='px-3 mb-0'><strong>Schedule:</strong> {per.schedule}</p>
									<div className='text-center mb-1'>
										<button className='btn btn-sm update-btn my-2' onClick={()=>navigate(`/supplier/${per.id}`)}>Update details</button>
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
