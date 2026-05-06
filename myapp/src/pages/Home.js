import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NavigationBar from '../components/NavigationBar'
import Carousel from '../components/Carousel'
import Category from '../components/Category'
import CommentSection from '../components/CommentSection'
import AboutSection from '../components/AboutSection'
import ProductCard from '../components/ProductCard'
import VideoAndTextBox from '../components/VideoAndTextBox'
import Footer from '../components/Footer'
import Trending from '../components/Trending'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import Under500Section from '../components/Under500Section'
import NewArrivals from '../components/NewArrivals'
import TopSelling from '../components/TopSelling'
import Carousel2 from '../components/Carousel2'
import CategoryByOccasion from '../components/CategoryByOccasion'
export default function Home() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [productLoader, setProductLoader] = useState(true)
  const [banglesList, setBanglesList] = useState([])
  const [sareeList, setSareeList] = useState([])
  const [allBangleList, setAllBangleList] = useState([])
  const [noSareeTxt, setNoSareeTxt] = useState(false)
  const [noBangleTxt, setNoBangleTxt] = useState(false)
  const navigate = useNavigate();
  // open aside
  const openAside = () => setIsAsideOpen(true);
  // close aside
  const closeAside = () => setIsAsideOpen(false);
  // navigate and close
  const handleNavigate = (path) => {
    navigate(path);
  };








  //get product auth api materials
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
      setProductLoader(false)


      /*bangles list get*/
      const bangles = fetchedData.filter((e) => e.productCategory === 'bangle')
      if (bangles.length <= 0) {
        setNoBangleTxt(true)
      }
      const bangleArrayReverse = bangles.reverse()
      const bangleSlicedArray = bangleArrayReverse.slice(0, 30)
      setBanglesList(bangleSlicedArray)
      //set all bangles in a list to prevent the setBangleList changing value with select option html tag
      setAllBangleList(bangleSlicedArray)


      /*saree list get*/
      const saree = fetchedData.filter((e) => e.productCategory === 'saree')
      const sareeListReverse = saree.reverse()
      const sareeListSlice = sareeListReverse.slice(0,30)
      if (saree.length <= 0) {
        setNoSareeTxt(true)
      }
      setSareeList(sareeListSlice)
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
      setBanglesList(premiumBangles)
    }
    else if (val === 'affordable') {
      const affordableBangles = allBangleList.filter((e) => e.bangleCategory === 'affordable')
      setBanglesList(affordableBangles)
    }
    else {
      setBanglesList(allBangleList)
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

          {/*Carousel Part Start from here*/}
          <Carousel />
          {/*Carousel Part Ends from here*/}

          {/*Category part starts from here*/}
          <Category />
          {/*Category part ends from here*/}

          {/*Comment section starts from here*/}
          <CommentSection />
          {/*Comment section ends here*/}

          {/*About Products starts from here*/}
          <AboutSection />
          {/*About Products ends here*/}

          {/*under 500 products container started*/}
          <Under500Section />
          {/*under 500 products container ends*/}

          {/*new arrival products container started*/}
          <NewArrivals />
          {/*new arrival products container ends*/}

          {/*top selling products container started*/}
          <TopSelling />
          {/*top selling products container ends*/}

          {/*trending products container started*/}
          <Trending />
          {/*trending products container ends*/}

          {/*carousel 2 products container started*/}
          <Carousel2 />
          {/*carousel 2 products container ends*/}

          {/*Category by occasion container ends*/}
          <CategoryByOccasion />
          {/*Category by occasion container ends*/}

          {
            /*Product show box bangles starts*/
            <div className="productShowCaseDiv">
              <div className="productShowCaseDivHeader">
                <div className="productShowCaseDivHeaderLogo">
                  <div className="productShowCaseDivHeaderLogoImg">
                    <img src="./assets/icons/productIcon.png" alt="" />
                  </div>
                  BANGLES
                </div>
                <div className="productDivSeeAllDiv" onClick={() => navigate(`/products?productType=${btoa('bangle')}`)}>
                  See All
                </div>
              </div>
              <div style={{ width: "200px" }}>
                <select onChange={(e) => bangleCategoryDirect(e.target.value)} name="" className='form-control' style={{ fontFamily: "Poppins" }} id="">
                  <option value="all">All Category</option>
                  <option value="premium">Premium</option>
                  <option value="affordable">Affordable</option>
                </select>
              </div>
              <div className="productContainer">
                {
                  //no item text show starts
                  noBangleTxt &&
                  <p className='niEText'>• No Bangle Products Yet</p>
                  //no item text show ends
                }
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
                  banglesList.map((data, index) => (
                    <ProductCard key={index} productId={data._id} idKey={data.idKey} status={data.productStatus} title={data.productTitle} mrp={data.productMrpPrice} bdt={data.productPrice} imgUrlFront={data.productFrontImageLink} />
                  ))
                }
              </div>
            </div>
            /*Product show box bangles ends*/
          }

          {
            /*Product show box saree starts*/
            <div className="productShowCaseDiv">
              <div className="productShowCaseDivHeader">
                <div className="productShowCaseDivHeaderLogo">
                  <div className="productShowCaseDivHeaderLogoImg">
                    <img src="./assets/icons/productIcon.png" alt="" />
                  </div>
                  SAREE
                </div>
                <div className="productDivSeeAllDiv" onClick={() => navigate(`/products?productType=${btoa('saree')}`)}>
                  See All
                </div>
              </div>
              <div className="productContainer">
                {
                  //no item text show starts
                  noSareeTxt &&
                  <p className='niEText'>• No Saree Products Yet</p>
                  //no item text show ends
                }
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
                  sareeList.map((data, index) => (
                    <ProductCard productId={data._id} key={index} idKey={data.idKey} status={data.productStatus} title={data.productTitle} mrp={data.productMrpPrice} bdt={data.productPrice} imgUrlFront={data.productFrontImageLink} />
                  ))
                }
              </div>
            </div>
            /*Product show box saree ends*/
          }

          {/*video and text animation box part starts from here*/}
          <VideoAndTextBox />
          {/*video and text animation box part starts from here*/}

          {
            /*Footer part starts from here*/
            <Footer />
            /*Footer part ends here*/
          }

        </div>
        //main content box ends here
      }
      <NavigationBar />
    </>
  )
}
