import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className="footerLogo">
        <img src="./assets/logo/logo.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
      </div>
      <div className="footerInfo">
        <div className="footerContactInfo">
          <p className="logoNameFooter">
            ARTSFIA
          </p>
          <p className="footerAddress">
            <u>Address</u> : Online only. Occasionally, we may be available at a specific location, which will be announced through our social media channels
          </p>
          <div className="footerSocial">
            <div className="footerFb">
              <div className="footerSocialIconBox">
                <img src="./assets/icons/facebook.png" alt="" />
              </div>
              Facebook
            </div>
            <div className="footerIg">
              <div className="footerSocialIconBox">
                <img src="./assets/icons/instagram.png" alt="" />
              </div>
              Instagram
            </div>
            <div className="footerWa">
              <div className="footerSocialIconBox">
                <img src="./assets/icons/whatsapp.png" alt="" />
              </div>
              Whatsapp
            </div>
            <div className='footerContactDetailsBox'>
              <p className='mobileNumFooter'>Mobile : +88019******78</p>
              <p className="footerOwnerName">- Tasfia Tabassum</p>
              <p className="introFooterOwner">( Founder Of Artsfia )</p>
            </div>
          </div>
        </div>
        <div className="footerIntroText">
          <p className='footerIntroTitleX'>More About Artsfia</p>
          <p>
            Welcome to Artsfia, where tradition meets modern elegance.
            Artsfia is an online-based fashion platform dedicated to timeless beauty.
            We specialize in premium bangles, sarees, and stylish co-ords.
            Our brand celebrates femininity with grace and confidence.
            Every product is carefully selected to reflect quality and authenticity.
            We believe fashion is more than clothing, it is identity.
            artsfia brings you ethnic charm with a contemporary touch.
            Our sarees are crafted to highlight elegance in every drape.
          </p>
        </div>
      </div>
      <p className='cpyrightTxt'>&copy; 2026 Artsfia. All rights reserved. </p>
    </footer>
  )
}
