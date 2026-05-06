import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import NavigationBar from '../components/NavigationBar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ProductCard from '../components/ProductCard'
export default function Search() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([])
  const [foundProducts, setFoundProducts] = useState([])
  const [productName, setProductName] = useState('')
  const [noProductTxt, setNoProductTxt] = useState(false)
  const [productItemHeaderMainBox, setProductItemHeaderMainBox] = useState(false)
  const navigate = useNavigate();
  // open aside
  const openAside = () => setIsAsideOpen(true);
  // close aside
  const closeAside = () => setIsAsideOpen(false);
  // navigate and close
  const handleNavigate = (path) => {
    navigate(path);
  };








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
    console.log(token)
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
      setAllProducts(fetchedData)
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      return
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [])








  //check is product exist if then store it in a list and show them
  function searchFunction(e) {
    e.preventDefault()
    if (!productName) {
      setFoundProducts([])
      setNoProductTxt(true)
      setProductItemHeaderMainBox(false)
      return
    }
    const regex = new RegExp(`\\b${productName.trim()}\\b`, "i")
    const findProducts = allProducts.filter((product) =>
      regex.test(product.productTitle.trim().toLowerCase())
    )
    if (findProducts.length <= 0) {
      setProductItemHeaderMainBox(false)
      setNoProductTxt(true)
      setFoundProducts([])
      return
    }
    else {
      setProductItemHeaderMainBox(true)
      setNoProductTxt(false)
      setFoundProducts(findProducts)
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
          <form className="searchDivBox" onSubmit={searchFunction}>
            <div className="searchDivBoxIcon">
              <img src="./assets/icons/searchIconWhite.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
            </div>
            <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" placeholder='Search...' className='searchInputBox' />
            <button className='searchActionBtn'>
              Search
            </button>
          </form>
          {
            //no item text show starts
            noProductTxt &&
            <p className='niEText'>No Items Found</p>
            //no item text show ends
          }
          <div className="searchedItems">
            <div className="searchedItemHeader">
              {
                productItemHeaderMainBox &&
                <>
                  <div className="searchedItemHeaderIcon">
                    <img src="./assets/icons/productIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                  </div>
                  Items :
                </>
              }
            </div>
            <div className="itemsContainerSearched">
              {
                foundProducts.map((data, index) => (
                  <ProductCard
                    key={index}
                    title={data.productTitle}
                    idKey={data.idKey}
                    bdt={data.productPrice}
                    mrp={data.productMrpPrice}
                    imgUrlFront={data.productFrontImageLink}
                    status={data.productStatus}
                  />
                ))
              }
            </div>
          </div>
        </div>
        //main content box ends here
      }
      <NavigationBar />
    </>
  )
}
