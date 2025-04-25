import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello world")
})

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log("Server running on http://localhost:${PORT}")
        })
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err)
    })