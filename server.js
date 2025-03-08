// imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import authRouter from "./routers/auth.router.js";

// configuration
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to db
connectDB();


app.use("/api/auth", authRouter);

// starting the server
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})