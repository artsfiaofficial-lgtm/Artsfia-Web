import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TopSelling() {
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
        const under500ProductsArray = data.filter((e) => e.productType.includes('topSelling'))
        const arrayReverse = under500ProductsArray.reverse()
        const slicedArray = arrayReverse.slice(0, 12)
        setProductList(slicedArray)
    }
    useEffect(() => {
        fetchProducts()
    }, [])






    return (
        <div className='topSellingContainer'>
            <p className='tsText'>Top Selling</p>

            <div className="topSellingProductContainer">
                {
                    productList.map((data, index) => (
                        <ProductCard key={index} productId={data._id} title={data.productTitle} mrp={data.productMrpPrice} bdt={data.productPrice} status={data.productStatus} imgUrlFront={data.productFrontImageLink} />
                    ))
                }
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <button className="viewAllBtn" onClick={()=>navigate('/product-view?product=topSelling')}>
                    View All Products
                </button>
            </div>
        </div>
    )
}
