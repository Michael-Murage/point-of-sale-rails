import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Input from '../reusables/Input'
import '../styles/Login.css'
import Button from '../reusables/Button'

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
    <div className='border border-blue-300 cont bg-blue-100'>
      <div className="border px-6 rounded-lg shadow-md w-50 mx-auto form-container text-center bg-white">
        <form action="" className='py-6 px-3'>
          <h2
            className='font-semibold my-3 text-2xl'
          >
            SIGN IN
          </h2>
          <Input
            label='EMAIL'
            id='email'
            value={cred.name}
            labelClassName='text-xs'
            containerClassName='my-3 py-2'
            inputClassName=''
            required
            handleChange={handleChange}
          />
          <Input
            type='password'
            id='password'
            label='PASSWORD'
            labelClassName='text-xs'
            containerClassName='my-3 py-2'
            value={cred.name}
            required
            handleChange={handleChange}
          />

          <Button
            type='submit'
            buttonClassName='bg-blue-600 hover:bg-blue-400 rounded-md px-6 py-2 text-white hover:text-gray-600 my-6 text-sm'
            value='LOGIN'
          />
        </form>
      </div>
    </div>
  )
}

export default Login