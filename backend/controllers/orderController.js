import orderModel from '../model/orderModel.js'

const getData = async (req, res) => {
    try {
        const data = await orderModel.find({})
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

const createNewData = async (req, res) => {
    try {
        const {
            address,
            bangleSize,
            date,
            deliveryCharge,
            division,
            email,
            message,
            name,
            phoneNumber,
            productCategory,
            productFrontImageLink,
            productSubPhotos,
            productIdKey,
            productPerPrice,
            productQuantity,
            productStatus,
            productTitle,
            totalPrice
        } = req.body;
        const newData = new orderModel({
            address,
            bangleSize,
            date,
            deliveryCharge,
            division,
            email,
            message,
            name,
            phoneNumber,
            productCategory,
            productFrontImageLink,
            productSubPhotos,
            productIdKey,
            productPerPrice,
            productQuantity,
            productStatus,
            productTitle,
            totalPrice
        });
        await newData.save();
        res.status(201).json(newData);
        console.log("New Order Created!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

const deleteData = async (req, res) => {
    try {
        const data = await orderModel.findByIdAndDelete(req.params.id)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

const updateData = async (req, res) => {
    try {
        const data = await orderModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

const readData = async (req, res) => {
    try {
        const data = await orderModel.findById(req.params.id)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

export {getData, createNewData, readData, updateData, deleteData}