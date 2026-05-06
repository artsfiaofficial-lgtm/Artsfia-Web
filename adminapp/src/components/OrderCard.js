import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function OrderCard({ refreshFunction, title, imageUrl, idKey, name, address, message, date, division, phoneNumber, category, bangleSize, price, quantity, deliveryCharge, totalPrice }) {
    //navigator init
    const navigate = useNavigate()






    //auth materials
    async function getAuthToken() {
        const url = 'http://localhost:3000/api/auth/identify'
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
            console.log(tokenId.token)
            return tokenId.token
        }
        else {
            return
        }
    }





    //accept order function
    async function approveOrder() {
        //confimation popup show
        Swal.fire({
            title: "Approve Order?",
            text: "Approve this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Approve"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = await getAuthToken()
                const res = await fetch(`http://localhost:3000/api/order/delete/${idKey}`,
                    {
                        method: "DELETE",
                        headers: {
                            'Content-Type': "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                )
                if (res.ok) {
                    Swal.fire("Order Approved!", "Order has been approved, now the order will remove from the list", "success")
                    refreshFunction()
                }
                else {
                    Swal.fire("Oops!", "Failed to approve the order", "error")
                    return
                }
            }
        })
    }







    //Decline order
    async function declineOrder() {
        //confimation popup show
        Swal.fire({
            title: "Decline Order?",
            text: "Decline this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Decline"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = await getAuthToken()
                const res = await fetch(`http://localhost:3000/api/order/delete/${idKey}`,
                    {
                        method: "DELETE",
                        headers: {
                            'Content-Type': "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                )
                if (res.ok) {
                    Swal.fire("Order Declined!", "Order has been declined", "success")
                    refreshFunction()
                }
                else {
                    Swal.fire("Oops!", "Failed to approve the order", "error")
                    return
                }
            }
        })
    }







    //view product function
    async function viewProductFunction() {
        window.open(`/details?productId=${idKey}`, "_blank");
    }







    return (
        <div className='orderCardBody'>
            <div className="orderCardBodyImgBox">
                <img src={imageUrl} alt="" />
            </div>
            <div className="orderCardBodyInfoBox">
                <div className="ocbibP1">
                    <p className='orderBoxTitleP'>Product : <span style={{ color: "black", fontWeight: "500" }}>{title}</span></p>
                    <p>Product Category : {category || '-'}</p>
                    <p>Bangle Size : {bangleSize || '-'}</p>
                    <p>Product Price : {price || '-'} BDT</p>
                    <p>Quantity : {quantity || "-"}</p>
                    <p>Delivery Charge : {deliveryCharge || '-'} BDT</p>
                    <p>Total Price : {totalPrice || '-'} BDT</p>
                    {new Date().toDateString() === date && <p className='newTxtOrder'>New</p>}
                </div>
                <div className="ocbibP2">
                    <p>Name : {name || '-'}</p>
                    <p>Address : {address || '-'}</p>
                    <p>Division : {division || '-'}</p>
                    <p>Phone Number : {phoneNumber || '-'}</p>
                    <p>Message : {message || '-'}</p>
                    <p>Order Date : {date || '-'}</p>
                </div>
            </div>
            <div className="orderCardBodyBtnBox">
                <button className='orderAcceptBtn' onClick={approveOrder}>
                    <div className="orderCardBodyBtnBoxIcon">
                        <img src="./assets/icons/acceptIcon.png" alt="" />
                    </div>
                    Approve Order
                </button>
                <button className='orderDeclineBtn' onClick={declineOrder}>
                    <div className="orderCardBodyBtnBoxIcon">
                        <img src="./assets/icons/declineIcon.png" alt="" />
                    </div>
                    Decline Order
                </button>
                <button className='chatWithUserBtn' onClick={() => window.open(`https://wa.me/${phoneNumber}`, "_blank")}>
                    <div className="orderCardBodyBtnBoxIcon">
                        <img src="./assets/icons/wpIcon.png" alt="" />
                    </div>
                    Chat with client
                </button>
                <button className='viewProductBtn' onClick={viewProductFunction}>
                    <div className="orderCardBodyBtnBoxIcon">
                        <img src="./assets/icons/viewBlueIcon.png" alt="" />
                    </div>
                    View Product
                </button>
            </div>
        </div>
    )
}
