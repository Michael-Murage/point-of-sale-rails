import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { BiCategory, BiLogOut, BiSearchAlt } from 'react-icons/bi'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'

function Navbar({ setCurrentUser, currentUser, param, setParam, data, setData }) {
	let { pathname: locationPathname } = useLocation();

	const logOutUser = (e) =>{
		e.preventDefault()
		fetch('/api/logout',{
			method: "DELETE"
		})
		.then(res=>{
			if(res.ok){
				setCurrentUser(null)
			}
		})
	}


	const handleSearch = (e) =>{
		setParam(e.target.value)
	}

	const hideSearch = (locationPathname !== '/' ? 'd-none' : 'd-block')

	return (
		<nav className="navbar navbar-light sticky-top d-flex" style={{backgroundColor: "#fff"}}>
		  <a className="navbar-brand logo-cont d-flex" href="/">
				<img className='logo' src={require('../assets/poslogo.png')} alt='logo'/>
				<h3 className='mt-2 text-primary'>POS</h3>
			</a>

		 		<div className='d-flex'>

    				<input id="search-focus" type="search" className={`form-control ${hideSearch}`}  placeholder='Search' onChange={handleSearch} value={param}/>

		      
						{/* <button data-toggle="tooltip" data-placement="bottom" title="Search"><BiSearchAlt/></button> */}
					<a className="text-decoration-none mx-2" style={{color: "var(--blue)"}} href="/sales">
						<h3 data-toggle="tooltip" data-placement="bottom" title="Main menu"><BiCategory/></h3>
					</a>
					
					<a className="text-decoration-none mx-2" style={{color: "var(--blue)"}} href="/">
						<h3 data-toggle="tooltip" data-placement="bottom" title="Sell"><BsFillCartPlusFill/></h3>
					</a>

					<a className="text-decoration-none mx-2" style={{color: "var(--blue)"}} href="/users">
						<h3 data-toggle="tooltip" data-placement="bottom" title={`user- ${currentUser.name}`}><FaUserAlt/></h3>
					</a>
		      <a className="text-decoration-none mx-2" style={{color: "var(--blue)"}} href="/">
						<h3 data-toggle="tooltip" data-placement="bottom" title="Logout" onClick={logOutUser}><BiLogOut/></h3>
					</a>
				</div>
		</nav>
	)
}

export default Navbar