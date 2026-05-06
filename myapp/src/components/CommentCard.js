import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function CommentCard({ imgPath, fbLink }) {
  const navigate = useNavigate()
  return (
    <div className='comment-card-body'>
      <div className="comment-card-body-image">
        <img src={imgPath} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
      </div>
      <div className="comment-card-btn-box">
        <button className='ccBtn' onClick={() => window.open(fbLink, "_blank")}>
          <div className="ccBtnIcon">
            <img src="./assets/icons/eyeIcon.png" alt="" />
          </div>
          View Comment
        </button>
      </div>
    </div>
  )
}
