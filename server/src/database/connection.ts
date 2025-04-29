import { config } from "../config/config"
import mongoose from "mongoose"

const URI = config.mongodb.uri

export const connectDB = async () => {
    try{
        await mongoose.connect(URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Failed to connect to MongoDB", error)
        process.exit(1)
    }
}