import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import NavigationBar from '../components/NavigationBar'
import { useNavigate } from 'react-router-dom'
export default function AuthHome() {
  const [isAsideOpen, setIsAsideOpen] = useState(false)
  //get is aside open function use as getting prop from navbar
  function isAsideOpenShow(data) {
    setIsAsideOpen(data)
  }
  //pass aside close prop to navbar component
  function setAsideOppositeFunction() {
    setIsAsideOpen(!isAsideOpen)
  }
  //navigate 
  const navigate = useNavigate()
  //aside style 
  const styles = {
    isAsideOpenStyle: {
      transform: "translateX(0)",
      transition: "1s"
    },
    isAsideCloseStyle: {
      transform: "translateX(-100%)",
      transition: "1s"
    }
  }


  return (
    <>
      <Navbar isAside={isAsideOpenShow} isMyAsideOpen={isAsideOpen} />
      {
        //aside bar starts
        <div className="asideBar" style={isAsideOpen ? styles.isAsideOpenStyle : styles.isAsideCloseStyle} >
          <div className="asideHeader">
            <div className="asideHeaderLogoBox">
              <img src="./assets/logo/logo.png" alt="" />
            </div>
            <div className="asideHeaderCloseIconBox" onClick={() => setAsideOppositeFunction(false)}>
              <img src="./assets/icons/closeIcon.png" alt="" />
            </div>
          </div>
          <div className="asideBarOptionsBox">
            <div className="optionBox">
              <div className="optionBoxIcon">
                <img src="./assets/icons/profileIcon.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">
                User Profile
              </div>
            </div>
            <div className="optionBox">
              <div className="optionBoxIcon">
                <img src="./assets/icons/cartIcon.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">
                Cart
              </div>
            </div>
            <div className="optionBox">
              <div className="optionBoxIcon">
                <img src="./assets/icons/searchIconBold.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">
                Search
              </div>
            </div>
            <div className="optionBox">
              <div className="optionBoxIcon">
                <img src="./assets/icons/wishListIcon.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">
                Wishlist
              </div>
            </div>

          </div>
        </div>
        //aside bar ends
      }
      {
        //main content box start from here
        <div className="mainContentBox">
          <div className="authBoxContainer">
            <p className='authWelcomeNote'>Welcome To Artsfia</p>
            <p className="authNoteMain">
              To make any transaction, you must create an account with ARTSFIA.
              We store your information.
              This also saves your time by eliminating the
              need to enter your details repeatedly for every purchase.
              Please log in to proceed or If you’re new here, select 'Create New Account.
            </p>
            <div className="authActionBtnBox">
              <button onClick={() => navigate('/login')}>
                <div className="authBtnIconDiv">
                  <img src="./assets/icons/loginBtnIcon.png" alt="" />
                </div>
                Continue with Log in
              </button>
              <button style={{ backgroundColor: "rgb(255, 0, 128)", color: "white" }} onClick={() => navigate('/signup')}>
                <div className="authBtnIconDiv">
                  <img src="./assets/icons/addUserWhiteIcon.png" alt="" />
                </div>
                Create new Account
              </button>
            </div>
          </div>
        </div>
        //main content box ends here
      }
      <NavigationBar />
    </>
  )
}

