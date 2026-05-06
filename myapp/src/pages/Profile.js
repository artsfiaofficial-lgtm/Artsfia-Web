import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
export default function Profile() {
  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const [isEditDiv, setIsEditDiv] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [editName, setEditName] = useState('')
  const [editPhoneNumber, setEditPhoneNumber] = useState('')
  const [editDivision, setEditDivision] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editAddress, setEditAddress] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  // open aside
  const openAside = () => setIsAsideOpen(true);
  // close aside
  const closeAside = () => setIsAsideOpen(false);
  // navigate and close
  const handleNavigate = (path) => {
    navigate(path);
  };







  //check is user logged in? if not then naviagte user to auth path
  useEffect(() => {
    const userId = localStorage.getItem("artsfiaUserID")
    if (!userId || userId.trim() === '') {
      navigate("/auth")
      return
    }
  }, [])






  //auth materials
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
      //fill edit fields auto after we got data
      setEditName(data?.name || '-')
      setEditDivision(data?.division || '-')
      setEditAddress(data?.address || '-')
      setEditEmail(data?.email || '-')
      setEditPassword(data?.password || '-')
      setEditPhoneNumber(data?.phoneNumber || '-')
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      return
    }
  }
  useEffect(() => {
    fetchUserData()
  }, [])









  //edit main function
  async function editUserInfo() {
    Swal.fire({
      title: "Edit information?",
      text: "Want to edit my information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Modify Info"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const localUserId = localStorage.getItem("artsfiaUserID")
        if (!localUserId) return
        const token = await getAuthToken()
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/update/${localUserId}`, {
          method: "PUT",
          headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            name: editName,
            phoneNumber: editPhoneNumber.trim(),
            division: editDivision.trim(),
            address: editAddress.trim(),
            email: editEmail.toLowerCase().trim(),
            password: editPassword.toLowerCase().trim(),
          })
        })
        if (res.ok) {
          await fetchUserData()
          Swal.fire("User info Updated", "User information has been updated", "success")
          setIsEditDiv(false)
        }
        else {
          Swal.fire("Failed!", "Failed to update user info", "error")
          return
        }
      }
    })
  }








  //logout function
  function logOutFunction() {
    Swal.fire({
      title: "Ready to Log Out?",
      text: "Are you sure you want to log out from your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log Out"
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('artsfiaUserID')
        navigate('/auth')
      }
    })
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
          <div className="profileTitleBox">
            <div className="profileHeaderIcon">
              <img src="./assets/icons/profileIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
            </div>
            <p className="profileTitle">My Profile</p>
          </div>
          <div className="profileInfoContainerBox">
            <div className="profileInfoInputBox">

              <div className="profileInfoFieldBox">
                <div className="profileInfoFieldHeader">
                  <div className="profileInfoFieldHeaderIconBox">
                    <img src="./assets/icons/user-icon.png" alt="" />
                  </div>
                  Name :
                </div>
                <input value={userInfo.name || '-'} readOnly className='profileInputBoxMain' type="text" placeholder='Name...' />
              </div>

              <div className="profileInfoFieldBox">
                <div className="profileInfoFieldHeader">
                  <div className="profileInfoFieldHeaderIconBox">
                    <img src="./assets/icons/phone-icon.png" alt="" />
                  </div>
                  Phone :
                </div>
                <input value={userInfo.phoneNumber || '-'} readOnly className='profileInputBoxMain' type="text" placeholder='Phone...' />
              </div>

              <div className="profileInfoFieldBox">
                <div className="profileInfoFieldHeader">
                  <div className="profileInfoFieldHeaderIconBox">
                    <img src="./assets/icons/mail-icon.png" alt="" />
                  </div>
                  E-mail :
                </div>
                <input value={userInfo.email || '-'} readOnly className='profileInputBoxMain' type="text" placeholder='E-mail...' />
              </div>

              <div className="profileInfoFieldBox">
                <div className="profileInfoFieldHeader">
                  <div className="profileInfoFieldHeaderIconBox">
                    <img src="./assets/icons/key-icon.png" alt="" />
                  </div>
                  Password :
                </div>
                <input value={userInfo.password || '-'} readOnly className='profileInputBoxMain' type="password" placeholder='Password...' />
              </div>

              <div className="profileInfoFieldBox">
                <div className="profileInfoFieldHeader">
                  <div className="profileInfoFieldHeaderIconBox">
                    <img src="./assets/icons/location-icon.png" alt="" />
                  </div>
                  District :
                </div>
                <input type="text" style={{ fontFamily: "Poppins" }} className='form-control' value={userInfo.division || '-'} readOnly />
              </div>

              <div className="profileInfoFieldBox">
                <div className="profileInfoFieldHeader">
                  <div className="profileInfoFieldHeaderIconBox">
                    <img src="./assets/icons/home-icon.png" alt="" />
                  </div>
                  Address :
                </div>
                <p className="profileHomeAddress">
                  {userInfo.address || '-'}
                </p>
              </div>

            </div>
          </div>
          <div className="profileBoxBtns">
            <button onClick={() => setIsEditDiv(true)} style={{ backgroundColor: "rgb(255, 255, 255)", color: "black", border: "1px solid black" }}>
              <div className="pbIcon">
                <img src="./assets/icons/updateIconWhite.png" alt="" />
              </div>
              Update Info
            </button>
            <button onClick={logOutFunction} style={{ backgroundColor: "rgb(0, 0, 0)" }}>
              <div className="pbIcon">
                <img src="./assets/icons/logoutIcon.png" alt="" />
              </div>
              Logout
            </button>
          </div>

          {
            /*Edit div open*/
            isEditDiv && (
              <div className="profileEditDivBg">
                <div className="profileEditBox">
                  <div className="editBoxHeaderCross">
                    <div className="crossEditProfileImgBox" onClick={() => setIsEditDiv(false)}>
                      <img src="./assets/icons/closeIconRed.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                    </div>
                  </div>

                  <div className="profileInfoFieldBox">
                    <div className="profileInfoFieldHeader">
                      <div className="profileInfoFieldHeaderIconBox">
                        <img src="./assets/icons/user-icon.png" alt="" />
                      </div>
                      Name :
                    </div>
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} style={{ border: "1px solid rgba(0, 0, 0, 0.23)" }} className='profileInputBoxMain' type="text" placeholder='Enter Name' />
                  </div>

                  <div className="profileInfoFieldBox">
                    <div className="profileInfoFieldHeader">
                      <div className="profileInfoFieldHeaderIconBox">
                        <img src="./assets/icons/phone-icon.png" alt="" />
                      </div>
                      Phone :
                    </div>
                    <input value={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)} style={{ border: "1px solid rgba(0, 0, 0, 0.23)" }} className='profileInputBoxMain' type="text" placeholder='Enter Phone Number' />
                  </div>

                  <div className="profileInfoFieldBox">
                    <div className="profileInfoFieldHeader">
                      <div className="profileInfoFieldHeaderIconBox">
                        <img src="./assets/icons/mail-icon.png" alt="" />
                      </div>
                      E-mail :
                    </div>
                    <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} style={{ border: "1px solid rgba(0, 0, 0, 0.23)" }} className='profileInputBoxMain' type="text" placeholder='Enter E-mail' />
                  </div>

                  <div className="profileInfoFieldBox">
                    <div className="profileInfoFieldHeader" style={{ gap: "0px", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <div className="profileInfoFieldHeaderIconBox">
                          <img src="./assets/icons/key-icon.png" alt="" />
                        </div>
                        Password :
                      </div>
                      <p onClick={() => setShowPassword(!showPassword)} className='showEditPassP'>{showPassword ? "Hide Password" : "Show Password"}</p>
                    </div>
                    <input value={editPassword} onChange={(e) => setEditPassword(e.target.value)} style={{ border: "1px solid rgba(0, 0, 0, 0.23)" }} className='profileInputBoxMain' type={showPassword ? "text" : "password"} placeholder='Enter Password' />
                  </div>

                  <div className="profileInfoFieldBox">
                    <div className="profileInfoFieldHeader">
                      <div className="profileInfoFieldHeaderIconBox">
                        <img src="./assets/icons/location-icon.png" alt="" />
                      </div>
                      Division :
                    </div>
                    <input type="text" style={{ fontFamily: "Poppins" }} className='form-control' value={userInfo.division || '-'} readOnly />
                  </div>

                  <div className="profileInfoFieldBox">
                    <div className="profileInfoFieldHeader">
                      <div className="profileInfoFieldHeaderIconBox">
                        <img src="./assets/icons/home-icon.png" alt="" />
                      </div>
                      Address :
                    </div>
                    <textarea value={editAddress} onChange={(e) => setEditAddress(e.target.value)} name="" rows={5} placeholder='Enter Address' className='editprofileboxaddress' id=""></textarea>
                  </div>

                  <button onClick={editUserInfo} className='modifyBtnProfile'>Modify</button>
                </div>
              </div>
            )
            /*Edit div close*/
          }
        </div>
        //main content box ends here
      }
      <NavigationBar />
    </>
  )
}
