import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import { useEffect, useState } from 'react';
import Signup from './Signup';
import Navbar from './Navbar';
import Sales from './Sales';

function App() {
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

	if(!currentUser) return <Login setCurrentUser={setCurrentUser} currentUser={currentUser}/>
	// console.log(currentUser);
  return (
    <div>
      <BrowserRouter>
				<Navbar setCurrentUser={setCurrentUser} currentUser={currentUser}
				 param={param} setParam={setParam} data={data} setData={setData}/>
				<Routes>
					<Route path='/' element={<Home data={data} setData={setData} filtered={filtered}/>}/>
					{/* <Route path='/login' element={<Login setCurrentUser={setCurrentUser}/>}/> */}
					<Route path='/signup' element={<Signup/>}/>
					<Route path='/sales' element={<Sales currentUser={currentUser}/>}/>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
