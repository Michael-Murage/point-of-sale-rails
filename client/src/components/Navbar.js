import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { BiLogOut, BiSearchAlt } from 'react-icons/bi'
import { BsFillCartPlusFill } from 'react-icons/bs'

function Navbar({ setCurrentUser, currentUser }) {
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
	return (
		<nav className="navbar navbar-light d-flex" style={{backgroundColor: "var(--navy)"}}>
		  <a className="navbar-brand" href="#">Navbar</a>
		 		<div className='d-flex'>
		      <a className="text-decoration-none mx-2" style={{color: "var(--blue)"}} href="#">
						<h3 data-toggle="tooltip" data-placement="bottom" title="Sell"><BsFillCartPlusFill/></h3>
					</a>
					<a className="text-decoration-none mx-2" style={{color: "var(--blue)"}} href="#">
						<h3 data-toggle="tooltip" data-placement="bottom" title="Search"><BiSearchAlt/></h3>
					</a>
					<a className="text-decoration-none mx-2" style={{color: "var(--blue)"}} href="#">
						<h3 data-toggle="tooltip" data-placement="bottom" title={`user- ${currentUser.name}`}><FaUserAlt/></h3>
					</a>
		      <a className="text-decoration-none mx-2" style={{color: "var(--blue)"}} href="#">
						<h3 data-toggle="tooltip" data-placement="bottom" title="Logout" onClick={logOutUser}><BiLogOut/></h3>
					</a>
				</div>
		</nav>
	)
}

export default Navbar