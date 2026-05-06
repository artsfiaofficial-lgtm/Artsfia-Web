import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function ProductView() {
  const [productDataList, setProductDataList] = useState([])
  const [waitingLoader, setWaitingLoader] = useState(true)
  const [allProductItems, setAllProductItems] = useState([])
  const [noOrderText, setNoOrderText] = useState(false)




  //if admin not logged in then refer admin to login page
  //navigate init
  const navigate = useNavigate()
  useEffect(() => {
    const adminPermit = localStorage.getItem("artsfiaControlLogin")
    if (!adminPermit || adminPermit !== 'true') {
      navigate('/login')
    }
  }, [])




  //auth materials
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
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product`, {
      method: "GET",
      headers: {
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
      console.log(fetchedData)
      if (fetchedData.length <= 0) {
        setNoOrderText(true)
      }
      setWaitingLoader(false)
      const productDataReverse = fetchedData.reverse()
      setProductDataList(productDataReverse)
      setAllProductItems(fetchedData)
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      setWaitingLoader(false)
      return
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [])







  //product show according to select box function
  function showProductSelect(e) {
    if (e === 'saree') {
      const saree_items = allProductItems.filter((e) => e.productCategory === 'saree')
      setProductDataList(saree_items)
    }
    else if (e === 'bangle') {
      const bangle_items = allProductItems.filter((e) => e.productCategory === 'bangle')
      setProductDataList(bangle_items)
    }
    else {
      setProductDataList(allProductItems)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="container pvContainer">
        <p className='pvTitle'>Product Review</p>
        <hr style={{ margin: 0 }} />
        <div>
          <select name="" onChange={(e) => showProductSelect(e.target.value)} className='form-control pvSelectBox' id="">
            <option value="all">All Products</option>
            <option value="bangle">Bangle</option>
            <option value="saree">Saree</option>
          </select>
        </div>
        <div className="pvRenderBox">
          {
            noOrderText && <p className='npeTitle'>No Product Exists</p>
          }
          {productDataList.map((data, index) => (
            <ProductCard  productId={data._id} category={data.productCategory} refreshProductFunction={fetchProductData} productTitle={data.productTitle} imageLink={data.productFrontImageLink} mrp={data.productMrpPrice} price={data.productPrice} status={data.productStatus} idKey={data.idKey} key={index} />
          ))}
        </div>
      </div>
      {waitingLoader &&
        /*Loader div starts here*/
        <div className="loaderDivCM">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        /*Loader div ends here*/
      }
    </div>
  )
}
