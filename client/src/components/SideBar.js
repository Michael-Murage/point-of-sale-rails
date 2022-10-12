import React from 'react'
import { BiNotepad } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { GrCubes } from 'react-icons/gr'
import { HiUsers } from 'react-icons/hi'

function SideBar() {
	return (
		<div className='col col-sm-0 col-md-3 col-lg-3 sidebar-parent' style={{backgroundColor: "#fff"}}>
			<ul className='sidebar-ul'>
			<li className='sidebar-list '>
				<a className='d-flex sidebar-link' href='/sales'>
					<h1 className='sidebar-icons'><BiNotepad/></h1>
					<p className='mt-3 px-3'>Sales</p>
				</a>
			</li>
			<li className='sidebar-list'>
				<a className='d-flex sidebar-link' href='/users'>
					<h1 className='sidebar-icons'><FaUserCircle/></h1>
					<p className='mt-3 px-3'>Users</p>
				</a>
			</li>
			<li className='sidebar-list'>
				<a className='d-flex sidebar-link' href='/categories'>
					<h1 className='sidebar-icons'><GrCubes/></h1>
					<p className='mt-3 px-3'>Categories</p>
				</a>
			</li>
			<li className='sidebar-list'>
				<a className='d-flex sidebar-link' href='/suppliers'>
					<h1 className='sidebar-icons'><HiUsers/></h1>
					<p className='mt-3 px-3'>Suppliers</p>
				</a>
			</li>
			</ul>
		</div>
	)
}

export default SideBar