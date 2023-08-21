import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login'
import Home from './components/Home'

function App(): JSX.Element {
	const [currentUser, setCurrentUser] = useState(null)
	const [param, setParam] = useState('')
	const [data, setData] = useState([])

	const filtered = data.filter(val => val.name.toLowerCase().includes(param))

	useEffect(()=>{
		fetch('/api/me')
		.then((res)=>{
			if(res.ok){
				res.json().then((data)=> setCurrentUser(data))
			}
		})
	},[])

	// if(!currentUser && location.pathname !== '/login') {
  //   return <Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>
  // }

  return (
    <>
      <div>
        <BrowserRouter>
		  		{/* <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser}
		  		 param={param} setParam={setParam} data={data} setData={setData}/> */}
		  		<Routes>
		  			<Route path='/' element={<Home data={data} setData={setData} filtered={filtered} currentUser={currentUser}/>}/>
		  			{/* <Route path='/sales' element={<Sales currentUser={currentUser}/>}/> */}
		  			{/* <Route path='/sales/:id' element={<SaleView/>}/> */}
	    			{/* <Route path='/suppliers' element={<Suppliers/>}/> */}
		  			{/* <Route path='/supplier/:id' element={<SupplierEdit/>}/> */}
		  			{/* <Route path='/new-supplier' element={<NewSupplier currentUser={currentUser}/>}/> */}
		  			{/* <Route path='/users' element={<Users/>}/> */}
		  			{/* <Route path='/categories' element={<Categories/>}/> */}
		  			{/* <Route path='/items' element={<Items/>}/> */}
		  			{/* <Route path='/items/:id' element={<ItemEdit/>}/> */}
		  			{/* <Route path='/new-item' element={<NewItem currentUser={currentUser}/>}/> */}
		  		</Routes>
		  	</BrowserRouter>
        <ToastContainer/>
      </div>
    </>
  )
}

export default App
