import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CategoryByOccasion() {
    const navigate = useNavigate()
    return (
        <div className='cboContainer'>
            <p className="cboTitle">Category By Occasion</p>
            <div className="cboContainerOne">
                <div className="cboFirstImageBox">
                    <img loading='eager' src="./assets/category part 2 images/land2.png" alt="" />
                    <div class="cboImgoverlay">
                        <p onClick={()=>navigate('/product-view?product=eid2026')}>Eid Package 2026</p>
                    </div>
                </div>
                <div className="cboSecondImageBox">
                    <div className="cboInnerImageBoxFirst" >
                        <img loading='eager' src="./assets/category part 2 images/cat1.png" alt="" />
                        <div class="cboImgoverlay">
                            <p onClick={()=>navigate('/product-view?product=eventWear')}>Event Wear</p>
                        </div>
                    </div>
                    <div className="cboInnerImageBoxSecond" >
                        <img loading='eager' src="./assets/category part 2 images/cat2.png" alt="" />
                        <div class="cboImgoverlay">
                            <p onClick={()=>navigate('/product-view?product=bridalWear')}>Bridal Wear</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cboContainerTwo">
                <div className="cboSecondImageBox">
                    <div className="cboInnerImageBoxFirst" >
                        <img loading='eager' src="./assets/category part 2 images/cat4.png" alt="" />
                        <div class="cboImgoverlay">
                            <p onClick={()=>navigate('/product-view?product=partyWear')}>Party Wear</p>
                        </div>
                    </div>
                    <div className="cboInnerImageBoxSecond" >
                        <img loading='eager' src="./assets/category part 2 images/cat3.png" alt="" />
                        <div class="cboImgoverlay">
                            <p onClick={()=>navigate('/product-view?product=officeWear')}>Office Wear</p>
                        </div>
                    </div>
                </div>
                <div className="cboFirstImageBox" >
                    <img loading='eager' src="./assets/category part 2 images/land1.png" alt="" />
                    <div class="cboImgoverlay">
                            <p onClick={()=>navigate('/product-view?product=festiveWear')}>Festive Wear</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
