import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Loading from './Loading'

function Suppliers(){
	const [sup, setSup] = useState([])

	useEffect(()=>{
		fetch('/api/suppliers')
		.then(res=>{
			if(res.ok){
				res.json().then(setSup)
			}else{
				toast('Something went wrong with your request')
		})
	},[])

	

	try{
		return (
			<div className='row'>
				<SideBar/>
				<div>
					{
						{Array.isArray(sup ? sup : []).map((per)=>{
							{per.id}
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
// t.string "location"
  //  t.string "name"
    //t.string "schedule"
//    t.integer "user_id"
//    t.string "image"
