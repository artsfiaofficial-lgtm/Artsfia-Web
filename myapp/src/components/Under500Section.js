import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'

export default function Under500Section() {
    const [productList, setProductList] = useState([])
    const navigate = useNavigate()
    const [mobileView, setMobileView] = useState(false)
    




    //to measure mobile and web size and set mobile view option
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




    //Auth material
    //get auth token from the backend
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




    //fetch product which have productType : under500
    async function fetchProducts(params) {
        const token = await getAuthToken()
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await res.json()
        const under500ProductsArray = data.filter((e)=>e.productType.includes('under500'))
        const arrayReverse = under500ProductsArray.reverse()
        const slicedArray = arrayReverse.slice(0, 12)
        setProductList(slicedArray)
    }
    useEffect(()=>{
        fetchProducts()
    },[])





    
    return (
        <div className='under500Container'>
            <p className='u5Text'>Under 500</p>
            <div className="under500MainImageBox">
                {
                    mobileView ? 
                    <img loading='eager' style={{width:"100%",height:"100%",objectFit:"contain"}} src='./assets/artsfia decoration images/mobile1.png'/>
                    :
                <img loading='eager' style={{width:"100%",height:"100%",objectFit:"contain"}} src='./assets/artsfia decoration images/web1.png'/>
                }
               <div className="under500MainBoxOverlay">
                    <button className="under500OverlayBtn" onClick={()=>navigate('/product-view?product=under500')}>
                        SHOP
                    </button>
                </div>
            </div>
            <div className="under500ProductContainer">
                {
                    productList.map((data, index)=>(
                        <ProductCard key={index} productId={data._id} title={data.productTitle} mrp={data.productMrpPrice} bdt={data.productPrice} status={data.productStatus} imgUrlFront={data.productFrontImageLink} />
                    ))
                }
            </div>
            <div style={{width:"100%", display:"flex",justifyContent:"center"}}>
            <button className="viewAllBtn" onClick={()=>navigate('/product-view?product=under500')}>
                View All Products
            </button>
            </div>
        </div>
    )
}
