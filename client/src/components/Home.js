import React, { useEffect, useState } from 'react'

function Home() {
	const [data, setData] = useState([])
	const [cart, setCart] = useState([])
	const [err, setErr] = useState('')
	// const [num, setNum] = useState(1)

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
									<p className='col'>80 </p>
									<button className='btn remove' onClick={()=>removeFromCart(ind)}>Remove</button>
								</div>
							)
						})
					}
					</div>
				<div className='sidebar-print sticky-bottom'>
					<p className='ml-2'>Total: {cart[1] ? cart.reduce((p, c)=> (p + c.quantity), 0) : 0}</p>
					<div className='text-center mt-2'>
						<button className='btn btn-primary'>Print</button>
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
									<h3>{item.name.split('_').join(' ')}</h3>
									<h4>{item.category.name}</h4>
									<h4>Quantity: {item.quantity}</h4>
									<h4>Price: $80</h4>
									<div >
										<button style={{backgroundColor: "var(--dark)", color: "var(--blue)"}}>Add to cart</button>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default Home