import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function ProductCard({ productId, title, mrp, bdt, status, imgUrlFront, refreshWishlist, idKey, isWishlist, wishlist }) {
  //navigator init
  const navigate = useNavigate()








  //get user function
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
      //return wishlist
      return data.wishlist
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      return
    }
  }







  //get product data function
  async function getProductData() {
    //get token
    const token = await getAuthToken()
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/read/${productId}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if (res.ok) {
     
      const data = await res.json()
      return data;
    }
    else {
      Swal.fire("Oops!", "Failed to fetch product card data", "error")
      return
    }
  }





  //get all products function
  async function getProductList() {
    //get token
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
      return data;
    }
    else {
      Swal.fire("Oops!", "Failed to fetch product card data", "error")
      return
    }
  }







  // post wishlist function
  async function postWishlist() {
    //if user not logged in then show user a popup
    const userId = localStorage.getItem("artsfiaUserID")
    if (!userId || userId.trim() === '') {
      Swal.fire("Info!", "Please log in to add products to your wishlist", "info")
      return
    }
    //if user id exist then
    const localUserId = localStorage.getItem("artsfiaUserID")
    const token = await getAuthToken()
    //get product info
    const productData = await getProductData()
    //get user wishlist prev
    const prevWishlist = await fetchUserWishlist() || []
    const productDataObj = {
      productTitle: productData?.productTitle || '-',
      productCategory: productData?.productCategory || '-',
      productFrontImageLink: productData?.productFrontImageLink || '-',
      productStatus: productData?.productStatus || '-',
      productIdKey: idKey,
      productMrp: productData.productMrpPrice || '-',
      productId : productId,
      perProductPrice: productData?.productPrice
    }
    const newWishlistArray = [...prevWishlist, productDataObj]
    //post item to user wishlist
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/update/${localUserId}`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        wishlist: newWishlistArray
      })
    })
    if (res.ok) {
      return
    }
    else {
      return
    }
  }






  //view product function
  async function viewProduct() {
    if (isWishlist) {
      const productData = await getProductList()
      const fetchedProducts = []
      for (let i in productData) {
        fetchedProducts.push({ ...productData[i] })
      }
      const findProductIsExist = fetchedProducts.find((e) => e.productTitle === title)
      if (!findProductIsExist) {
        Swal.fire("Product Unavailable", "Sorry, this product isn't available", "info")
        return
      }
    }
    navigate(`/view`, {
      state: {
        productId: productId,
        productPrice: bdt,
        productStatus: status
      }
    })
  }







  //wishlist remove item function
  //remove cart item function
  async function removeItemWishlist() {
    Swal.fire({
      title: "Remove Item?",
      text: "Do you want to remove this product from wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalArray = wishlist
        const findIdKey = wishlist.find((e) => e.productIdKey === idKey)
        const indexOfRemoveItem = wishlist.indexOf(findIdKey)
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
              wishlist: originalArray
            })
          }
        )
        if (res.ok) {
          Swal.fire(
            "Item Removed", "Item has been removed from the wishlist items", "success")
          refreshWishlist()
        }
        else {
          Swal.fire("Oops!", "Failed to remove item from wishlist", "error")
          return
        }
      }
    })
  }







  return (
    <div className='product-card-body'>
      <div className="product-card-image-div">
        <img src={imgUrlFront} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
      </div>
      <div className="product-card-info">
        <p className='product-card-product-name'>{title || '-'}</p>
        <p className='cartMrpTaka'><del>MRP. {mrp || '-'}.00</del></p>
        <p className='cartBdtTaka'>BDT : {bdt || '-'}.00</p>
        <div>
          <p className='productStatusShowRawText' style={{ backgroundColor: status === 'inStock' ? "green" : status === 'outOfStock' ? "red" : "rgb(255, 115, 0)" }}>
            {status === 'inStock' ? "In Stock" : status === 'outOfStock' ? "Out Of Stock" : "Coming Soon"}
          </p>
        </div>
        {
          isWishlist ? "" :
            <div className="wishListIconCartDiv" onClick={postWishlist}>
              <img src="./assets/icons/adafds.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
            </div>
        }
      </div>
      <button className='productViewBtn' onClick={viewProduct}>
        <div className="productViewBtnIcon">
          <img src="./assets/icons/eyeIcon.png" alt="" />
        </div>
        View Product
      </button>
      {/*if it's using in a wishlist box add a delete wishlist item btn*/}
      {
        isWishlist &&
        <button className='productDeleteBtnX' onClick={removeItemWishlist}>
          <div className="productViewBtnIcon">
            <img src="./assets/icons/deleteCrimsonIcon.png" alt="" />
          </div>
          Remove Item
        </button>
      }
      {/*if it's using in a wishlist box add a delete wishlist item btn*/}
    </div>
  )
}
