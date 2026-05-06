import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    bangleCategory : {
        type : String
    },
    productCategory : {
        type : String
    },
    productFrontImageLink : {
        type : String
    },
    productImageLinks : {
        type : [String]
    },
    
    productMrpPrice : {
        type : String
    },
    productPrice : {
        type : String
    },
    productStatus : {
        type : String
    },
    productTitle : {
        type : String
    },
    productType : {
        type : [mongoose.Schema.Types.Mixed]
    },
    bangleDesignCategory : {
        type : String
    },
    babyBangleCategory : {
        type : String
    }
})

const productModel = mongoose.model('product', productSchema)

export default productModel