import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function SignUp() {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [district, setDistrict] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [waitingText, setWaitingText] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [openSuggestionBox, setOpenSuggestionBox] = useState(false)
  //init navigator
  const navigate = useNavigate()


  
  
  
  
  //auth check function and get access token
  //const function
  //get auth token from the backend
  async function getAuthToken() {
    const url = 'http://localhost:3000/api/auth/identify'
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






  //fetch user data list from database so that we check is the account already registered or not
  //constant function will be use in submit button function to check existance of account
  async function checkIsUserExist(email) {
    const token = await getAuthToken()
    try{
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`,{
      method : "GET",
      headers: { 
            'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
          }
    })
      const data = await res.json()
      const fetchedDataList = []
      for (let key in data) {
        fetchedDataList.push({ idKey: key, ...data[key] })
      }
      const findUser = fetchedDataList.find((e) => e.email === email.trim())
      if (findUser) {
        return true
      }
    }
    catch{
      Swal.fire("Database Error","Please try again","error")
      return
    }
  }

  





  //submit user information function
  async function submitUserData() {
    setWaitingText(true)
    if (name.trim() !== '' &&
      password.trim() !== '' &&
      district.trim() !== '' &&
      email.trim() !== '' &&
      address.trim() !== '') {
      //check is user already exists
      const isUserFound = await checkIsUserExist(email)
      //if we got user then
      if (isUserFound) {
        Swal.fire("Account already exists!", "Please try with another email", "warning")
        setWaitingText(false)
        return
      }
      // if all data is filled then at first get the auth token
      const token = await getAuthToken()
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/new`, {
        method: "POST",
          headers: { 
            'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
          },
        body: JSON.stringify({
          name: name,
          phoneNumber: phoneNumber.trim(),
          division: district.trim(), //full code e first e division newa hoyechilo pore change kore district dewa hoise tai ekhn ar change kore hoy
          address: address.trim(),
          email: email.toLowerCase().trim(),
          password: password.toLowerCase().trim(),
          accountStatus: "active",
          cart : [],
          wishlist : []
        })
      })
      if (res.ok) {
        Swal.fire("Account Created!", "Welcome to Artsfia", "success")
        setWaitingText(false)
      }
      else {
        Swal.fire("Please try again!", "Failed to connect to the database", "error")
        setWaitingText(false)
        return
      }
    }
    else {
      Swal.fire("Info!", "Please fill all the required fields completely", "info")
      setWaitingText(false)
      return
    }
  }








  //district suggestion methods
  const districtSuggestion = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogura",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon"
];







  //to get the suggestions items and active the suggestion box
  function handleDistrictChange(e) {
    const value = e.target.value
    setDistrict(e.target.value)
    if (value === '') {
      setOpenSuggestionBox(false)
      return
    }
    const result = districtSuggestion.filter((e) => e.toLowerCase().includes(value.toLowerCase().trim()))
    setFilteredSuggestions(result)
    setOpenSuggestionBox(true)
  }








  //function to select item from li list
  function selectSuggestedItem(item) {
    setDistrict(item)
    setOpenSuggestionBox(false)
  }








  return (
    <div className='authContainerBG'>
      <div className="signupBox">
        <div className="signupBoxHeader">
          <img src="./assets/logo/logo.png" alt="" />
        </div>
        <p className='cnaMainTitle'>Create new account</p>
        <div className="signupBoxInputFields">

          <div className="signupInputFieldMainBox">
            <div className="signupInputFieldHeaderBox">
              <div className="signupInputFieldHeaderBoxIcon">
                <img src="./assets/icons/user-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
              </div>
              Name :
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='signupInputRaw' placeholder='Enter Your Name' />
          </div>
          <div className="signupInputFieldMainBox">
            <div className="signupInputFieldHeaderBox">
              <div className="loginFieldMainHeaderIcon">
                <img src="./assets/icons/phone-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
              </div>
              Phone Number :
            </div>
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="number" className='loginInputRaw' placeholder='Enter Your Phone Number' />
          </div>
          <div className="signupInputFieldMainBox">
            <div className="signupInputFieldHeaderBox">
              <div className="loginFieldMainHeaderIcon">
                <img src="./assets/icons/mail-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
              </div>
              E-mail :
            </div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='loginInputRaw' placeholder='Enter Your E-mail' />
          </div>
          <div className="signupInputFieldMainBox">
            <div className="signupInputFieldHeaderBox">
              <div className="loginFieldMainHeaderIcon">
                <img src="./assets/icons/key-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
              </div>
              Password :
            </div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='loginInputRaw' placeholder='Enter Your Password' />
          </div>
          <div className="signupInputFieldMainBox">
            <div className="signupInputFieldHeaderBox">
              <div className="loginFieldMainHeaderIcon">
                <img src="./assets/icons/location-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
              </div>
              Your District :
            </div>
            <input value={district} type="text" onChange={(e)=>handleDistrictChange(e)} placeholder='Enter Your District' className='form-control' style={{ fontFamily: "Poppins" }} />
            {
              openSuggestionBox && (
                <ul className='suggestionBoxULText'>
                  {filteredSuggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => selectSuggestedItem(item)}
                      style={{
                        padding: "8px",
                        cursor: "pointer"
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
          <div className="signupInputFieldMainBox">
            <div className="signupInputFieldHeaderBox">
              <div className="loginFieldMainHeaderIcon">
                <img src="./assets/icons/home-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
              </div>
              Home Address :
            </div>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className='signUpAddressTextArea' name="" rows={5} placeholder='Enter Home Address...' id=""></textarea>
          </div>
        </div>
        <p className='scrollAdviceText'>( Scroll down for more options )</p>
        <div className="signupBtnBox">
          <button className='cnaBtnMain' onClick={submitUserData}>
            <div className="cnaBtnMainIcon">
              <img src="./assets/icons/addUserWhiteIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
            </div>
            {waitingText ? "Creating..." : "Create new account"}
          </button>
        </div>
        <p className='btlTitleMain' onClick={() => navigate('/login')}>Back to login!</p>
      </div>
    </div>
  )
}
