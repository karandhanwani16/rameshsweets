// imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import authRouter from "./routers/auth.router.js";
import categoryRouter from "./routers/category.router.js";
// import { rateLimit } from "express-rate-limit"
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";


// configuration
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// const premiumUsers = rateLimit({
//     windowMs: 30 * 1 * 1000,
//     limit: 4,
//     message: {
//         status: "error",
//         message: "Too many requests, please try again after 30 seconds.",
//         data: null,
//     },
//     statusCode: 400
// });

// statusCode: 429
// app.use(premiumUsers);


// swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Ramesh Sweets API Documentation",
            version: "1.0.0",
            description: "API documentation for Ramesh Sweets",
        },
        servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./routers/*.js"], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to db
connectDB();



// const authLimiter = rateLimit({
//     windowMs: 30 * 1 * 1000,
//     limit: 5,
//     message: {
//         status: "error",
//         message: "Too many requests, please try again after 30 seconds.",
//         data: null,
//     }
// });
// const categoryLimiter = rateLimit({
//     windowMs: 30 * 1 * 1000,
//     limit: 20,
//     message: {
//         status: "error",
//         message: "Too many requests, please try again after 30 seconds.",
//         data: null,
//     }
// });


app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
// app.use("/api/auth", authLimiter, authRouter);
// app.use("/api/category", categoryLimiter, categoryRouter);

// starting the server
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})