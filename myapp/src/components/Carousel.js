import React from 'react'

export default function Carousel() {
  //first carousel items in a object
  const firstCarouselItems = [
    { imgSrc: "./assets/carousel images/c1.jpeg" },
    { imgSrc: "./assets/carousel images/c2.jpeg" },
    { imgSrc: "./assets/carousel images/c6.jpeg" },
    { imgSrc: "./assets/carousel images/c3.jpeg" },
    { imgSrc: "./assets/carousel images/c4.jpeg" },
    { imgSrc: "./assets/carousel images/c5.jpeg" },
  ]
  return (
    <div className="firstCarouselBox">

      <div className="stuOtmCardsShow">
        <div className="eventotmScrollBox">
          {
            firstCarouselItems.map((data, index) => (
              <div className="carouselFirstBox">
                <img key={index} src={data.imgSrc} alt="" />
              </div>
            ))
          }
        </div>
        <div className="eventotmScrollBox">
          {
            firstCarouselItems.map((data, index) => (
              <div key={index} className="carouselFirstBox">
                <img src={data.imgSrc} alt="" />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
