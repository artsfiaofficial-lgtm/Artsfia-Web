import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
export default function ProductCard({ productTitle, productId, category, imageLink, price, mrp, status, idKey, refreshProductFunction }) {
  const [editDiv, setEditDiv] = useState(false)
  const [editProductTitle, setEditProductTitle] = useState('')
  const [editMrp, setEditMrp] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [editProductStatus, setEditProductStatus] = useState('')
  const [editWaitingTxt, setEditWaitingTxt] = useState(false)
  const [editableProductType, setEditableProductType] = useState([])







  //at first setEditField data which we got from props
  useEffect(() => {
    setEditProductTitle(productTitle)
    setEditMrp(mrp)
    setEditPrice(price)
    setEditProductStatus(status)
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






  //to get product type
  async function getProductType() {
    const token = await getAuthToken()
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/product/read/${productId}`
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if(res.ok){
      const data = await res.json()
      const productType = data.productType 
      setEditableProductType(productType)
    }
    else{
      Swal.fire("Failed!","Please try again","error")
      return
    }
  }
  useEffect(()=>{
    getProductType()
  },[])






  //handle editable productType function
  function editableProductTypeFunction(e){
    const value = e.target.value
    if (e.target.checked) {
    setEditableProductType([...editableProductType, value])
  } else {
    setEditableProductType(
      editableProductType.filter(item => item !== value)
    )
  } 
  }






  //delete program
  async function deleteProduct() {
    //confimation popup show
    Swal.fire({
      title: "Are you sure?",
      text: "Want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = await getAuthToken()
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/delete/${productId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        if (res.ok) {
          Swal.fire("Product Deleted", "Product has been deleted successfully", "success")
          refreshProductFunction()
        }
        else {
          Swal.fire("Failed!", "Failed to delete product", "error")
          return
        }
      }
    })
  }






  //edit btn function
  //edit function
  async function editProduct() {
    //confimation popup show
    Swal.fire({
      title: "Are you sure?",
      text: "Want to update this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setEditWaitingTxt(true)
        const productInfoObj = {
          productTitle: editProductTitle,
          productMrpPrice: editMrp,
          productPrice: editPrice,
          productStatus: editProductStatus,
          productType : editableProductType
        }
        //get auth token
        const token = await getAuthToken()
        console.log(token)
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/update/${productId}`, {
          method: "PUT",
          headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(productInfoObj)
        })
        if (res.ok) {
          Swal.fire("Product Updated", "Product information has been updated", "success")
          setEditDiv(false)
          setEditWaitingTxt(false)
          refreshProductFunction()
        }
        else {
          Swal.fire("Failed!", "Failed to update data", "error")
          setEditWaitingTxt(false)
          return
        }
      }
    })
  }






  return (
    <div className='pCardBody'>
      <div className="pCardImageBox">
        <img src={imageLink} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div className="pCardDetails">
        <p className='productCardMainTitleP'>{productTitle}</p>
        <p className='productCardCategoryP'>Category : {category.at(0).toUpperCase() + category.slice(1)}</p>
        <p className='productMrpPriceP'><del>MRP. Price : {mrp} BDT</del></p>
        <p className='productCardPriceP'>Price : {price} BDT</p>
      </div>
      <div className="pCardBtns">
        <div className='pCardStatusBox'>
          <div className="pCardStatusIndicator" style={{ backgroundColor: status === 'comingSoon' ? "rgb(255, 115, 0)" : status === 'inStock' ? "green" : "red" }}></div>
          {status === 'comingSoon' ? "Coming Soon" : status === 'inStock' ? "In Stock" : "Out Of Stock"}
        </div>
        <div className="pCardBtnBox">
          <button className='pCardBtnEP' onClick={() => setEditDiv(true)}>
            <div className="pCardBtnIconBox">
              <img src="./assets/icons/editIcon.png" alt="" />
            </div>
            Edit Product
          </button>
          <button className='pCardBtnDL' onClick={deleteProduct}>
            <div className="pCardBtnIconBox">
              <img src="./assets/icons/deleteIconBlack.png" alt="" />
            </div>
            Delete Product
          </button>
        </div>
      </div>


      {
        /*Edit div open here*/
        editDiv &&
        <div className="productCardEditDivBG">
          <div className="productCardEditDiv">
            <div className="productCardEditDivHeader">
              <div className="productCardEditDivHeaderIcon" onClick={() => setEditDiv(false)}>
                <img src="./assets/icons/closeIconRed.png" alt="" />
              </div>
            </div>
            <div className="pCardEditInputFields">

              <div className="pCardEditInputBox">
                <div className="pCardEditInputBoxHeader">
                  <div className="pCardEditInputBoxHeaderIcon">
                    <img src="./assets/icons/labelIcon.png" alt="" />
                  </div>
                  Product Title :
                </div>
                <textarea onChange={(e) => setEditProductTitle(e.target.value)} value={editProductTitle} name="" className='form-control' rows={5} style={{ fontFamily: "Poppins" }} placeholder='Product Title' id=""></textarea>
              </div>

              <div className="pCardEditInputBox">
                <div className="pCardEditInputBoxHeader">
                  <div className="pCardEditInputBoxHeaderIcon">
                    <img src="./assets/icons/moneyIcon.png" alt="" />
                  </div>
                  MRP Price :
                </div>
                <input onChange={(e) => setEditMrp(e.target.value)} value={editMrp} style={{ fontFamily: "Poppins" }} type="number" className='form-control' placeholder='MRP Price' />
              </div>

              <div className="pCardEditInputBox">
                <div className="pCardEditInputBoxHeader">
                  <div className="pCardEditInputBoxHeaderIcon">
                    <img src="./assets/icons/moneyIcon.png" alt="" />
                  </div>
                  Product Price :
                </div>
                <input onChange={(e) => setEditPrice(e.target.value)} value={editPrice} style={{ fontFamily: "Poppins" }} type="number" className='form-control' placeholder='Product Price' />
              </div>

              <div className="inputFieldDivAP">
                <div className="inputFieldDivAPHeader">
                  <div className="inputFieldDivAPHeaderIcon">
                    <img src="./assets/icons/typeIcon.png" alt="" />
                  </div>
                  Product Type ( Presence ) :
                </div>

                <div class="form-check" style={{ fontFamily: "Poppins" }}>
                  <input onChange={editableProductTypeFunction} checked={editableProductType.includes('under500')} class="form-check-input" type="checkbox" value="under500" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Under 500
                  </label>
                </div>

                <div class="form-check" style={{ fontFamily: "Poppins" }}>
                  <input onChange={editableProductTypeFunction} checked={editableProductType.includes('newArrivals')}  class="form-check-input" type="checkbox" value="newArrivals" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckChecked">
                    New Arrivals
                  </label>
                </div>

                <div class="form-check" style={{ fontFamily: "Poppins" }}>
                  <input onChange={editableProductTypeFunction} checked={editableProductType.includes('topSelling')}  class="form-check-input" type="checkbox" value="topSelling" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckChecked">
                    Top Selling
                  </label>
                </div>

                <div class="form-check" style={{ fontFamily: "Poppins" }}>
                  <input onChange={editableProductTypeFunction} checked={editableProductType.includes('trending')}  class="form-check-input" type="checkbox" value="trending" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckChecked">
                    Trending
                  </label>
                </div>

              </div>

              <div className="pCardEditInputBox">
                <div className="pCardEditInputBoxHeader">
                  <div className="pCardEditInputBoxHeaderIcon">
                    <img src="./assets/icons/statusIcon.png" alt="" />
                  </div>
                  Product Status :
                </div>
                <select value={editProductStatus} onChange={(e) => setEditProductStatus(e.target.value)} name="" id="" className='form-control' style={{ fontFamily: "Poppins" }}>
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out Of Stock</option>
                  <option value="comingSoon">Coming Soon</option>
                </select>
              </div>

              <button className='pCardEditRawBtn' onClick={editProduct}>
                <div className="pCardEditRawBtnIcon">
                  <img src="./assets/icons/editIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                </div>
                {editWaitingTxt ? "Editing..." : "Edit Product"}
              </button>

            </div>
          </div>
        </div>
        /*Edit div ends here*/
      }
    </div>
  )
}
