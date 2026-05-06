import React from 'react'
import Swal from 'sweetalert2'
export default function ClientCard({ clientId, accountStatus, name, phone, email, division, address, idKey, refetchFunctionPass }) {






    //auth check function and get access token
    //const function
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






    //delete account program
    async function deleteAccount() {
        //confirmation popup show
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                //firstly get token
                const token = await getAuthToken()
                //oppression
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/delete/${clientId}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (res.ok) {
                    Swal.fire("Account Deleted", "Client Account Deleted Successfully", "success")
                    refetchFunctionPass()
                }
                else {
                    Swal.fire("Try again!", "Failed to Delete", "success")
                    return
                }
            }
        });
    }






    //suspend account function
    async function suspendAccount() {
        //confirmation popup show
        Swal.fire({
            title: "Are you sure?",
            text: accountStatus === 'suspend' ? "Reinstate this account" : "Suspend this account!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: accountStatus === 'suspend' ? "Yes, reinstate it" : "Yes, suspend it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                //firstly get token
                const token = await getAuthToken()
                //oppression
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/update/${clientId}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ accountStatus: accountStatus === "suspend" ? "active" : "suspend" })
                })
                if (res.ok) {
                    accountStatus === 'suspend' ?
                        Swal.fire("Account Reinstated", "Client account reinstated successfully", "success")
                        :
                        Swal.fire("Account Suspended", "Client account suspended successfully", "success")
                    refetchFunctionPass()
                    return
                }
                else {
                    Swal.fire("Please try again", "Failed to take this action", "error")
                    return
                }
            }
        })
    }







    return (
        <div className='clientCardBody'>
            <div className="clientCartIconBox">
                <img src="./assets/icons/userIcon3d.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
            </div>
            <div className="clientCardInfoBox">
                <p>Name : {name || '...'}</p>
                <p>Phone : {phone || '...'}</p>
                <p>E-mail : {email || '...'}</p>
                <p>District : {division || '...'}</p>
                <p style={{ color: "green" }}>Address : {address || '...'}</p>
            </div>
            <div className="clientCardBtnsDiv">
                <button style={{ backgroundColor: accountStatus === 'suspend' ? "green" : "rgb(255, 136, 0)" }} onClick={suspendAccount}>
                    <div className="clientCartBtnIcon">
                        {accountStatus === 'suspend' ?
                            <img src="./assets/icons/resumeIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                            :
                            <img src="./assets/icons/suspendIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                        }
                    </div>
                    {accountStatus === 'suspend' ? "Reinstate Client" : "Suspend Client"}
                </button>
                <button style={{ backgroundColor: "rgb(255, 0, 43)" }} onClick={deleteAccount}>
                    <div className="clientCartBtnIcon">
                        <img src="./assets/icons/deleteIcon.png" style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                    </div>
                    Delete Client
                </button>
            </div>
        </div>
    )
}
