import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [waitingText, setWaitingText] = useState(false)
  const [passShow, setPassShow] = useState(false)
  //init navigator
  const navigate = useNavigate()





  //auth check function and get access token
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





  //login button function
  async function loginAction() {
    setWaitingText(true)
    if (
      email.trim() !== '' &&
      password.trim() !== ''
    ) {
      // if all data is filled then at first get the auth token
      const token = await getAuthToken()
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      if (res.ok) {
        //then check is user info is correct?
        const data = await res.json()
        const fetchedData = []
        for (let key in data) {
          fetchedData.push({ idKey: key, ...data[key] })
        }
        const validUser = fetchedData.find((e) => e.email === email.toLowerCase().trim() && e.password === password.toLowerCase().trim())
        //check is account suspend or not if suspend then not let user go
        if (validUser) {
          const getAccountStaus = validUser.accountStatus
          if (getAccountStaus === 'suspend') {
            Swal.fire("You're Account Suspended!", "Please contact to the Artsfia's helpline", "info")
            setWaitingText(false)
            return
          }
        }
        //if we get valid info and the account status if not be suspended then
        if (validUser) {
          Swal.fire("User logged in successfully", `Welcome Back, ${validUser.name}`, "success")
          localStorage.setItem("artsfiaUserID", validUser._id)
          setWaitingText(false)
          navigate('/')
        }
        else {
          Swal.fire("Incorrect User Inforamtion", `Please check your kind information`, "error")
          setWaitingText(false)
          return
        }
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






  return (
    <div className='authContainerBG'>
      <div className="loginBox">
        <div className="loginHeaderBox">
          <img src="./assets/logo/logo.png" alt="" />
        </div>
        <p className='loginText'>Account Login</p>
        <div className="loginInputFields">
          <div className="loginFieldMain">
            <div className="loginFieldMainHeader">
              <div className="loginFieldMainHeaderIcon">
                <img src="./assets/icons/mail-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
              </div>
              E-mail :
            </div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='loginInputRaw' placeholder='Enter Your E-mail' />
          </div>

          <div className="loginFieldMain">
            <div className="loginFieldMainHeader loginFieldMainHeaderExcept">
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                <div className="loginFieldMainHeaderIcon">
                  <img src="./assets/icons/key-icon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                </div>
                Password :
              </div>
              <p className='spTitleX' onClick={() => setPassShow(!passShow)}>{passShow ? "Hide Password" : "Show Password"}</p>
            </div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={passShow ? "text" : "password"} className='loginInputRaw' placeholder='Enter Your Password' />
          </div>
        </div>
        <button onClick={loginAction} className='logInBtn'>
          <div className="loginBtnIconMain">
            <img src="./assets/icons/loginBtnIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
          </div>
          {waitingText ? "Logging..." : "Log In"}
        </button>
        <p className='cnaTitle' onClick={() => navigate('/signup')}>Create new account?</p>
      </div>
    </div>
  )
}
