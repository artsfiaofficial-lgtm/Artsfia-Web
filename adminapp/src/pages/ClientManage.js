import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ClientCard from '../components/ClientCard'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
export default function ClientManage() {
  const [waitingLoader, setWaitingLoader] = useState(true)
  const [userDataList, setUserDataList] = useState([])






  //if admin not logged in then refer admin to login page
  //navigate init
  const navigate = useNavigate()
  useEffect(() => {
    const adminPermit = localStorage.getItem("artsfiaControlLogin")
    if (!adminPermit || adminPermit !== 'true') {
      navigate('/login')
    }
  }, [])






  //auth check function and get access token
  //const function
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
      setWaitingLoader(false)
      const fetchedDataReverse = fetchedData.reverse()
      setUserDataList(fetchedDataReverse)
    }
    else {
      Swal.fire("Oops!", "Failed to fetch data from database", "error")
      setWaitingLoader(false)
      return
    }
  }
  useEffect(() => {
    fetchUserData()
  }, [])
  return (
    <div>
      <Navbar />
      <div className="container cmContainer">
        <p className='cmTitle'>Clients Management</p>
        <hr style={{ margin: 0 }} />
        <div className="cmRenderBox">
          {waitingLoader &&
            /*Loader div starts here*/
            <div className="loaderDivCM">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            /*Loader div ends here*/
          }
          {
            userDataList.map((data, index) => (
              <ClientCard clientId={data._id} key={index} accountStatus={data.accountStatus} refetchFunctionPass={fetchUserData} idKey={data.idKey} name={data.name} phone={data.phoneNumber} division={data.division} address={data.address} email={data.email} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
