import productModel from '../model/productModel.js'

const getData = async (req, res) => {
    try {
        const data = await productModel.find({})
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
            bangleCategory,
            productCategory,
            productFrontImageLink,
            productImageLinks,
            productMrpPrice,
            productPrice,
            productStatus,
            productTitle,
            productType,
            bangleDesignCategory,
            babyBangleCategory
        } = req.body;
        const newData = new productModel({
            bangleCategory,
            productCategory,
            productFrontImageLink,
            productImageLinks,
            productMrpPrice,
            productPrice,
            productStatus,
            productTitle,
            productType,
            babyBangleCategory,
            bangleDesignCategory
        });
        await newData.save();
        res.status(201).json(newData);
        console.log("New Product Created!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

const deleteData = async (req, res) => {
    try {
        const data = await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

const updateData = async (req, res) => {
    try {
        const data = await productModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

const readData = async (req, res) => {
    try {
        const data = await productModel.findById(req.params.id)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

export { getData, createNewData, readData, updateData, deleteData }