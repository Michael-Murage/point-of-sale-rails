import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import { useEffect, useState } from 'react';
import Signup from './Signup';
import Navbar from './Navbar';

function App() {
	const [currentUser, setCurrentUser] = useState(null)

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
				<Navbar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
				<Routes>
					<Route path='/' element={<Home/>}/>
					{/* <Route path='/login' element={<Login setCurrentUser={setCurrentUser}/>}/> */}
					<Route path='/signup' element={<Signup/>}/>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
