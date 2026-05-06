import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavigationBar() {
  const navigate = useNavigate()
  return (
    <div className='navigationBar'>
      <div className="navOption" onClick={() => navigate('/')}>
        <img src="./assets/icons/navHome.png" alt="" />
      </div>
      <div className="navOption" onClick={() => navigate('/profile')}>
        <img src="./assets/icons/navProfile.png" alt="" />
      </div>
      <div className="navOption" onClick={() => navigate('/cart')}>
        <img src="./assets/icons/navCart.png" alt="" />
      </div>
      <div className="navOption" onClick={() => navigate('/wishlist')}>
        <img src="./assets/icons/navHeart.png" alt="" />
      </div>
    </div>
  )
}
