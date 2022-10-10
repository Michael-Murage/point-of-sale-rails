import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

function Home() {
	const [data, setData] = useState([])
	const [cart, setCart] = useState([])
	const [err, setErr] = useState('')
	// const [tot, setTot] = useState(0)

	let currentTotal = cart.reduce((p, c)=> (p + c.price), 0)

	useEffect(()=>{
		fetch('/api/items')
		.then((res)=>{
			if(res.ok){
				res.json().then(setData)
			}else{
				res.json().then(setErr)
			}
		})
		.catch(err => setErr(err))
	},[])

	const removeFromCart = (id)=>{
		const item = cart.slice(0, id).concat(cart.slice(id+1, cart.length-1))
		setCart(item)
	}

	const addToCart = (id)=>{
		const item = data.filter(elem=> elem.id === id)
		setCart([...cart].concat(item))
	}

	const generateSale = (e) =>{		
		// ensure cart is not empty
		try {
			console.log(cart[0].user_id);
		} catch (error) {
			toast('cart is empty')
			return
		}

		//generate a sales record
		let items_sold = (cart.map(elem=> elem.name))
		
		fetch('/api/sales',{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				user_id: cart[0].user_id,
				customer_id: 5,
				items_sold: `${items_sold}`,
				total: currentTotal
			})
		})
		.then((res)=>{
			if(res.ok){
				//reset the cart
				setCart([])
				// update the quantity
				fetch('/api/quantity',{
					method: "PATCH",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({items: items_sold})
				})
			}else{
				res.json().then(()=>toast('Something went wrong'))
			}
		})
		.catch((err)=>console.log(err.message))
		
	}

	return (
		<div className='row '>
				<div className='col col-sm-3 col-md-3 col-lg-3 sidebar-parent' style={{backgroundColor: "var(--navy)", color: "var(--blue)"}}>
					<div className='cart-cont'>
					{
						cart.map((item, ind) => {
							return (
								<div className='row d-flex border cart' key={ind} id={ind}>
									<p className='col '>{item.name.split('_').join(' ')}</p>
									<p className='col'>1</p>
									<p className='col'>{item.price} </p>
									<button className='btn remove' onClick={()=>removeFromCart(ind)}>Remove</button>
								</div>
							)
						})
					}
					</div>
				<div className='sidebar-print sticky-bottom'>
					<p className='ml-2'>Total: {cart[1] ? currentTotal : 0}</p>
					<div className='text-center mt-2'>
						<button className='btn btn-primary' onClick={generateSale}>Print</button>
					</div>
				</div>
				
			</div>
			<div className='col col-sm-9 col-md-9 col-lg-9' style={{backgroundColor: "var(--light)"}}>
				<div className='container-fluid d-flex items-cont'>
					{
						(Array.isArray(data) ? data : []).map(item=>{
							return (
								<div className='card m-2 item' style={{backgroundColor: "var(--blue)", color: "var(--navy)"}} key={item.id} id={item.name} onClick={()=>addToCart(item.id)}>
									<img src={require('../assets/Veggie.jpeg')} className='item-img' alt='item'/>
									<h4>{item.quantity} remaining</h4>
									<h3>{item.name.split('_').join(' ')}</h3>
									<h4>{item.category.name}</h4>
									<h4 >Price: Kshs <span style={{color: "var(--light)"}}>{item.price}</span></h4>
									<div >
										<button className='btn btn-primary' style={{ color: "var(--navy)"}}>Add to cart</button>
									</div>
								</div>
							)
						})
					}
					<ToastContainer/>
				</div>
			</div>
		</div>
	)
}

export default Home