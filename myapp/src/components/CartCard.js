import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
export default function CartCard({ productId, refreshCartFunction, originalList, message, subImages, img, deliveryCharge, bangleSize, productPerPrice, title, price, quantity, category, productStatus = '-', idKey = '-' }) {
  const [productRecentStatus, setProductRecentStatus] = useState('')
  const [userInfo, setUserInfo] = useState({})
  const [productInfo, setProductInfo] = useState({})
  //navigator init
  const navigate = useNavigate()







  //auth material
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
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/product/read/${productId}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    )
    if (res.ok) {
      const data = await res.json()
      if (data) {
        console.log(data)
        setProductInfo(data)
        setProductRecentStatus(data.productStatus)
      }
    } else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [])







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
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      return
    }
  }
  useEffect(() => {
    fetchUserData()
  }, [])










  //fetch prpduct data function ( submit order or buy now function )
  async function postOrder() {
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
            address: userInfo?.address || '-',
            phoneNumber: userInfo?.phoneNumber || '-',
            email: userInfo?.email || '-',
            productTitle: title || '-',
            productQuantity: quantity || '-',
            productIdKey: idKey,
            date: new Date().toDateString(),
            productCategory: category || '-',
            productFrontImageLink: img || '-',
            productStatus: productRecentStatus || '-',
            deliveryCharge: deliveryCharge || '-',
            totalPrice: price || '-',
            productPerPrice: productPerPrice || '-',
            productSubPhotos: subImages || [],
            bangleSize: bangleSize || '-',
            message: message
          })
        })
        if (res.ok) {
          Swal.fire("Thank you for your purchase!", "Your order has been received successfully", "success")
          //after purchase remove the item from cart
          const originalArray = originalList
          const findIdKey = originalList.find((e) => e.productIdKey === idKey)
          const indexOfRemoveItem = originalList.indexOf(findIdKey)
          originalArray.splice(indexOfRemoveItem, 1)
          const localUserId = localStorage.getItem("artsfiaUserID")
          if (!localUserId) return
          const token = await getAuthToken()
          const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/user/update/${localUserId}`,
            {
              method: "PUT",
              headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                cart: originalArray
              })
            }
          )
          if (res.ok) {
            refreshCartFunction()
          }
          else {
            return
          }
        }
        else {
          Swal.fire("Oops!", "Your order could not be completed", "error")
          return
        }
      }
    })
  }








  //remove cart item function
  async function removeItem() {
    Swal.fire({
      title: "Remove Item?",
      text: "Do you want to remove this product from cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalArray = originalList
        const findIdKey = originalList.find((e) => e.productIdKey === idKey)
        const indexOfRemoveItem = originalList.indexOf(findIdKey)
        originalArray.splice(indexOfRemoveItem, 1)
        const localUserId = localStorage.getItem("artsfiaUserID")
        if (!localUserId) return
        const token = await getAuthToken()
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/update/${localUserId}`,
          {
            method: "PUT",
            headers: {
              'Content-Type': "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              cart: originalArray
            })
          }
        )
        if (res.ok) {
          Swal.fire(
            "Product Removed", "Product has been removed from the cart items", "success")
            refreshCartFunction()
        }
        else {
          Swal.fire("Oops!", "Failed to remove the product", "error")
          return
        }
      }
    })
  }











  return (
    <div className='cartCardBody'>
      <div className="imageAndInfoCartCard">
        <div className="imageCartCardBox">
          <img src={productInfo.productFrontImageLink || ""} alt="" />
        </div>
        <div className="cartInfoCardBox">
          <p className='cartProductTitle'>{title || '-'}</p>
          <p className='cartQuantityTitle'><span style={{ color: "#006bb3" }}>Quantity</span> : {quantity || "-"}</p>
          <p className='productPerPriceCartP'>Per Product Price : {productPerPrice || '-'}</p>
          <p className='productCartDeliveryChargeP'>Delivery Charge : {deliveryCharge || '-'}</p>
          <p className="productTypeCart"><span style={{ color: "#6b00b3" }}>Product Type : </span>{category || '-'}</p>
          {category === 'bangle' && <p className='cartBangleSizeP'>Bangle Size : {bangleSize || '-'}</p>}
          <p className="pSShow">Product Status :
            <span style={{ color: productRecentStatus === 'outOfStock' ? "red" : productRecentStatus === 'comingSoon' ? "rgb(255, 102, 0)" : productRecentStatus === 'inStock' ? "green" : "purple" }}>
              {productRecentStatus === 'outOfStock' ? " Out Of Stock" : productRecentStatus === 'comingSoon' ? " Coming Soon" : productRecentStatus === 'inStock' ? " In Stock" : " Unavailable"}
            </span>
          </p>
          <p className="cartPriceShow">BDT. {price || "-"} Tk</p>
          <p className="cartDCITitle"> ( Delivery Charge Included )</p>
        </div>
      </div>
      <div className="cartCardButtonsDiv">
        <div style={{ display: "flex", gap: "10px" }}>
          {
            productRecentStatus === 'inStock' &&
            <button className="cartBuyBtn" onClick={postOrder}>
              <div className="cartBtnIconBox">
                <img src="./assets/icons/buyIcon.png" alt="" />
              </div>
              Buy!
            </button>
          }
          <button className="cartDeleteBtn" onClick={removeItem}>
            <div className="cartBtnIconBox">
              <img src="./assets/icons/deleteIconBlack.png" alt="" />
            </div>
            Remove
          </button>
        </div>
        {
          productRecentStatus === 'inStock' &&
          <p className='vtpCartCardP' onClick={() => navigate(`/view`, {
            state: {
              productId: productId,
              productPrice: productPerPrice,
              productStatus: productStatus
            }
          })}>View This Product</p>
        }
      </div>
    </div>
  )
}
