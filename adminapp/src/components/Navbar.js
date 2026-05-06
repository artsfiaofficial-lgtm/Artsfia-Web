import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  //init navigator
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <div className="navlogo">
            <img src="./assets/logo/logo.png" alt="" />
      </div>
      <div className="navhome" onClick={()=>navigate('/')}>
            <img src="./assets/icons/navHome.png" alt="" />
      </div>
    </div>
  )
}
