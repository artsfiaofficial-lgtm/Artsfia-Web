import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import Swal from 'sweetalert2'
export default function Wishlist() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [wishlist, setWishlist] = useState([])
  const [isLoader, setIsLoader] = useState(true)
  const [noItemText, setNoItemText] = useState(false)
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









  //product auth materials
  //get user function
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
  async function fetchUserWishlist() {
    const localUserId = localStorage.getItem("artsfiaUserID")
    if (!localUserId) return
    const token = await getAuthToken()
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/read/${localUserId}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if (res.ok) {
      //then check is user info is correct?
      const data = await res.json()
      setIsLoader(false)
      //set wishlist
      const wishlistArray = data.wishlist || []
      if (wishlistArray.length <= 0) {
        setNoItemText(true)
      }
      const wishlistArrayReverse = wishlistArray.reverse()
      setWishlist(wishlistArrayReverse)
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      setIsLoader(false)
      return
    }
  }
  useEffect(() => {
    fetchUserWishlist()
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
          <div className="wishListTitleBox">
            <div className="wishListHeaderIcon">
              <img src="./assets/icons/wishlistIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
            </div>
            <p className="wishListTitle">Wishlist</p>
          </div>
          <hr className='wishlistTitleHr' />
          <div className="wishlistItemContainer" style={{ justifyContent: wishlist.length <= 0 ? "center" : "space-between" }}>
            {
              isLoader &&
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
              wishlist.map((data, index) => (
                <ProductCard
                  productId={data.productId}
                  wishlist={wishlist}
                  refreshWishlist={fetchUserWishlist}
                  key={index}
                  title={data.productTitle}
                  idKey={data.productIdKey}
                  bdt={data.perProductPrice}
                  mrp={data.productMrp}
                  imgUrlFront={data.productFrontImageLink}
                  status={data.productStatus}
                  isWishlist={true}
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
