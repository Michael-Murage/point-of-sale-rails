import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Login({ setCurrentUser, currentUser }) {
	const [err, setErr] = useState(null)
	const [cred, setCred] = useState({
		name: '',
		password: ''
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const resp = await fetch('/api/login', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(cred)
			})
			if(resp.ok){
				const jsonResp = await resp.json()
				setCurrentUser(jsonResp)
				toast("Welcome")
			}else{
				const error = await resp.json()
				setErr(error)
			}
		} catch (error) {
			setErr(error)
			toast("Something went wrong")
		}
	}
	// console.log(currentUser);
	// console.log(err ? err.errors[0] : 'no error');
	const handleChange = (e) => {
		setCred({...cred, [e.target.id]: e.target.value})
	}
	return (
		<div className="vh-100 gradient-custom row">
			<div className='col col-md-4 col-lg-4 col-sm-0'>
				<img src={require('../assets/coffee_with_friends.png')} alt='friends with coffee' className='login-img'/>
			</div>
				<form className='col col-md-8 col-lg-8 col-sm-12 login-form text-center bg-light pt-3 border' onSubmit={handleSubmit}>
							
								{/* <div className=" text-center bg-light justify-content-center align-items-center h-100"> */}
									

													<h2 className="fw-bold mb-2 text-uppercase">Login</h2>
													<p className="text-dark-50 mb-4">Please enter your login and password!</p>

													<div className="form-outline form-white mb-3">
														<input type="text" id="name" value={cred.name} onChange={handleChange} className="form-control form-control-lg" />
														<label className="form-label" htmlFor="name">Email or Username</label>
													</div>

													<div className="form-outline form-white mb-2">
														<input type="password" id="password" value={cred.password} onChange={handleChange} className="form-control form-control-lg" />
														<label className="form-label" htmlFor="password">Password</label>
													</div>

													<div className="container mb-3">
														<div className="bg-danger">
															{err ? err.errors[0] : null}
														</div>
													</div>
													<button className="btn btn-outline-light btn-lg px-5 mb-2" style={{backgroundColor: '#5C8DD7'}} type="submit" >Login</button>
													<ToastContainer/>
												{/* </div> */}
											
							
						</form>
		
		</div>
	)
}

export default Login