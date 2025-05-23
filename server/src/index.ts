import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth"
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;
console.log(URI)
if(!URI){
    throw new Error("MongoDB URI is not correct")
}

app.use(cors({
    origin: "http://localhost:3000", // React dev server
    credentials: true               // To allow cookies
  }));

app.use(express.json())
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Hello world")
})

mongoose
    .connect(URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err)
    })