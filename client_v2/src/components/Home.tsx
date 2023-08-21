import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AiOutlineDelete } from 'react-icons/ai'
import '../styles/Home.css'
import Button from '../reusables/Button'
import { Product, User } from '../types'


type CartProps = {
  item: Product,
  ind: number,
  removeFromCart: Function,
  onQuantityChange: Function,
}
type HomeProps = {
  data: Product[],
  setData: Function,
  filtered: Product[],
  currentUser: User
}
let items = document.getElementsByClassName('no-of-items')

function Cart({ item, ind, removeFromCart, onQuantityChange }: CartProps) {
  return (
		<div className='flex flex-row card cart container my-2' id={String(ind)}>
			<div className=' col col-sm-3 col-md-3 col-lg-4 px-0 py-2 mx-0 text-center'>
				<img src={!item.image ? 'src/assets/Veggie.jpeg' : item.image} className='cart-img' alt='product'/>
			</div>
			<div className='cart-content col col-sm-9 col-md-9 col-lg-8'>
				<div className='flex mt-1 justify-between'>
					<p className=' ' style={{fontWeight: "bold"}}>{item.name}</p>
					<h5 className='remove text-dark ml-auto' onClick={()=>removeFromCart(ind)}><AiOutlineDelete/></h5>
				</div>
				<div className='flex'>
					<p>Quantity:</p>
					<input type='number' id={String(item.id)} onChange={(event) => onQuantityChange(ind, event.target.value)} className='form-control mx-3 no-of-items' style={{width: '4em', height: '20px'}}/>
				</div>
				<div className='flex'>
					<p>Price:</p> 
					<p className='mx-1' style={{color: 'orange'}}>{item.price * (item.no_to_sell ? item.no_to_sell : 1)}</p>
				</div>
		
			</div>
			
			
		</div>
	)
}


function Home({ data, setData, filtered, currentUser }: HomeProps) {
	const [cart, setCart] = useState<Product[]>([])
	const [err, setErr] = useState('')
	const [currentTotal, setCurrentTotal] = useState(0);

	useEffect(()=>{
		setCurrentTotal(cart.reduce((p, c)=> (p + (c.price * (!c.no_to_sell ? 1 : c.no_to_sell))), 0));
	}, [cart])

	useEffect(()=>{
		fetch('/api/items')
		.then((res)=>{
			if(res.ok){
				res.json().then((item: Product) => setData(item))
			}else{
				res.json().then(setErr)
				toast(err)
			}
		})
		.catch(err => setErr(err))
	// eslint-disable-next-line
	},[])

	const removeFromCart = (id: number)=>{
		const item = cart.slice(0, id).concat(cart.slice(id+1, cart.length-1))
		setCart(item)
	}

	const onQuantityChange = (idx: number, value: number) => {
		// get the array item from index
		let clone = [...cart]
		clone[idx].no_to_sell = value
		setCart(clone)
		
		// update the quantity
		// update the cart
	}

	const addToCart = (id: number)=>{
		const item = data?.filter(elem=> elem.id === id)
		setCart([...cart].concat(item))
	}

	const generateSale = (e: Event) =>{		
		// ensure cart is not empty
		try {
			// console.log(cart[0].user_id);
		} catch (error) {
			toast('cart is empty')
			return
		}

		//generate a sales record
		let items_sold = (cart.map(elem => elem.name))
		const number = Object.values(items).map(elem=> elem.value)
		
		fetch('/api/sales',{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				user_id: currentUser.id,
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
					body: JSON.stringify({items: items_sold, number: number})
				}).then((res)=>{
					if(res.ok){
						data.map(item=> item.quantity -= 1)
					}
				})
			}else{
				res.json().then(()=>toast('Something went wrong'))
			}
		})
		.catch((err)=>console.log(err.message))
		
	}

	return (
		<div className='row'>
				<div className='col col-lg-3 sidebar-parent' style={{backgroundColor: "#fff"}}>

					<div className='cart-cont'>
						<div className='cart-head my-2' style={{marginLeft: '5px'}}>
							<p style={{fontWeight: 'bolder'}}> Your Products</p>
							<div style={{ height: '4px', backgroundColor: 'orange', width: '5em'}} />
						</div>
					{
						cart.map((item, ind) => {
							return (
								<Cart item={item} ind={ind} key={ind} onQuantityChange={onQuantityChange} removeFromCart={removeFromCart} />
							)
						})
					}
					</div>
					<div className='sidebar-print '>
						<p className='text-center'>Total: {cart[1] ? currentTotal : 0}</p>
						<div className='text-center mt-2'>
              <Button
                buttonClassName='hover:scale-105 bg-primary px-3 py-1 rounded-md hover:shadow-md text-white'
                containerClassName='my-2 py-1'
                handleClick={generateSale}
                value='Print'
              />
						</div>
					</div>
				
			</div>
			<div className='col col-sm-12 col-lg-9' style={{backgroundColor: "var(--light)"}}>
				<div className='flex flex-wrap'>
					{
						(Array.isArray(filtered) ? filtered : [])?.map(item=>{
							return (
								<div className='flex flex-col card item text-dark mx-3 my-3' style={{backgroundColor: "var(--light)"}} key={item.id} id={item.name} onClick={()=>addToCart(item.id)}>
									<img src={!item.image ? 'src/assets/Veggie.jpeg' : item.image} className='item-img' alt='item'/>
									<h4 className='font-medium'>{item.quantity} remaining</h4>
									<h3 className='item-name font-medium'>{item.name.split('_').join(' ')}</h3>
									<h4 className='font-small'>{item.category.name}</h4>
									<h4 className='font-medium'>Price: Kshs <span style={{color: "black"}}>{item.price}</span></h4>
									<div >
                    <Button
                      containerClassName='my-1'
                      buttonClassName='bg-orange text-dark font-medium py-1 px-3 rounded-md text-gray-800 hover:scale-105 hover:bg-gray-900'
                      style={{}}
                      value='Add to cart'
                    />
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