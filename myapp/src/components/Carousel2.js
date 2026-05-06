import React, { useEffect, useState } from 'react'
import { Carousel } from 'bootstrap'
export default function Carousel2() {
    const [mobileView, setMobileView] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 830px)");
        function handleScreenChange(e) {
            setMobileView(e.matches);
        }
        handleScreenChange(mediaQuery);
        mediaQuery.addEventListener("change", handleScreenChange);
        return () => {
            mediaQuery.removeEventListener("change", handleScreenChange);
        }
    }, [])





    useEffect(() => {
        const el = document.getElementById("carouselExampleInterval");

        if (el) {
            new Carousel(el, {
                interval: 2000,
                ride: "carousel"
            });
        }
    }, []);




    return (
        <>
            {
                !mobileView &&
                <div className='carousel2BoxWeb'>
                    <div id="carouselExampleInterval" className="carousel slide">

                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img loading='eager' src="./assets/carousel 2 images/web2.png" className="d-block w-100" alt="" />
                            </div>

                            <div className="carousel-item">
                                <img loading='eager' src="./assets/carousel 2 images/web5.png" className="d-block w-100" alt="" />
                            </div>

                            <div className="carousel-item">
                                <img loading='eager' src="./assets/carousel 2 images/web1.png" className="d-block w-100" alt="" />
                            </div>

                            <div className="carousel-item">
                                <img loading='eager' src="./assets/carousel 2 images/web6.png" className="d-block w-100" alt="" />
                            </div>

                            <div className="carousel-item">
                                <img loading='eager' src="./assets/carousel 2 images/web3.png" className="d-block w-100" alt="" />
                            </div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </button>

                    </div>
                </div>
            }





            {
                mobileView &&
                <div className='carousel2BoxMobile'>
                    <div id="carouselExampleInterval" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img loading='eager' src="./assets/carousel 2 images/mobile1.png" className="d-block w-100" alt="" />
                            </div>

                            <div className="carousel-item">
                                <img loading='eager' src="./assets/carousel 2 images/mobile2.png" className="d-block w-100" alt="" />
                            </div>

                            <div className="carousel-item">
                                <img loading='eager' src="./assets/carousel 2 images/mobile3.png" className="d-block w-100" alt="" />
                            </div>

                            <div className="carousel-item">
                                <img loading='eager' src="./assets/carousel 2 images/mobile4.png" className="d-block w-100" alt="" />
                            </div>

                            <div className="carousel-item">
                                <img loading='eager' src="./assets/carousel 2 images/mobile6.png" className="d-block w-100" alt="" />
                            </div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </button>

                    </div>
                </div>
            }
        </>
    )
}
