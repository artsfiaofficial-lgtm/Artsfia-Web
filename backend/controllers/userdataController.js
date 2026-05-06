import userdataModel from '../model/userdataModel.js'

const getData = async (req, res) => {
    try {
        const data = await userdataModel.find({})
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
            accountStatus,
            address,
            division,
            email,
            name,
            password,
            phoneNumber,
            cart,
            wishlist
        } = req.body;
        const newData = new userdataModel({
            accountStatus,
            address,
            division,
            email,
            name,
            password,
            phoneNumber,
            cart,
            wishlist
        });
        await newData.save();
        res.status(201).json(newData);
        console.log("New User Created!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

const deleteData = async (req, res) => {
    try {
        const data = await userdataModel.findByIdAndDelete(req.params.id)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

const updateData = async (req, res) => {
    try {
        const data = await userdataModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

const readData = async (req, res) => {
    try {
        const data = await userdataModel.findById(req.params.id)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

export { getData, createNewData, readData, updateData, deleteData }