import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sales from './Sales';
import SaleView from './SaleView';
import Suppliers from './Suppliers'
import SupplierEdit from './SupplierEdit';
import Users from './Users';
import Categories from './Categories';
import NewSupplier from './NewSupplier';
import Items from './Items';
import ItemEdit from './ItemEdit.jsx';
import NewItem from './NewItem';

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
					<Route path='/' element={<Home data={data} setData={setData} filtered={filtered} currentUser={currentUser}/>}/>
					<Route path='/sales' element={<Sales currentUser={currentUser}/>}/>
					<Route path='/sales/:id' element={<SaleView/>}/>
	  			<Route path='/suppliers' element={<Suppliers/>}/>
					<Route path='/supplier/:id' element={<SupplierEdit/>}/>
					<Route path='/new-supplier' element={<NewSupplier currentUser={currentUser}/>}/>
					<Route path='/users' element={<Users/>}/>
					<Route path='/categories' element={<Categories/>}/>
					<Route path='/items' element={<Items/>}/>
					<Route path='/items/:id' element={<ItemEdit/>}/>
					<Route path='/new-item' element={<NewItem currentUser={currentUser}/>}/>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
