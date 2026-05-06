import React from 'react'

export default function Category() {
  //category images path array
  const categoryItems = [
    { imgSrc: "./assets/category images/bangles2.jpeg", title: "BANGLES" },
    { imgSrc: "./assets/category images/bb.jpeg", title: "BABY BANGLES" },
    { imgSrc: "./assets/category images/earing.jpeg", title: "EARING" },
    { imgSrc: "./assets/category images/neckpiece.jpeg", title: "NECK PIECE" },
    { imgSrc: "./assets/category images/fingerring.jpeg", title: "FINGER RING" },
    { imgSrc: "./assets/category images/combo.jpeg", title: "COMBO" },
  ]
  return (
    <div className="category-div">
      <p className='categoryTitle'>Category</p>
      <div className="category-box-div">
        {
          categoryItems.map((data, index) => (
            <div className="category-box-design" key={index}>
              <div className="category-card-image-box">
                <img src={data.imgSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button className='categoryBtnShow'>{data.title}</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
