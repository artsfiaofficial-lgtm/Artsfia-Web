import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    const DB_OPTION = {
        dbName : "artsfia"
    }
    await mongoose.connect(DATABASE_URL, DB_OPTION)
    console.log("Database Connected...")
}

export default connectDB