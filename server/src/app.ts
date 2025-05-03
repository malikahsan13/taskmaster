import express from "express"
import mongoose from "mongoose"
import authRoutes from "./routes/auth"
import userRoutes from "./routes/user"
import { config } from "./config/config"
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const PORT = config.port;
const URI = config.mongodb.uri;

if(!URI){
    throw new Error("MongoDB URI is not correct")
}
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