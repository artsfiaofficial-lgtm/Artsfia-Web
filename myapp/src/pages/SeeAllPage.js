import React, { useEffect } from 'react'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import Swal from 'sweetalert2'
export default function SeeAllPage() {
  const [productName, setProductName] = useState('')
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [productLoader, setProductLoader] = useState(true)
  const [allBangleList, setAllBangleList] = useState([])
  const [productList, setProductList] = useState([])
  const navigate = useNavigate();
  // open aside
  const openAside = () => setIsAsideOpen(true);
  // close aside
  const closeAside = () => setIsAsideOpen(false);
  // navigate and close
  const handleNavigate = (path) => {
    navigate(path);
  };







  //get param data from url
  const location = useLocation()
  const urlData = new URLSearchParams(location.search)
  const productType = atob(urlData.get('productType'))







  //set product name according to url get data
  function setProductNameFunc() {
    if (productType === 'bangle') {
      setProductName("Bangles")
    }
    else if (productType === 'saree') {
      setProductName("Saree")
    }
    else {
      setProductName("Products")
    }
  }
  useEffect(() => {
    setProductNameFunc()
  })







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






  //fetch prpduct data function
  async function fetchProductData() {
    const token = await getAuthToken()
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product`,{
      method : "GET",
      headers : {
         'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
      }
    })
    if (res.ok) {
      const data = await res.json()
      const fetchedData = []
      for (let key in data) {
        fetchedData.push({ idKey: key, ...data[key] })
      }
      setProductLoader(false)
      const filteredItems = fetchedData.filter((e) => e.productCategory === productType)
      setProductList(filteredItems)
      //if its all bangles
      setAllBangleList(filteredItems)

    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      setProductLoader(false)
      return
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [])







  //bangle category onchange function
  async function bangleCategoryDirect(val) {
    if (val === 'premium') {
      const premiumBangles = allBangleList.filter((e) => e.bangleCategory === 'premium')
      setProductList(premiumBangles)
    }
    else if (val === 'affordable') {
      const affordableBangles = allBangleList.filter((e) => e.bangleCategory === 'affordable')
      setProductList(affordableBangles)
    }
    else {
      setProductList(allBangleList)
    }
  }








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
          <div className="productAllPageHeaderBox">
            <div className="productAllPageHeaderBoxIconBox">
              <img src="./assets/icons/productIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
            </div>
            {productName}
            {
              productType === 'bangle' &&
              <select name="" onChange={(e) => bangleCategoryDirect(e.target.value)} className='form-control' style={{ fontFamily: "Poppins", width: "150px" }} id="">
                <option value="all">All Category</option>
                <option value="premium">Premium</option>
                <option value="affordable">Affordable</option>
              </select>
            }
          </div>

          <div className="mainProductListRenderBox">
            {productLoader &&
              //product loader box start from here
              <div className="productLoaderBoxHome">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              //product loader box ends here
            }
            {
              productList.map((data, index) => (
                <ProductCard key={index} idKey={data.idKey} status={data.productStatus} title={data.productTitle} mrp={data.productMrpPrice} bdt={data.productPrice} imgUrlFront={data.productFrontImageLink} />
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
