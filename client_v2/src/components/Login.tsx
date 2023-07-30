import React, { useState } from 'react'
import { toast } from 'react-toastify'

function Login({ setCurrentUser, currentUser }): JSX.Element {
	const [err, setErr] = useState(null)
	const [cred, setCred] = useState({
		name: '',
		password: ''
	})

	const handleSubmit = async (e: Event) => {
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
		} catch (error: any) {
			setErr(error)
			toast("Something went wrong")
		}
	}
	// console.log(currentUser);
	// console.log(err ? err.errors[0] : 'no error');
	const handleChange = (e: Event) => {
		setCred({...cred, [e.target?.id]: e.target?.value})
	}
  
  return (
    <div>
      <div className="">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" />
        </div>
      </div>
    </div>
  )
}

export default Login