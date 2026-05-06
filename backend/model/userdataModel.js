import mongoose from "mongoose";

const userdataSchema = new mongoose.Schema({
    accountStatus : {
        type : String
    },
    address : {
        type : String
    },
    division : {
        type : String
    },
    email : {
        type : String
    },
    name : {
        type : String
    },
    password : {
        type : String
    },
    phoneNumber : {
        type : String
    },
    cart : {
        type : [mongoose.Schema.Types.Mixed] // we passes some objects in a array here
    },
    wishlist : {
        type : [mongoose.Schema.Types.Mixed]
    }
})

const userdataModel = mongoose.model('userdata', userdataSchema)

export default userdataModel