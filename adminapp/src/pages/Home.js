import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function Home() {
  //navigator init
  const navigate = useNavigate()






    //if admin not logged in then refer admin to login page
    useEffect(()=>{
      const adminPermit = localStorage.getItem("artsfiaControlLogin")
      if(!adminPermit || adminPermit !== 'true'){
        navigate('/login')
      }
    },[])







  return (
    <div>
      <Navbar />
      <p className='welcomeNote'>Welcome to ARTSFIA</p>
      <p className="controlPanelTitle">Control panel</p>
      <div className="content-container">
        <div className="user-manage-section" onClick={()=>navigate("/clients")}>
          <div className="section-icon-div" style={{ width: "58px", height: "58px" }}>
            <img src="./assets/icons/userIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
          </div>
          Manage Client
        </div>
        <div className="add-product-section" onClick={()=>navigate("/add")}>
          <div className="section-icon-div">
            <img src="./assets/icons/add-product-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
          </div>
          Add Product
        </div>
        <div className="order-box-section" onClick={()=>navigate("/orders")}>
          <div className="section-icon-div">
            <img src="./assets/icons/view-product-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
          </div>
          Order Review
        </div>
        <div className="review-product-section"  onClick={()=>navigate("/products")}>
          <div className="section-icon-div">
            <img src="./assets/icons/product-review-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
          </div>
          Product Review
        </div>
      </div>
    </div>
  )
}
