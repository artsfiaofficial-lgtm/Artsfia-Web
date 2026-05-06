import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    address : {
        type : String
    },
    bangleSize : {
        type : String
    },
    date : {
        type : String
    },
    deliveryCharge : {
        type : String
    },
    division : {
        type : String
    },
    email : {
        type : String
    },
    message : {
        type : String
    },
    name : {
        type : String
    },
    phoneNumber : {
        type : String
    },
    productCategory : {
        type : String
    },
    productFrontImageLink : {
        type : String
    },
    productIdKey : {
        type : String
    },
    productPerPrice : {
        type : String
    },
    productQuantity : {
        type : String
    },
    productStatus : {
        type : String
    },
    productSubPhotos : {
        type : [String]
    },
    productTitle : {
        type : String
    },
    totalPrice : {
        type : String
    },
    bangleDesignCategory : {
        type : String
    },
    babyBangleCategory : {
        type : String
    }
})

const orderModel = mongoose.model('order', orderSchema)

export default orderModel