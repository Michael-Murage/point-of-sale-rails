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
		<form className="vh-100 gradient-custom bg-light" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card text-white" style={{borderRadius: "1rem", backgroundColor: "var(--navy)"}}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <div className="form-outline form-white mb-4">
                    <input type="text" id="name" value={cred.name} onChange={handleChange} className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="name">Email or Username</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="password" id="password" value={cred.password} onChange={handleChange} className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="password">Password</label>
                  </div>

									<div className="container mb-3">
  									<div className="bg-danger">
    									{err ? err.errors[0] : null}
										</div>
									</div>
                  <button className="btn btn-outline-light btn-lg px-5" type="submit" >Login</button>
									<ToastContainer/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
	)
}

export default Login