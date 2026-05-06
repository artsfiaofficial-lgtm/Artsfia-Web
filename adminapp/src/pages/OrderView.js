import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import OrderCard from '../components/OrderCard'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OrderView() {
  const [orderList, setOrderList] = useState([])
  const [waitingLoader, setWaitingLoader] = useState(true)
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
  async function fetchOrderList() {
    const token = await getAuthToken()
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order`, {
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
      setWaitingLoader(false)
      if (fetchedData.length <= 0) {
        setNoOrderText(true)
      }
      const orginalList = fetchedData
      const reversedList = orginalList.reverse()
      setOrderList(reversedList)
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      setWaitingLoader(false)
      return
    }
  }
  useEffect(() => {
    fetchOrderList()
  }, [])








  return (
    <div>
      <Navbar />
      <div className="container ovContainer">
        <p className='ovTitle'>Order Review</p>
        <hr style={{ margin: 0 }} />
        <div className="ovRenderBox">
          {
            noOrderText && <p className='noeTitle'>No Order Exists</p>
          }
          {waitingLoader &&
            /*Loader div starts here*/
            <div className="loaderDivCM">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            /*Loader div ends here*/
          }
          {
            orderList.map((data, index) => (
              <OrderCard
                key={index}
                title={data.productTitle}
                bangleSize={data.bangleSize}
                category={data.productCategory}
                deliveryCharge={data.deliveryCharge}
                price={data.productPerPrice}
                totalPrice={data.totalPrice}
                name={data.name}
                address={data.address}
                message={data.message}
                division={data.division}
                quantity={data.productQuantity}
                phoneNumber={data.phoneNumber}
                idKey={data._id}
                date={data.date}
                imageUrl={data.productFrontImageLink}
                refreshFunction={fetchOrderList}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
