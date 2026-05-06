import React from 'react'
import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'
export default function NewArrivals() {
    const [productList, setProductList] = useState([])
    const navigate = useNavigate()
    
    
    
    
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
        async function fetchProducts() {
            const token = await getAuthToken()
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product/`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()
            const newArrivalProductArray = data.filter((e)=>e.productType.includes('newArrivals'))
            const arrayReverse = newArrivalProductArray.reverse()
            const slicedArray = arrayReverse.slice(0, 12)
            setProductList(slicedArray)
        }
        useEffect(()=>{
            fetchProducts()
        },[])






    return (
        <div className='newArrivalContainer'>
            <p className='naTxtX'>New Arrivals</p>
            <div className="newArrivalProductContainer">
                {
                    productList.map((data, index) => (
                        <ProductCard key={index} productId={data._id} title={data.productTitle} mrp={data.productMrpPrice} bdt={data.productPrice} status={data.productStatus} imgUrlFront={data.productFrontImageLink} />
                    ))
                }
            </div>
             <div style={{width:"100%", display:"flex",justifyContent:"center"}}>
            <button className="viewAllBtn2" onClick={()=>navigate('/product-view?product=newArrivals')}>
                View All Products
            </button>
            </div>
        </div>
    )
}
