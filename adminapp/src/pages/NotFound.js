import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    //navigator init
    const navigate = useNavigate()
    return (
        <div className='not-found-page-container'>
            <p className="not-found-code">404</p>
            <p className="nfText">Not Found!</p>
            <p className="nfNote">The resource requested could not be found on this server!</p>
            <button class="nfBtn" onClick={()=>navigate('/')}>
            <div class="nfBtnIcon">
                <img alt="" src="./assets/icons/homeIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            Back to home
            </button>
        </div>
    )
}
