import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import CartCard from '../components/CartCard'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
export default function Cart() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [userCartList, setUserCartList] = useState([])
  const [noItemText, setNoItemsText] = useState(false)
  const [originalCartList, setOriginalCartList] = useState([])
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate();
  // open aside
  const openAside = () => setIsAsideOpen(true);
  // close aside
  const closeAside = () => setIsAsideOpen(false);
  // navigate and close
  const handleNavigate = (path) => {
    navigate(path);
  };






  //check is user logged in? if not then naviagte user to auth path
  useEffect(() => {
    const userId = localStorage.getItem("artsfiaUserID")
    if (!userId || userId.trim() === '') {
      navigate("/auth")
      return
    }
  }, [])







  //auth materials
  //const function
  async function getAuthToken() {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/identify`
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: process.env.REACT_APP_AUTH_EMAIL_BACKEND,
        password: process.env.REACT_APP_AUTH_PASSWORD_BACKEND
      })
    })
    const tokenId = await res.json()
    if (tokenId) {
      console.log(tokenId)
      return tokenId.token
    }
    else {
      return
    }
  }









  //fetch user data function
  async function fetchUserData() {
    const localUserId = localStorage.getItem("artsfiaUserID")
    if (!localUserId) return
    const token = await getAuthToken()
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/read/${localUserId}`,{
      method : "GET",
      headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${token}`
        }
    })
    if (res.ok) {
      //then check is user info is correct?
      const data = await res.json()
      setLoader(false)
      const cartData = data.cart || []
      //if not data exists
      if (cartData.length <= 0) {
        setNoItemsText(true)
      }
      setOriginalCartList(cartData)
      const cartDataReverse = [...cartData].reverse()
      setUserCartList(cartDataReverse)
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      setLoader(false)
      return
    }
  }
  useEffect(() => {
    fetchUserData()
  }, [])








  return (
    <>
      <Navbar isAside={openAside} isMyAsideOpen={isAsideOpen} />
      {
        //Aside Bar 
     <div className={`asideBar ${isAsideOpen ? "open" : "close"}`}>
          <div className="asideHeader">
            <div className="asideHeaderLogoBox">
              <img src="./assets/logo/logo.png" alt="" />
            </div>
            <div className="asideHeaderCloseIconBox" onClick={closeAside}>
              <img src="./assets/icons/closeIcon.png" alt="" />
            </div>
          </div>
          <div className="asideBarOptionsBox">
            <div className="optionBox" onClick={() => handleNavigate("/profile")}>
              <div className="optionBoxIcon">
                <img src="./assets/icons/profileIcon.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">User Profile</div>
            </div>
            <div className="optionBox" onClick={() => handleNavigate("/cart")}>
              <div className="optionBoxIcon">
                <img src="./assets/icons/cartIcon.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">Cart</div>
            </div>
            <div className="optionBox" onClick={() => handleNavigate("/search")}>
              <div className="optionBoxIcon">
                <img src="./assets/icons/searchIconBold.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">Search</div>
            </div>
            <div className="optionBox" onClick={() => handleNavigate("/wishlist")}>
              <div className="optionBoxIcon">
                <img src="./assets/icons/wishListIcon.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">Wishlist</div>
            </div>
          </div>
          <hr style={{ margin: "0" }} />
          <div className="asideBarDesignedOptions">
            <p className="asideDOCBOTitle">CATEGORY BY OCCASION</p>
            <ul className='asideUlDOC'>
              <li onClick={() => handleNavigate('/product-view?product=eid2026')}>Eid 2026</li>
              <li onClick={() => handleNavigate('/product-view?product=officeWear')}>Office Wear</li>
              <li onClick={() => handleNavigate('/product-view?product=partyWear')}>Party Wear</li>
              <li onClick={() => handleNavigate('/product-view?product=bridalWear')}>Bridal Wear</li>
              <li onClick={() => handleNavigate('/product-view?product=festiveWear')}>Festive Wear</li>
            </ul>
            <p className="asideDOCBOTitle">ALL CATEGORY</p>
            <ul className='asideUlDOC'>
              <li onClick={() => handleNavigate('/product-view?product=bangle&bangleType=all')}>Bangle</li>
              <ul style={{ listStyleType: "square", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li onClick={() => handleNavigate('/product-view?product=bangle&bangleType=fabric')}>Fabric</li>
                <li onClick={() => handleNavigate('/product-view?product=bangle&bangleType=thread')}>Thread</li>
                <li onClick={() => handleNavigate('/product-view?product=bangle&bangleType=square')}>Square</li>
                <li onClick={() => handleNavigate('/product-view?product=bangle&bangleType=shell')}>Shell</li>
              </ul>
              <li onClick={() => handleNavigate('/product-view?product=babyBangle')}>Baby Bangle</li>
              <ul style={{ listStyleType: "circle", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li onClick={() => handleNavigate('/product-view?product=bangle&bangleType=baby&bangleSize=5-3')}>5 Months-3 Years</li>
                <li onClick={() => handleNavigate('/product-view?product=bangle&bangleType=baby&bangleSize=3-7')}>3-7 Years</li>
                <li onClick={() => handleNavigate('/product-view?product=bangle&bangleType=baby&bangleSize=7-12')}>7-12 Years</li>
              </ul>
              <li onClick={() => handleNavigate('/product-view?product=earing')}>Earing</li>
              <li onClick={() => handleNavigate('/product-view?product=neckpiece')}>Neckpiece</li>
              <li onClick={() => handleNavigate('/product-view?product=fingerRing')}>Finger Ring</li>
              <li onClick={() => handleNavigate('/product-view?product=combo')}>Combo</li>
            </ul>
          </div>
        </div>
        //aside bar ends
      }
      {
        //main content box start from here
        <div className="mainContentBox">
          <div className="cartTitle">
            <div className="cartHeaderIcon">
              <img src="./assets/icons/cartIcon.png" alt="" />
            </div>
            My Cart
          </div>
          <hr className='cartHr' />
          <div className="cartItemsBox">
            {
              loader &&
              /*Loader div starts*/
              <div className="cartLoaderDiv">
                <div className="spinner-border text-dark" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
              /*Loader div ends*/
            }
            {
              //no item text show starts
              noItemText &&
              <p className='niEText'>No Items Yet</p>
              //no item text show ends
            }
            {
              userCartList.map((data, index) => (
                <CartCard
                  key={index}
                  productId={data.productId}
                  cartDataObj={data}
                  refreshCartFunction={fetchUserData}
                  originalList={originalCartList}
                  title={data.productTitle}
                  img={data.productFrontImageLink}
                  productStatus={data.productStatus}
                  quantity={data.productQuantity}
                  deliveryCharge={data.deliveryCharge}
                  productPerPrice={data.perProductPrice}
                  bangleSize={data.bangleSize}
                  category={data.productCategory}
                  price={data.totalPrice}
                  subImages={data.subImages}
                  message={data.message}
                  idKey={data.productIdKey}
                />
              ))
            }
          </div>
        </div>
        //main content box ends here
      }
      <NavigationBar />
    </>
  )
}
