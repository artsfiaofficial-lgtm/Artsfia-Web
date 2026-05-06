import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { data, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
export default function ProductDetails() {
  const [productData, setProductData] = useState({})
  const [subImages, setSubImages] = useState([])
  const [subImageDiv, setSubImageDiv] = useState(false)
  const [subSingleImage, setSubSingleImage] = useState('')
  //location init
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const getProductKey = params.get("productId")
  //init navigator
  const navigate = useNavigate()







  //get data of product
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
      return tokenId.token
    }
    else {
      return
    }
  }






  //fetch prpduct data function
  async function fetchProductData() {
    if (!getProductKey) {
      navigate('/orders')
      return
    }
    const token = await getAuthToken()
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/read/${getProductKey}`,{
      method : "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if (res.ok) {
      const data = await res.json()
      setProductData(data)
      setSubImages(data.productSubPhotos)
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      return
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [])








  //sub image tap show function
  function showSubImage(img){
    setSubImageDiv(true)
    setSubSingleImage(img)
  }
  return (
    <div>
      <Navbar />
      <div className="productDetailsDiv container">
        <p className='productLensTitle'>Product Lens</p>
        <div className="productMainImageDetails">
          <img src={productData.productFrontImageLink} alt="" onClick={()=>showSubImage(productData.productFrontImageLink)} />
        </div>
        <div className="productMainSubImagesBox">
          {
            subImages.map((data, index) => (
              <div className="subphotodiv" key={index} onClick={()=>showSubImage(data)}>
                <img src={data} alt="" />
              </div>
            ))
          }
        </div>
        <div className="productMainDetailsInfoBox">
          <p><u>Product Title :</u> <b>{productData.productTitle || '-'}</b></p>
          <p style={{ color: "rgb(128, 128, 128)" }}><del>MRP : {productData.productMrpPrice || '-'} BDT</del></p>
          <p><u>Price :</u> {productData.productPrice || '-'} BDT</p>
          <p><u>Product Status :</u> {productData.productStatus || '-'}</p>
          <p><u>Product Category :</u> {productData.productCategory || '-'}</p>
        </div>
      </div>
      {/*image show overlay starts here*/}
          {
            subImageDiv && (
               <div className="productDetailsImageBG">
            <div className="productDetailsImageDiv">
              <div className="productDetailsImageDivHeader">
                <div className="productDetailsImageDivHeaderIcon" onClick={()=>setSubImageDiv(false)}>
                  <img src="./assets/icons/declineIcon.png" style={{width:"100%",height:"100%",objectFit:"contain"}} alt="" />
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
    </div>
  )
}
