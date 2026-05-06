import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //init navigator
  const navigate = useNavigate()






  //login check function
  function loginAction(){
    if(username.trim()!=='' && password.trim()!==''){
      if(process.env.REACT_APP_LOGIN_USERNAME === username.toLowerCase().trim() && process.env.REACT_APP_LOGIN_PASSWORD === password.toLowerCase().trim()){
        Swal.fire("Control panel login successful","Welcome back, Admin!","success")
        localStorage.setItem("artsfiaControlLogin","true")
        navigate('/')
      }
      else{
        Swal.fire("Wrong Information!","Please enter the correct information","error")
        return
      }
    }
    else{
      Swal.fire("Info!","Please fill all the required fields","info")
      return
    }
  }

  return (
    <div className='loginPanelBG'>
      <div className="loginPanelBox">
         <div className="loginPanelHeader">
            <img src="./assets/logo/logo.png" alt="" />
         </div>
        <div className="loginAboutBox">
            <div className="loginAboutBoxIcon">
                <img src="./assets/icons/securityIcon.png" style={{width:"100%",height:"100%",objectFit:"contain"}} alt="" />
            </div>
            Control Panel Login
        </div>
        <hr style={{margin:"0"}} />
        <div className="loginInputFieldBox">

            <div className="loginInputFieldDiv">
              <div className="loginInputFieldDivHeader">
                <div className="loginInputFieldDivHeaderIcon">
                    <img src="./assets/icons/user-icon.png" style={{width:"100%",height:"100%",objectFit:"contain"}} alt="" />
                </div>
                Username : 
              </div>
              <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className='form-control' placeholder='Enter username' />
            </div>

            <div className="loginInputFieldDiv">
              <div className="loginInputFieldDivHeader">
                <div className="loginInputFieldDivHeaderIcon">
                    <img src="./assets/icons/key-icon.png" style={{width:"100%",height:"100%",objectFit:"contain"}} alt="" />
                </div>
                Password : 
              </div>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' placeholder='Enter password' />
            </div>

            <div>
            <button onClick={loginAction} className='loginBtn'>
              <div className="loginBtnIcon">
                  <img src="./assets/icons/loginBtnIcon.png" alt="" />
              </div>
              Log In
              </button>
            </div>

        </div>
      </div>
    </div>
  )
}
