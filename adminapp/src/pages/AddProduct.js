import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [productTitle, setProductTitle] = useState('');
  const [productFrontImage, setProductFrontImage] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [productMrpPrice, setProductMrpPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [bangleCategory, setBangleCategory] = useState('');
  const [bangleDesignCategory, setBangleDesignCategory] = useState('')
  const [productType, setProductType] = useState([])
  const [productPrice, setProductPrice] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [babyBangleCategory, setBabyBangleCategory] = useState('')
  const [waitingText, setWaitingText] = useState(false);







  //checkbox value get
  function checkboxGet(e) {
    const value = e.target.value
    const checked = e.target.checked
    if (checked) {
      setProductType([...productType, value]);
      console.log([...productType, value])
    }
    else {
      //remove or empty if product jodi nai thake select kora*
      setProductType(productType.filter(item => item !== value));
    }
  }







  //if admin not logged in then refer admin to login page
  //navigate init
  const navigate = useNavigate()
  useEffect(() => {
    const adminPermit = localStorage.getItem("artsfiaControlLogin")
    if (!adminPermit || adminPermit !== 'true') {
      navigate('/login')
    }
  }, [])







  // my reset object
  const resetForm = () => {
    setProductTitle('');
    setProductFrontImage(null);
    setProductImages(null);
    setProductMrpPrice('');
    setProductPrice('');
    setBabyBangleCategory('')
    setBangleDesignCategory('')
    setProductCategory('');
    setBangleCategory('');
    setProductStatus('');
    setProductType([])
  };







  //my image compress function
  function compressImage(file, quality = 0.7, maxWidth = 1000) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = e => {
        img.src = e.target.result;
      };
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        // resize
        if (width > maxWidth) {
          height = height * (maxWidth / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        // compress
        const base64 = canvas.toDataURL("image/jpeg", quality);
        resolve(base64);
      };

      reader.onerror = error => reject(error);
    });
  }







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








  //submit func
  async function submitProduct() {
    if (!productTitle.trim() || !productFrontImage || !productImages || !productCategory || !productMrpPrice || !productPrice || !productStatus) {
      Swal.fire("Info!", "Please fill all the required fields", "info");
      return;
    }


    //if bangle category is not filled
    if (productCategory === 'bangle') {
      if (bangleCategory === '' || !bangleCategory || !bangleDesignCategory) {
        Swal.fire("Info!", "You have to fill the bangle category field", "info")
        return
      }
    }
    //if baby bangle category is not filled
    if(productCategory === 'babyBangle'){
      if(!babyBangleCategory){
        Swal.fire("Info!", "You have to fill the bangle category field", "info")
        return
      }
    }

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Want to add this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it"
    });

    if (confirmation.isConfirmed) {
      setWaitingText(true);
      try {

        const token = await getAuthToken();

        const compressedFrontImg = await compressImage(productFrontImage)
        const compressedMultipleImg = await Promise.all(
          Array.from(productImages).map(item =>
            compressImage(item)
          )
        )

        const productInfoObj = {
          productTitle,
          productCategory,
          productFrontImageLink: compressedFrontImg,
          productImageLinks: compressedMultipleImg,
          productMrpPrice,
          productPrice,
          productStatus,
          bangleCategory,
          bangleDesignCategory,
          babyBangleCategory,
          productType
        };

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/new`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(productInfoObj)
        });
        if (res.ok) {
          Swal.fire("Success", "Product added successfully!", "success");
          resetForm();
        } else {
          throw new Error("Sorry!", "Please try again", "error");
        }
      } catch (error) {
        Swal.fire("Error!", error.message || "Something went wrong", "error");
      } finally {
        setWaitingText(false);
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container addProductContainer">
        <p className='unpTitle'>Upload new product</p>
        <hr style={{ margin: "0" }} />
        <div className="addProductBoxPanel">

          <div className="inputFieldDivAP">
            <div className="inputFieldDivAPHeader">
              <div className="inputFieldDivAPHeaderIcon">
                <img src="./assets/icons/productIcon.png" alt="" />
              </div>
              Enter Product Title :
            </div>
            <input value={productTitle} onChange={(e) => setProductTitle(e.target.value)} type="text" placeholder='Enter Product Title' className='form-control' style={{ fontFamily: "Poppins" }} />
          </div>

          <div className="inputFieldDivAP">
            <div className="inputFieldDivAPHeader">
              <div className="inputFieldDivAPHeaderIcon">
                <img src="./assets/icons/imageIcon.png" alt="" />
              </div>
              Product Front Image :
            </div>
            <input type="file" onChange={(e) => setProductFrontImage(e.target.files[0])} accept='image/*' className='form-control' style={{ fontFamily: "Poppins" }} />
          </div>

          <div className="inputFieldDivAP">
            <div className="inputFieldDivAPHeader">
              <div className="inputFieldDivAPHeaderIcon">
                <img src="./assets/icons/imageIcon.png" alt="" />
              </div>
              Product Images <span style={{ fontSize: "12px" }}>(max 4)</span> :
            </div>
            <input multiple accept='image/*' onChange={(e) => setProductImages(e.target.files)} type="file" className='form-control' style={{ fontFamily: "Poppins" }} />
          </div>

          <div className="inputFieldDivAP">
            <div className="inputFieldDivAPHeader">
              <div className="inputFieldDivAPHeaderIcon">
                <img src="./assets/icons/categoryIcon.png" alt="" />
              </div>
              Product Category :
            </div>
            <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='form-control' style={{ fontFamily: "Poppins" }}>
              <option value="">--Select Product Category--</option>
              <option value="bangle">BANGLE</option>
              <option value="babyBangle">BABY BANGLE</option>
              <option value="officeWear">OFFICE WEAR</option>
              <option value="partyWear">PARTY WEAR</option>
              <option value="bridalWear">BRIDAL WEAR</option>
              <option value="festiveWear">FESTIVE WEAR</option>
              <option value="eventWear">EVENT WEAR</option>
              <option value="earing">EARING</option>
              <option value="neckpiece">NECKPIECE</option>
              <option value="fingerRing">FINGER RING</option>
              <option value="combo">COMBO</option>
              <option value="eid2026">EID 2026</option>
            </select>
          </div>

          {productCategory === 'bangle' && (
            <div>
            <div className="inputFieldDivAP">
              <div className="inputFieldDivAPHeader">
                <div className="inputFieldDivAPHeaderIcon">
                  <img src="./assets/icons/bangleCategoryIcon.png" alt="" />
                </div>
                Bangle Category  :
              </div>
              <select value={bangleCategory} onChange={(e) => setBangleCategory(e.target.value)} className='form-control' style={{ fontFamily: "Poppins" }}>
                <option value="">--Select Bangle Category--</option>
                <option value="affordable">Affordable</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div className="inputFieldDivAP">
              <div className="inputFieldDivAPHeader">
                <div className="inputFieldDivAPHeaderIcon">
                  <img src="./assets/icons/bangleDesignCat.png" alt="" />
                </div>
                Bangle Design Category :
              </div>
              <select value={bangleDesignCategory} onChange={(e) => setBangleDesignCategory(e.target.value)} className='form-control' style={{ fontFamily: "Poppins" }}>
                <option value="">--Select Bangle Design Category--</option>
                <option value="any">Any</option>
                <option value="fabric">Fabric</option>
                <option value="thread">Thread</option>
                <option value="square">Square</option>
                <option value="shell">Shell</option>
              </select>
            </div>
            </div>
          )}
          

          {productCategory === 'babyBangle' && (
            <div className="inputFieldDivAP">
              <div className="inputFieldDivAPHeader">
                <div className="inputFieldDivAPHeaderIcon">
                  <img src="./assets/icons/babyBangleCat.png" alt="" />
                </div>
                Baby Bangle Category :
              </div>
              <select value={babyBangleCategory} onChange={(e) => setBabyBangleCategory(e.target.value)} className='form-control' style={{ fontFamily: "Poppins" }}>
                <option value="">--Select Baby Bangle Category--</option>
                <option value="any">Any</option>
                <option value="5-3">5M - 3Y Baby</option>
                <option value="3-7">3Y - 7Y Baby</option>
                <option value="7-12">7Y - 12Y Baby</option>
              </select>
            </div>
          )}


          <div className="inputFieldDivAP">
            <div className="inputFieldDivAPHeader">
              <div className="inputFieldDivAPHeaderIcon">
                <img src="./assets/icons/moneyIcon.png" alt="" />
              </div>
              MRP Price (BDT) :
            </div>
            <input value={productMrpPrice} onChange={(e) => setProductMrpPrice(e.target.value)} type="number" placeholder='Enter MRP Price' className='form-control' style={{ fontFamily: "Poppins" }} />
          </div>

          <div className="inputFieldDivAP">
            <div className="inputFieldDivAPHeader">
              <div className="inputFieldDivAPHeaderIcon">
                <img src="./assets/icons/typeIcon.png" alt="" />
              </div>
              Product Type ( Presence ) :
            </div>

            <div class="form-check" style={{fontFamily:"Poppins"}}>
              <input onChange={checkboxGet}  class="form-check-input" type="checkbox" value="under500" id="flexCheckDefault" />
              <label class="form-check-label" for="flexCheckDefault">
                Under 500
              </label>
            </div>

            <div class="form-check" style={{fontFamily:"Poppins"}}>
              <input onChange={checkboxGet}  class="form-check-input" type="checkbox" value="newArrivals" id="flexCheckDefault" />
              <label class="form-check-label" for="flexCheckChecked">
                New Arrivals
              </label>
            </div>

            <div class="form-check" style={{fontFamily:"Poppins"}}>
              <input onChange={checkboxGet}  class="form-check-input" type="checkbox" value="topSelling" id="flexCheckDefault" />
              <label class="form-check-label" for="flexCheckChecked">
                Top Selling
              </label>
            </div>

            <div class="form-check" style={{fontFamily:"Poppins"}}>
              <input onChange={checkboxGet}  class="form-check-input" type="checkbox" value="trending" id="flexCheckDefault" />
              <label class="form-check-label" for="flexCheckChecked">
                Trending
              </label>
            </div>

          </div>

          <div className="inputFieldDivAP">
            <div className="inputFieldDivAPHeader">
              <div className="inputFieldDivAPHeaderIcon">
                <img src="./assets/icons/moneyIcon.png" alt="" />
              </div>
              Product Price (BDT) :
            </div>
            <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type="number" className='form-control' placeholder='Enter Price' style={{ fontFamily: "Poppins" }} />
          </div>

          <div className="inputFieldDivAP">
            <div className="inputFieldDivAPHeader">
              <div className="inputFieldDivAPHeaderIcon">
                <img src="./assets/icons/statusIcon.png" alt="" />
              </div>
              Product Status :
            </div>
            <select value={productStatus} onChange={(e) => setProductStatus(e.target.value)} className='form-control' style={{ fontFamily: "Poppins" }}>
              <option value="">--Select Status--</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out Of Stock</option>
              <option value="comingSoon">Coming Soon</option>
            </select>
          </div>

          <button onClick={submitProduct} disabled={waitingText} className='anpNewBtn'>
            <div className="anpNewBtnIcon">
              {waitingText ? (
                <div className="spinner-border text-light" style={{ width: "1.50rem", height: "1.50rem" }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <img src="./assets/icons/addIcon.png" alt="" />
              )}
            </div>
            {waitingText ? "Adding..." : "Add new product"}
          </button>

        </div>
      </div>
    </div>
  );
}