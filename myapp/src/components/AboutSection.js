import React from 'react'
import SliderCard from './SliderCard'
export default function AboutSection() {
  //slider card images
  const sliderCardItems = [
    { imgSrc: "./assets/slider images/s1.jpeg" },
    { imgSrc: "./assets/slider images/s4.jpeg" },
    { imgSrc: "./assets/slider images/s5.jpeg" },
    { imgSrc: "./assets/slider images/s3.jpeg" },
    { imgSrc: "./assets/slider images/s2.jpg" },
  ]
  return (
    <div className="aboutProductDiv">
      <p className="aboutProductTitle">
        About Our Products
      </p>
      <div className="apContentBox">
        <div className="apImageSlideBox">
          {
            sliderCardItems.map((data, index) => (
              <SliderCard imgSrc={data.imgSrc} />
            ))
          }
        </div>
        <div className="apDetailsBox">
          <p className='ourProductTitle'>Our Product</p>
          <p className="ourProductInfoBoxText">
            Our brand products embody modern fashion, premium craftsmanship, and uncompromising quality. Each piece is thoughtfully designed to reflect contemporary trends while ensuring comfort, durability, and elegance. We carefully select high-grade materials and maintain strict quality control to deliver products that exceed expectations. From everyday essentials to statement pieces, our collections combine style and reliability, empowering customers to express confidence, individuality, and sophistication in every look they wear.
          </p>
        </div>
      </div>
    </div>
  )
}
