import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NavigationBar from '../components/NavigationBar'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
export default function ProductView() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [productData, setProductData] = useState({})
  const [productPhotoList, setProductPhotoList] = useState([])
  const [productLoader, setProductLoader] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [productMainPrice, setProductMainPrice] = useState(0)
  const [userDivision, setUserDivision] = useState('')
  const [userInfo, setUserInfo] = useState({})
  const [deliveryCharge, setDeliveryCharge] = useState(0)
  const [bangleSize, setBangleSize] = useState('')
  const [subImageDiv, setSubImageDiv] = useState(false)
  const [subSingleImage, setSubSingleImage] = useState('')
  //total price state with delivery charge and quantity
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderSubmissionLoader, setOrderSubmissionLoader] = useState(false)
  const [cartSubmissionLoader, setCartSubmissionLoader] = useState(false)
  const navigate = useNavigate();
  // open aside
  const openAside = () => setIsAsideOpen(true);
  // close aside
  const closeAside = () => setIsAsideOpen(false);
  // navigate and close
  const handleNavigate = (path) => {
    navigate(path);
  };







  //get product id from url
  const location = useLocation()
  const getProductId = location.state?.productId
  const getProductPrice = location.state?.productPrice
  const getProductStatus = location.state?.productStatus






  //get user info using localstorage user id 
  //const function
  //get auth token from the backend
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
      setUserInfo(data)
      setUserDivision(data.division || '')
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      return
    }
  }
  useEffect(() => {
    fetchUserData()
  }, [])







  //fetch prpduct data function
  async function fetchProductData() {
    const token = await getAuthToken()
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/read/${getProductId}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if (res.ok) {
      const data = await res.json()
      setProductLoader(false)
      setProductData(data)
      setProductPhotoList(data.productImageLinks)
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








  //measure main price with per product price and quantity
  function measureProductPrice() {
    const mainPrice = parseInt(getProductPrice * quantity)
    setProductMainPrice(mainPrice)
    //measure total price with delivery charge and quantity
    const total = mainPrice + deliveryCharge
    setTotalPrice(total)
  }
  useEffect(() => {
    measureProductPrice()
  }, [quantity, deliveryCharge])






  //detect user division for delivery charge
  function detectUserDeliveryCharge() {
    if (userDivision === 'Dhaka' || userDivision === 'dhaka') {
      setDeliveryCharge(80)
    }
    else {
      setDeliveryCharge(150)
    }
  }
  useEffect(() => {
    detectUserDeliveryCharge()
  })






  //fetch prpduct data function ( submit order or buy now function )
  async function postOrder() {
    //check is user logged in? if not then naviagte user to auth path
    const userId = localStorage.getItem("artsfiaUserID")
    if (!userId || userId.trim() === '') {
      navigate("/auth")
      return
    }
    if (quantity <= 0) {
      Swal.fire("Invalid Quantity!", "Please select at least 1 product before placing the order", "warning")
      return
    }
    if (productData.productCategory === 'bangle') {
      if (bangleSize === '' || !bangleSize) {
        Swal.fire("Info!", "Please enter the bangle size", "info")
        return
      }
    }
    Swal.fire({
      title: "Confirm Purchase?",
      text: "Want to confirm this purchase?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOrderSubmissionLoader(true)
        const token = await getAuthToken()
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/new`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            name: userInfo?.name || '-',
            division: userInfo?.division || '-',
            productQuantity: quantity || '-',
            date: new Date().toDateString(),
            address: userInfo?.address || '-',
            phoneNumber: userInfo?.phoneNumber || '-',
            email: userInfo?.email || '-',
            productTitle: productData?.productTitle || '-',
            productCategory: productData?.productCategory || '-',
            productFrontImageLink: productData?.productFrontImageLink || '-',
            productStatus: productData?.productStatus || '-',
            deliveryCharge: deliveryCharge || '-',
            productIdKey: getProductId,
            totalPrice: totalPrice || '-',
            productPerPrice: productData?.productPrice || '-',
            productSubPhotos: productData?.productImageLinks || [],
            bangleSize: bangleSize || '-',
            message: message
          })
        })
        if (res.ok) {
          Swal.fire("Thank you for your purchase!", "Your order has been received successfully", "success")
          setOrderSubmissionLoader(false)
        }
        else {
          Swal.fire("Oops!", "Your order could not be completed", "error")
          setOrderSubmissionLoader(false)
          return
        }
      }
    })
  }








  //add to cart function
  async function addToCart() {
    //check is user logged in? if not then naviagte user to auth path
    const userId = localStorage.getItem("artsfiaUserID")
    if (!userId || userId.trim() === '') {
      navigate("/auth")
      return
    }
    if (quantity <= 0) {
      Swal.fire("Invalid Quantity!", "Please select at least 1 product before placing the order", "warning")
      return
    }
    if (productData.productCategory === 'bangle') {
      if (bangleSize === '' || !bangleSize) {
        Swal.fire("Info!", "Please enter the bangle size", "info")
        return
      }
    }
    Swal.fire({
      title: "Add to cart?",
      text: "Want to add this product to cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setCartSubmissionLoader(true)
        const localUserId = localStorage.getItem("artsfiaUserID")
        const token = await getAuthToken()
        //user data manipulation
        const prevCarts = userInfo.cart || []
        const productDataObj = {
          name: userInfo?.name || '-',
          divivion: userInfo?.division || '-',
          address: userInfo?.address || '-',
          phoneNumber: userInfo?.phoneNumber || '-',
          email: userInfo?.email || '-',
          productTitle: productData?.productTitle || '-',
          productCategory: productData?.productCategory || '-',
          productStatus: productData?.productStatus || '-',
          deliveryCharge: deliveryCharge || '-',
          totalPrice: totalPrice || '-',
          productPerPrice: productData?.productPrice || '-',
          bangleSize: bangleSize || '-',
          message: message,
          productQuantity: quantity,
          productId : getProductId,
          perProductPrice: productData?.productPrice
        }
        const newCartArray = [...prevCarts, productDataObj]
        //user data manipulation
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/update/${localUserId}`, {
          method: "PUT",
          headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            cart: newCartArray
          })
        })
        if (res.ok) {
          Swal.fire("Product added to cart", "Your product has been added to the cart", "success")
          setCartSubmissionLoader(false)
        }
        else {
          Swal.fire("Oops!", "Failed to add your product to the cart", "error")
          setCartSubmissionLoader(false)
          return
        }
      }
    })
  }







  //if user not logged in then set delivery charge 0 (zero)
  useEffect(() => {
    const userId = localStorage.getItem("artsfiaUserID")
    if (!userId || userId.trim() === '') {
      setDeliveryCharge(0)
    }
  })






  //sub image tap show function
  function showSubImage(img) {
    setSubImageDiv(true)
    setSubSingleImage(img)
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
          <div className="mainPhotoShowDivView">
            {productLoader &&
              //product loader box start from here
              <div className="productLoaderBoxHome">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              //product loader box ends here
            }
            <img src={productData.productFrontImageLink} onClick={() => showSubImage(productData.productFrontImageLink)} alt="" />
          </div>
          <div className="sidePhotoShowBox">
            {
              productPhotoList.map((data, index) => (
                <div key={index} className="sidePhotoShowBoxItem" onClick={() => showSubImage(data)}>
                  <img src={data} alt="" />
                </div>
              ))
            }
          </div>

          <div className="productInfoBoxViewMain">
            <p className="productNameView"><b>Product : </b>{productData.productTitle || '-'}</p>
            <p className='prevRateView'><del>MRP. {productData.productMrpPrice || '-'} Tk.</del></p>
            <p className='mainRateView'>BDT. {productData.productPrice || '-'} Tk.</p>
          </div>

          {
            //if bangles then user have to choose bangle size
            productData.productCategory === 'bangle' && (
              <div className="productNeedInfoBoxView">
                <div className="productNeedInfoBoxViewInput">
                  <div className="productNeedInfoBoxViewInputHeader">
                    <div className="productNeedInfoBoxViewInputHeaderIcon">
                      <img src="./assets/icons/quantityIcon.png" alt="" />
                    </div>
                    Bangle Size :
                  </div>
                  <select onChange={(e) => setBangleSize(e.target.value)} name="" className='form-control' style={{ fontFamily: "Poppins" }} id="">
                    <option value="">--Select Bangle Size--</option>
                    <option value="2.2">2.2</option>
                    <option value="2.4">2.4</option>
                    <option value="2.6">2.6</option>
                    <option value="2.8">2.8</option>
                    <option value="2.10">2.10</option>
                    <option value="2.12">2.12</option>
                  </select>
                </div>
              </div>
            )
          }

          <div className="productNeedInfoBoxView">
            <div className="productNeedInfoBoxViewInput">
              <div className="productNeedInfoBoxViewInputHeader">
                <div className="productNeedInfoBoxViewInputHeaderIcon">
                  <img src="./assets/icons/quantityIcon.png" alt="" />
                </div>
                Enter Quantity :
              </div>
              <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Enter Quantity' type="number" />
            </div>

            <div className="productNeedInfoBoxViewInput">
              <div className="productNeedInfoBoxViewInputHeader">
                <div className="productNeedInfoBoxViewInputHeaderIcon">
                  <img src="./assets/icons/smsIcon.png" alt="" />
                </div>
                If Any Message ( Optional ) :
              </div>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder='Message for product size, quantity or something else...' type="number" />
            </div>
          </div>

          <div className="productInfoViewContainer">
            <div className="productInfoViewContainerHeader">
              <div className="productInfoViewContainerHeaderTitle">Product Info</div>
            </div>
            <div className="productInfoViewContainerMain">
              <div className="pivcmP">
                <div className="pivcmInfo">
                  Per Product Price :
                </div>
                <div className="pivcmPrice">
                  {productData.productPrice || '-'} Tk.
                </div>
              </div>

              <div className="pivcmP">
                <div className="pivcmInfo">
                  Product Quantity :
                </div>
                <div className="pivcmPrice">
                  {quantity || '-'}
                </div>
              </div>

              <div className="pivcmP">
                <div className="pivcmInfo">
                  Product Price :
                </div>
                <div className="pivcmPrice">
                  {productMainPrice || '-'} Tk.
                </div>
              </div>

              <div className="pivcmP">
                <div className="pivcmInfo">
                  Delivery Charge :
                </div>
                <div className="pivcmPrice">
                  {deliveryCharge} Tk.
                </div>
              </div>

              <div className="pivcmP">
                <div className="pivcmInfo">
                  Total Price :
                </div>
                <div className="pivcmPrice" style={{ color: "green", fontWeight: "bold" }}>
                  {totalPrice} Tk.
                </div>
              </div>
              <p className='deliveryChargeNote'>( Delivery charge inside Dhaka is 80 TK, and outside Dhaka is 150 TK. )</p>
            </div>
          </div>
          <p className='pVStatusTxtMain' style={{ color: getProductStatus === 'comingSoon' ? "rgb(255, 102, 0)" : getProductStatus === 'outOfStock' ? "red" : "" }}>
            {
              getProductStatus === 'comingSoon' ? "Coming Soon!" : getProductStatus === 'outOfStock' ? "Out of Stock" : ""
            }
          </p>
          {
            /*if product is unavailable then hide the btn div*/
            getProductStatus === 'inStock' && (
              <div className="productViewBtnsDiv">
                <button style={{ backgroundColor: "black", color: "white" }} onClick={postOrder}>
                  <div className="pvbdBtnIcon">
                    <img src="./assets/icons/buyIcon.png" alt="" />
                  </div>
                  Buy Now!
                </button>
                <button style={{ border: "1px solid black", backgroundColor: "white" }} onClick={addToCart}>
                  <div className="pvbdBtnIcon">
                    <img src="./assets/icons/addCartIcon.png" alt="" />
                  </div>
                  Add To Cart
                </button>
              </div>
            )
          }
        </div>
        //main content box ends here
      }
      {
        //product purchase loader open div
        orderSubmissionLoader &&
        <div className="purchaseLoaderDivBG">
          <div className="purchaseLoaderDiv">
            <div className="pLoaderBox">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <div className="pContextLoader">
              <p>Purchasing your order...</p>
              <p style={{ fontSize: "13px" }}>( Please wait while we complete the process )</p>
            </div>
          </div>
        </div>
        //product purchase loader close div
      }

      {
        //product add to cart loader open div
        cartSubmissionLoader &&
        <div className="purchaseLoaderDivBG">
          <div className="purchaseLoaderDiv">
            <div className="pLoaderBox">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <div className="pContextLoader">
              <p>Adding To Cart...</p>
              <p style={{ fontSize: "13px" }}>( Please wait while we complete the process )</p>
            </div>
          </div>
        </div>
        //product add to cart loader close div
      }
      {/*image show overlay starts here*/}
      {
        subImageDiv && (
          <div className="productDetailsImageBG">
            <div className="productDetailsImageDiv">
              <div className="productDetailsImageDivHeader">
                <div className="productDetailsImageDivHeaderIcon" onClick={() => setSubImageDiv(false)}>
                  <img src="./assets/icons/declineIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                </div>
              </div>
              <div className="productDetailsImageMainBox">
                <img src={subSingleImage} alt="" />
              </div>
            </div>
          </div>
        )
      }
      {/*image show overlay ends here*/}
      <NavigationBar />

    </>
  )
}
