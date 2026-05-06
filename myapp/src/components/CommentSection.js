import React from 'react'
import CommentCard from './CommentCard';
import { useRef } from 'react';
export default function CommentSection() {
  //scrollbarRef init
  const scrollBarRef = useRef(null)
  //comment box scrollbar function
  function handleWheel(e) {
    e.preventDefault()
    scrollBarRef.current.scrollLeft += e.deltaY;
  }
  //comment cards items path
  const commentCardItems = [
    { imgSrc: "./assets/comment images/c1.jpeg", link: "https://www.facebook.com/artsfia1.0/posts/pfbid04bLBuYsLSBALvxPa5wV5z5N74TdYhtZb29nh9343V3WcL1z8EfUvwV1dFHRoNuGQl" },
    { imgSrc: "./assets/comment images/c4.jpeg", link: "https://www.facebook.com/photo/?fbid=122232825920232271&set=a.122216880680232271" },
    { imgSrc: "./assets/comment images/c5.jpeg", link: "https://www.facebook.com/photo/?fbid=122253638804232271&set=a.122216880680232271" },
    { imgSrc: "./assets/comment images/c6.jpeg", link: "https://www.facebook.com/photo/?fbid=122232825434232271&set=a.122216880680232271" },
    { imgSrc: "./assets/comment images/c3.jpeg", link: "https://www.facebook.com/photo/?fbid=122232825560232271&set=a.122216880680232271" },
    { imgSrc: "./assets/comment images/c2.jpeg", link: "https://www.facebook.com/photo/?fbid=122253639116232271&set=a.122216880680232271" },
  ]
  return (
    <div>
      <div className="commentSection">
        <p className='commentTitle'>Comments from <br />Our <span style={{ color: "rgb(194, 0, 178)" }}>Beloved Clients</span></p>
        <div className="commentSlideDiv" ref={scrollBarRef} onWheel={handleWheel}>
          {commentCardItems.map((data, index) => (
            <CommentCard fbLink={data.link} key={index} imgPath={data.imgSrc} path={data.path} />
          ))}
        </div>
        <div className='scrollLeftTxtDiv'>
          <p>
            Scroll right for more comments
          </p>
          <div className="scrollLeftTxtIcon">
            <img src="./assets/icons/rightArrow.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
